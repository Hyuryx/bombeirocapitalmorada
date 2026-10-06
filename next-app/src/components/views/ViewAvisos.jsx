"use client";

export default function ViewAvisos() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: `<div id="view-avisos" class="global-view active" style="display:flex; height:100%; width:100%;"
        style=" flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 50px;">
        <div class="background-overlay bg-avisos"></div>
        <h1
            style="color: #fff; font-size: 3rem; letter-spacing: 5px; text-shadow: 0 0 10px rgba(255,255,255,0.2); margin-top: 50px;">
            AVISOS GERAIS</h1>
        <section class="avisos-gerais" style="width: 100%; max-width: 800px; overflow-y: auto; max-height: 60vh;">
            <div id="lista-avisos-gerais"></div>
        </section>
        <footer class="site-footer"
            style="position: absolute; bottom: 0; width: 100%; border-top: none; margin-top: 0; padding-bottom: 20px;">
            <p>&copy; 2026 ERREJOTA. Todos os direitos reservados.</p>
        </footer>
    </div>

    </div>` }} />
  );
}