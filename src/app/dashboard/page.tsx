import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const stats = [
    { title: "Projetos ativos", value: "04" },
    { title: "Relatórios criados", value: "12" },
    { title: "Membros da equipe", value: "08" },
  ];

  const projects = [
    {
      name: "Portal Institucional",
      status: "Em andamento",
      description: "Atualizações visuais e melhorias de acessibilidade.",
    },
    {
      name: "Sistema de Relatórios",
      status: "Planejamento",
      description:
        "Estrutura da área interna para projetos e relatórios em Markdown.",
    },
    {
      name: "Dashboard de Indicadores",
      status: "Concluído",
      description: "Painel com visualização dos dados operacionais da equipe.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Área interna</p>

            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <p className="mt-2 text-gray-600">
              Gerencie projetos, relatórios e acessos da sua equipe.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {user.role === "ADMIN" && (
              <Link
                href="/dashboard/team"
                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-center text-sm font-medium text-gray-900 transition hover:bg-gray-100"
              >
                Equipe
              </Link>
            )}

            <Link
              href="/dashboard/projects"
              className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Projetos
            </Link>
          </div>
        </header>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.title}</p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {item.value}
              </h2>
            </div>
          ))}
        </section>

        <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Bem-vinda, {user.name}
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            Este será o espaço para acompanhar os projetos da equipe, criar
            relatórios em Markdown e controlar quais usuários têm acesso a cada
            projeto.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Perfil de acesso:{" "}
            <span className="font-semibold text-gray-900">{user.role}</span>
          </p>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Projetos recentes
            </h2>

            <button className="text-sm font-medium text-gray-700 hover:text-black">
              Ver todos
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {project.status}
                  </span>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {project.description}
                </p>

                <button className="mt-6 text-sm font-semibold text-black hover:opacity-70">
                  Abrir projeto →
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
