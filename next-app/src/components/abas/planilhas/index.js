export default `<div id="view-planilhas" class="global-view" style="display: none;">
        <div class="background-overlay bg-planilhas"></div>
        <div class="app-container">
            <aside class="sidebar" id="sidebar-default-planilhas"></aside>
            <main class="main-content" style="height: 100%; overflow-y: auto; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 30px;">
                <div id="planilha-target" style="position: relative; z-index: 2; width: 95%; max-width: 1200px; height: 65vh; margin-top: 10px; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.5); background: #fff;">
                    <!-- Botão de Expandir -->
                    <button onclick="document.getElementById('planilha-iframe').requestFullscreen()" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; z-index: 10; font-weight: bold; transition: all 0.3s;" onmouseover="this.style.background='rgba(0,0,0,0.9)'" onmouseout="this.style.background='rgba(0,0,0,0.7)'">
                        ⛶ Expandir Tela Cheia
                    </button>
                    <iframe id="planilha-iframe" src="https://docs.google.com/spreadsheets/d/1rnK19wQkGAWG907tO530ReVBcpRFu-4VN7QzdbIFgbo/htmlembed?widget=true&amp;headers=false" width="100%" height="100%" frameborder="0" style="background: white;"></iframe>
                </div>

                <footer class="site-footer" style="margin-top: auto; width: 100%; border-top: none; padding-top: 40px; padding-bottom: 20px;">
                    <p>© 2026 ERREJOTA. Todos os direitos reservados.</p>
                </footer>
            </main>
        </div>
    </div>
`;
