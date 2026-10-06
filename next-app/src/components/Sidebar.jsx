"use client";

export default function Sidebar({ currentView }) {
  if (currentView !== "cursos") return null;

  return (
    <aside className="w-[250px] bg-black/50 backdrop-blur-md border-r border-white/5 flex flex-col z-[100] h-full flex-shrink-0">
      <div className="text-center py-5 border-b border-white/10 mb-2">
        <img src="/assets/iconesite/icone.png" alt="Logo Bombeiros" className="w-[80%] max-w-[150px] mx-auto hover:scale-105 transition-transform cursor-pointer" />
      </div>
      
      <nav className="flex flex-col h-full p-4">
        <ul className="flex flex-col gap-2 flex-grow">
          <li className="p-3 rounded-lg cursor-pointer flex items-center gap-3 text-white bg-white/10 border-r-4 border-purple-500 font-bold">
            Evoluir
          </li>
          <li className="p-3 rounded-lg cursor-pointer flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            Curso de Piloto
          </li>
          {/* Outros cursos... */}
        </ul>
      </nav>
    </aside>
  );
}
