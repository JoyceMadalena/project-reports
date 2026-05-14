import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

async function ensureAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return null;
  }

  return currentUser;
}

export async function GET(req: Request, { params }: Params) {
  const currentUser = await ensureAdmin();

  if (!currentUser) {
    return Response.json(
      { error: "Não autorizado." },
      { status: 403 }
    );
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return Response.json(
      { error: "Membro não encontrado." },
      { status: 404 }
    );
  }

  return Response.json(user);
}

export async function PATCH(req: Request, { params }: Params) {
  const currentUser = await ensureAdmin();

  if (!currentUser) {
    return Response.json(
      { error: "Não autorizado." },
      { status: 403 }
    );
  }

  const { id } = await params;
  const { name, email, role } = await req.json();

  const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

  if (!name || !email || !role) {
    return Response.json(
      { error: "Nome, email e perfil são obrigatórios." },
      { status: 400 }
    );
  }

  if (!allowedRoles.includes(role)) {
    return Response.json(
      { error: "Perfil inválido." },
      { status: 400 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return Response.json({
    message: "Membro atualizado com sucesso.",
    user: updatedUser,
  });
}

export async function DELETE(req: Request, { params }: Params) {
  const currentUser = await ensureAdmin();

  if (!currentUser) {
    return Response.json(
      { error: "Não autorizado." },
      { status: 403 }
    );
  }

  const { id } = await params;

  if (currentUser.id === id) {
    return Response.json(
      { error: "Você não pode excluir sua própria conta." },
      { status: 400 }
    );
  }

  const userToDelete = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });

  if (!userToDelete) {
    return Response.json(
      { error: "Membro não encontrado." },
      { status: 404 }
    );
  }

  if (userToDelete.role === "ADMIN") {
    const totalAdmins = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });

    if (totalAdmins <= 1) {
      return Response.json(
        { error: "Não é possível excluir o único administrador do sistema." },
        { status: 400 }
      );
    }
  }

  await prisma.user.delete({
    where: { id },
  });

  return Response.json({
    message: "Membro excluído com sucesso.",
  });
}