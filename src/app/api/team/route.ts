import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(users);
  } catch (error) {
    console.error("Erro ao buscar equipe:", error);

    return Response.json(
      { error: "Erro ao buscar equipe." },
      { status: 500 }
    );
  }
}