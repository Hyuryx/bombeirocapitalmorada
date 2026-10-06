"use client";

export default function ViewPlanilhas() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: `<div id="view-planilhas" class="global-view active" style="display:flex; height:100%; width:100%;"
        style=" flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 50px;">
        <div class="background-overlay bg-planilhas"></div>
        <h1
            style="color: #fff; font-size: 3rem; letter-spacing: 5px; text-shadow: 0 0 10px rgba(255,255,255,0.2); margin-top: 50px; position: relative; z-index: 2;">
            PLANILHA</h1>

        <div
            style="position: relative; z-index: 2; width: 90%; max-width: 1200px; height: 60vh; margin-top: 20px; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.5); background: #fff;">
            <!-- Botão de Expandir -->
            <button onclick="document.getElementById('planilha-iframe').requestFullscreen()"
                style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; z-index: 10; font-weight: bold; transition: all 0.3s;"
                onmouseover="this.style.background='rgba(0,0,0,0.9)'"
                onmouseout="this.style.background='rgba(0,0,0,0.7)'">
                ⛶ Expandir Tela Cheia
            </button>
            <iframe id="planilha-iframe"
                src="https://docs.google.com/spreadsheets/d/1rnK19wQkGAWG907tO530ReVBcpRFu-4VN7QzdbIFgbo/htmlembed?widget=true&headers=false"
                width="100%" height="100%" frameborder="0" style="background: white;"></iframe>
        </div>

        <footer class="site-footer"
            style="position: absolute; bottom: 0; width: 100%; border-top: none; margin-top: 0; padding-bottom: 20px;">
            <p>&copy; 2026 ERREJOTA. Todos os direitos reservados.</p>
        </footer>
    </div>

    </div>` }} />
  );
}