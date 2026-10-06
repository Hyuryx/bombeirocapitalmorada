"use client";
import MagneticElement from "./animations/MagneticElement";

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "inicio", label: "INÍCIO" },
    { id: "avisos", label: "AVISOS GERAIS" },
    { id: "regras", label: "REGRAS" },
    { id: "uniformes", label: "UNIFORMES" },
    { id: "cursos", label: "CURSOS" },
    { id: "modulacao", label: "MODULAÇÃO" },
    { id: "viaturas", label: "VIATURAS" },
    { id: "hierarquia", label: "HIERARQUIA" },
    { id: "planilhas", label: "PLANILHA" },
    { id: "galeria", label: "GALERIA" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-[#0a0a0c] flex justify-between items-center px-10 z-[2000]">
      <div className="flex items-center gap-4">
        <img src="/assets/fotos/logo-capital.png" alt="Logo" className="h-[35px] object-contain" />
        <span className="text-lg font-extrabold text-white tracking-widest">PORTAL CBM</span>
      </div>

      <ul className="flex gap-2 list-none">
        {tabs.map((tab) => (
          <MagneticElement key={tab.id} strength={0.2}>
            <li 
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 font-semibold text-sm rounded-lg cursor-pointer transition-all duration-300 ${
                activeTab === tab.id 
                  ? "text-white bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/10 hover:-translate-y-0.5"
              }`}
            >
              {tab.label}
            </li>
          </MagneticElement>
        ))}
      </ul>
    </nav>
  );
}
