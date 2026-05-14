import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getProjects() {
  return prisma.project.findMany({
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
}

export default async function ProjectsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#682dbf]">Projetos</p>
            <h1 className="text-3xl font-bold text-gray-900">
              Projetos cadastrados
            </h1>
            <p className="mt-2 text-gray-600">
              Acompanhe os projetos internos e seus relatórios.
            </p>
          </div>

          <a
            href="/dashboard/projects/new"
            className="rounded-xl bg-gradient-to-r from-[#22004e] to-[#682dbf] px-5 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95"
          >
            + Novo projeto
          </a>
        </header>

        {projects.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Nenhum projeto cadastrado
            </h2>
            <p className="mt-2 text-gray-600">
              Crie o primeiro projeto para começar a organizar os relatórios da
              equipe, use o botão "Novo projeto" no topo para começar.
            </p>
          </section>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project: any) => (
              <article
                key={project.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                      /{project.slug}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#f1ecff] px-3 py-1 text-xs font-medium text-[#682dbf]">
                    {project.status}
                  </span>
                </div>

                <p className="min-h-12 text-sm leading-6 text-gray-600">
                  {project.description || "Sem descrição cadastrada."}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-xs text-gray-500">
                    Criado em{" "}
                    {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                  </span>

                  <a
                    href={`/dashboard/projects/${project.slug}`}
                    className="text-sm font-semibold text-[#682dbf] hover:underline"
                  >
                    Abrir
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
