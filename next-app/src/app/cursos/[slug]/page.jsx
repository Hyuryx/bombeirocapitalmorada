"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { cursos } from "@/data/cursos";

const Livro3D = dynamic(
  () => import("@/components/Livro3D"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[#100e10] text-amber-200">
        Preparando manual de formação...
      </div>
    ),
  }
);

export default function PaginaCurso() {
  const params = useParams();
  const slug = params.slug;
  const curso = cursos[slug];

  if (!curso) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold">
          Curso não encontrado
        </h1>

        <a
          href="/cursos"
          className="mt-5 text-amber-400 underline"
        >
          Voltar aos cursos
        </a>
      </main>
    );
  }

  return <Livro3D curso={curso} />;
}
