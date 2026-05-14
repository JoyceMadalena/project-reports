"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteMemberButtonProps = {
  userId: string;
  userName: string;
};

export default function DeleteMemberButton({
  userId,
  userName,
}: DeleteMemberButtonProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleDelete() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/team/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Erro ao excluir membro.");
        return;
      }

      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title="Excluir membro"
        className="rounded-lg p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <p className="text-sm font-medium text-red-600">Excluir membro</p>

              <h2 className="mt-2 text-xl font-bold text-gray-900">
                Tem certeza que deseja excluir?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Você está prestes a excluir{" "}
                <span className="font-semibold text-gray-900">{userName}</span>.
                Essa ação não poderá ser desfeita.
              </p>
            </div>

            {message && (
              <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setMessage("");
                }}
                disabled={loading}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Excluindo..." : "Excluir membro"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
