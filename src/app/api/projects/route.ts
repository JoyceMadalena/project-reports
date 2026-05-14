import { prisma } from "../../../lib/prisma";
import { getCurrentUser } from "../../../lib/auth";

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      status: true,
      createdAt: true,
    },
  });

  return Response.json(projects);
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return Response.json(
      { error: "Apenas administradores podem criar projetos." },
      { status: 403 }
    );
  }

  const { name, slug, description, status } = await req.json();

  if (!name || !slug) {
    return Response.json(
      { error: "Nome e slug são obrigatórios." },
      { status: 400 }
    );
  }

  const existingProject = await prisma.project.findUnique({
    where: { slug },
  });

  if (existingProject) {
    return Response.json(
      { error: "Já existe um projeto com esse slug." },
      { status: 409 }
    );
  }

  const project = await prisma.project.create({
    data: {
      name,
      slug,
      description,
      status: status || "PLANNING",
    },
  });

  return Response.json(
    {
      message: "Projeto criado com sucesso.",
      project,
    },
    { status: 201 }
  );
}