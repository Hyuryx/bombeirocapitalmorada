"use client";

export default function ViewGaleria() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: `<div id="view-galeria" class="global-view active" style="display:flex; height:100%; width:100%;" >
        <div class="background-overlay bg-galeria"></div>
        <main class="main-content" style="height: 100%; overflow-y: auto;">
            <section id="galeria" class="content-section active">
                <header class="section-header">
                    <h1>Galeria da Corporação</h1>
                    <p>Registros fotográficos e vídeos</p>
                </header>
                <!-- Menu de Pastas da Galeria -->
                <div id="galeria-menu"
                    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; margin: 40px auto; padding: 0 20px; width: 100%; max-width: 1200px;">
                    <div style="width: 100%; aspect-ratio: 1 / 1; cursor: pointer; border-radius: 15px; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; border: 2px solid rgba(255, 68, 68, 0.3);"
                        onclick="openGalleryFolder('videos')"
                        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 20px rgba(255, 68, 68, 0.5)'; this.style.borderColor='#ff4444'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.3)'; this.style.borderColor='rgba(255, 68, 68, 0.3)'">
                        <img src="assets/galeria/videos.png" alt="Vídeos" class="no-lightbox"
                            style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div style="width: 100%; aspect-ratio: 1 / 1; cursor: pointer; border-radius: 15px; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; border: 2px solid rgba(255, 68, 68, 0.3);"
                        onclick="openGalleryFolder('fotos')"
                        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 20px rgba(255, 68, 68, 0.5)'; this.style.borderColor='#ff4444'"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.3)'; this.style.borderColor='rgba(255, 68, 68, 0.3)'">
                        <img src="assets/galeria/foto.png" alt="Fotos" class="no-lightbox"
                            style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                </div>

                <!-- Área de Conteúdo da Galeria -->
                <div id="galeria-content-area" style=" margin-top: 20px;">
                    <button onclick="closeGalleryFolder()"
                        style="background: rgba(255, 68, 68, 0.8); border: 1px solid #ff4444; color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 1rem; margin-bottom: 20px; transition: background 0.3s ease;"
                        onmouseover="this.style.background='rgba(255, 68, 68, 1)'"
                        onmouseout="this.style.background='rgba(255, 68, 68, 0.8)'">
                        &#8592; Voltar para Pastas
                    </button>

                    <div class="content-box">
                        <!-- Tab: Vídeos -->
                        <div id="galeria-videos" class="gallery-content-tab" style="">
                            <div class="video-gallery-grid">
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/EkhytKX_Ue4" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/oCqNOgw4JgM" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/mqoHq8FV6UE" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/3FQVe8WqF2I" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/YDnmfjE8H1g" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/giQRNsU1dD0" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/UwYz2mHm9pI" allowfullscreen></iframe>
                                </div>
                                <div class="video-item">
                                    <iframe src="https://www.youtube.com/embed/Gu6FSwEWLTU" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>

                        <!-- Tab: Fotos -->
                        <div id="galeria-fotos" class="gallery-content-tab" style="">
                            <div class="video-gallery-grid">
                                <div class="video-item">
                                    <img src="assets/galeria/fotos/medusa.png" alt="Medusa">
                                </div>
                                <div class="video-item">
                                    <img src="assets/galeria/fotos/1.png" alt="Foto 1">
                                </div>
                                <div class="video-item">
                                    <img src="assets/galeria/fotos/2.png" alt="Foto 2">
                                </div>
                                <div class="video-item">
                                    <img src="assets/galeria/fotos/3.png" alt="Foto 3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>` }} />
  );
}