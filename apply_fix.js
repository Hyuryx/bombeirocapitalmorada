const fs = require('fs');
let html = fs.readFileSync('body_extracted.html', 'utf8');

// remove scripts inside HTML, as we will use React useEffect for the ones we need
html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

const startStr = '<div id="view-viaturas"';
const endStr = '<div id="view-hierarquia"';

const startIdx = html.indexOf(startStr);
const endIdx = html.indexOf(endStr);

let htmlBeforeViaturas = html.substring(0, startIdx);
let htmlAfterViaturas = html.substring(endIdx);

// AGORA VAMOS EXTRAIR TAMBÉM O VIEW-CURSOS!
const startCursosStr = '<div id="view-cursos"';
const endCursosStr = '<div id="view-modulacao"';

const startCursosIdx = htmlBeforeViaturas.indexOf(startCursosStr);
const endCursosIdx = htmlBeforeViaturas.indexOf(endCursosStr);

let htmlBeforeCursos = htmlBeforeViaturas;
let htmlBetweenCursosAndViaturas = "";

if (startCursosIdx !== -1 && endCursosIdx !== -1) {
    htmlBeforeCursos = htmlBeforeViaturas.substring(0, startCursosIdx);
    htmlBetweenCursosAndViaturas = htmlBeforeViaturas.substring(endCursosIdx);
}

let pageContent = `"use client";
import React, { useEffect } from "react";
import ViewViaturas from "@/components/views/ViewViaturas";
import ViewCursos from "@/components/views/ViewCursos";

export default function Home() {
  useEffect(() => {
    // Iniciar scripts Vanilla
    const initVanilla = () => {
      if (typeof window !== 'undefined') {
        if (window.initApp) window.initApp();
        if (window.initAnimations) window.initAnimations();
        if (window.initSecondaryApp) window.initSecondaryApp();
      }
    };
    
    // Configura os vídeos iniciais
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
    if(v1 && v2) {
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
            if (!v.isFading && v.duration > 0 && (v.duration - v.currentTime <= 1.0)) {
                v.isFading = true;
                playNextVideo();
            }
        }

        v1.addEventListener('timeupdate', handleTimeUpdate);
        v2.addEventListener('timeupdate', handleTimeUpdate);
    }

    setTimeout(initVanilla, 1000);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: \` + JSON.stringify(htmlBeforeCursos) + \` }} />
      <ViewCursos />
      <div dangerouslySetInnerHTML={{ __html: \` + JSON.stringify(htmlBetweenCursosAndViaturas) + \` }} />
      <ViewViaturas />
      <div dangerouslySetInnerHTML={{ __html: \` + JSON.stringify(htmlAfterViaturas) + \` }} />
    </>
  );
}
`;

fs.writeFileSync('next-app/src/app/page.js', pageContent);
console.log('Fixed page.js with ViewCursos and ViewViaturas components!');
