import { Pencil } from "lucide-react";
import DeleteMemberButton from "@/components/team/DeleteMemberButton";

async function getTeam() {
  const response = await fetch("http://localhost:3000/api/team", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#682dbf]">Equipe</p>
            <h1 className="text-3xl font-bold text-gray-900">
              Membros cadastrados
            </h1>
            <p className="mt-2 text-gray-600">
              Gerencie os acessos e usuários do sistema.
            </p>
          </div>

          <a
            href="/dashboard/team/new"
            className="rounded-xl bg-gradient-to-r from-[#22004e] to-[#682dbf] px-5 py-3 text-sm font-semibold text-white shadow-md hover:opacity-95"
          >
            + Novo membro
          </a>
        </header>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-5 border-b border-gray-100 px-6 py-4 text-sm font-medium text-gray-500">
            <span>Nome</span>
            <span>Email</span>
            <span>Perfil</span>
            <span>Cadastro</span>
            <span>Ações</span>
          </div>

          {team.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Nenhum membro cadastrado.
            </div>
          ) : (
            team.map((user: any) => (
              <div
                key={user.id}
                className="grid grid-cols-5 items-center border-b border-gray-100 px-6 py-4 text-sm transition last:border-0 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{user.name}</span>

                <span className="text-gray-600">{user.email}</span>

                <span>
                  <span className="rounded-full bg-[#f1ecff] px-3 py-1 text-xs font-medium text-[#682dbf]">
                    {user.role}
                  </span>
                </span>

                <span className="text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`/dashboard/team/${user.id}/edit`}
                    title="Editar membro"
                    className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[#682dbf]"
                  >
                    <Pencil size={18} />
                  </a>

                  <DeleteMemberButton userId={user.id} userName={user.name} />
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
