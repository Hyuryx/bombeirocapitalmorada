"use client";
import React, { useEffect } from "react";

export default function ViewInicio() {
  useEffect(() => {
    const videoFiles = [
        'assets/inicio/videos/inicio1.mp4',
        'assets/inicio/videos/inicio2.mp4',
        'assets/inicio/videos/inicio3.mp4',
        'assets/inicio/videos/inicio4.mp4',
        'assets/inicio/videos/inicio5.mp4',
        'assets/inicio/videos/inicio6.mp4',
        'assets/inicio/videos/inicio7.mp4',
        'assets/inicio/videos/inicio8.mp4'
    ];
    let currentIndex = 0;
    const v1 = document.getElementById('bg-video-inicio-1');
    const v2 = document.getElementById('bg-video-inicio-2');
    if(!v1 || !v2) return;
    let activeVideo = v1;
    let nextVideo = v2;

    v1.src = videoFiles[0];
    v1.load();
    v1.play().catch(e => console.log('Autoplay blocked:', e));

    v2.src = videoFiles[1];
    v2.load();

    function playNextVideo() {
        currentIndex = (currentIndex + 1) % videoFiles.length;
        
        nextVideo.play().then(() => {
            activeVideo.style.opacity = 0;
            nextVideo.style.opacity = 1;

            setTimeout(() => {
                let temp = activeVideo;
                activeVideo = nextVideo;
                nextVideo = temp;

                nextVideo.pause();
                nextVideo.currentTime = 0;
                nextVideo.isFading = false;
                nextVideo.src = videoFiles[(currentIndex + 1) % videoFiles.length];
                nextVideo.load();
            }, 1000);
        }).catch(e => console.log('Autoplay blocked:', e));
    }

    function handleTimeUpdate(e) {
        const v = e.target;
        // Start crossfade 1 second before end
        if (!v.isFading && v.duration > 0 && (v.duration - v.currentTime <= 1.0)) {
            v.isFading = true;
            playNextVideo();
        }
    }

    v1.addEventListener('timeupdate', handleTimeUpdate);
    v2.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
        v1.removeEventListener('timeupdate', handleTimeUpdate);
        v2.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex-1 w-full h-full overflow-y-auto" dangerouslySetInnerHTML={{ __html: `<div id="view-inicio" class="global-view active" style="display:flex; height:100%; width:100%;">
        <!-- Sequence of Videos -->
        <div id="video-sequence-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: -2;">
            <video id="bg-video-inicio-1" muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1s ease-in-out; opacity: 1;"></video>
            <video id="bg-video-inicio-2" muted playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1s ease-in-out; opacity: 0;"></video>
        </div>

        <!-- Logo Centralizada -->
        <div id="inicio-logo-container" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; pointer-events: none;">
            <img src="assets/inicio/Logotipo Bombeiros Capital Morada.png" alt="Logo Capital Morada" style="width: 100%; max-width: 600px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8)); animation: fadeIn 2s ease-out;">
        </div>

        <footer class="site-footer"
            style="position: absolute; bottom: 0; width: 100%; border-top: none; margin-top: 0; padding-bottom: 20px;">
            <p>&copy; 2026 ERREJOTA. Todos os direitos reservados.</p>
        </footer>
    </div>` }} />
  );
}