"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadMember() {
      try {
        const response = await fetch(`/api/team/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.error || "Erro ao carregar membro.");
          return;
        }

        const member = data as TeamMember;

        setName(member.name);
        setEmail(member.email);
        setRole(member.role);
      } catch (error) {
        console.error(error);
        setMessage("Erro de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    }

    loadMember();
  }, [id]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erro ao atualizar membro.");
        return;
      }

      router.push("/dashboard/team");
    } catch (error) {
      console.error(error);
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f7fb] px-6 py-10">
        <div className="mx-auto max-w-3xl text-gray-600">
          Carregando membro...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => router.push("/dashboard/team")}
          className="mb-6 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Voltar para equipe
        </button>

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#682dbf]">Editar membro</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Atualizar dados do membro
            </h1>
            <p className="mt-2 text-gray-600">
              Altere nome, email e perfil de acesso.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-[#682dbf] focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-[#682dbf] focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Perfil de acesso
              </label>

              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-[#682dbf] focus:bg-white"
              >
                <option value="MEMBER">Member — acesso básico</option>
                <option value="MANAGER">Manager — gerencia projetos</option>
                <option value="ADMIN">Admin — acesso total</option>
              </select>
            </div>

            {message && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-gradient-to-r from-[#22004e] to-[#682dbf] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/team")}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
