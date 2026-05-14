import { prisma } from "../../../lib/prisma";
import { getCurrentUser } from "../../../lib/auth";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return Response.json(
        { error: "Apenas administradores podem cadastrar membros." },
        { status: 403 }
      );
    }

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { error: "Nome, email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

    if (role && !allowedRoles.includes(role)) {
      return Response.json(
        { error: "Perfil de acesso inválido." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "Já existe um usuário com esse email." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "MEMBER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return Response.json(
      { message: "Usuário criado com sucesso.", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return Response.json(
      { error: "Erro interno ao criar usuário." },
      { status: 500 }
    );
  }
}