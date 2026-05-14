"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewMemberPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erro ao cadastrar membro.");
        return;
      }

      router.push("/dashboard/team");
    } catch (error) {
      console.error(error);
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
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
            <p className="text-sm font-medium text-[#682dbf]">Novo membro</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Cadastrar membro da equipe
            </h1>
            <p className="mt-2 text-gray-600">
              Defina os dados e o perfil de acesso do novo usuário.
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
                placeholder="Ex: Ana Silva"
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
                placeholder="ana@email.com"
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
                <option value="MEMBER">Member (acesso básico)</option>
                <option value="MANAGER">Manager (gerencia projetos)</option>
                <option value="ADMIN">Admin (acesso total)</option>
              </select>

              <p className="mt-2 text-xs text-gray-500">
                Use Admin apenas para pessoas que podem gerenciar equipe e
                permissões.
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Senha provisória
              </label>
              <input
                id="password"
                type="text"
                placeholder="Senha provisória"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-[#682dbf] focus:bg-white"
              />
            </div>

            {message && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-[#22004e] to-[#682dbf] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Cadastrando..." : "Cadastrar membro"}
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
