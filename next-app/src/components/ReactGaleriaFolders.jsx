'use client';

import React from 'react';
import FolderFloat from './FolderFloat';

export default function ReactGaleriaFolders() {
  const videoItems = ['Vídeo 1', 'Treinamento', 'Resgate 02', 'Operação Tática', 'Câmera Corporal'];
  const fotoItems = ['Foto 1', 'Medusa', 'Foto 2', 'Foto 3', 'Equipe Alpha'];

  const handleOpenVideos = () => {
    if (typeof window !== 'undefined' && window.openGalleryFolder) {
      window.openGalleryFolder('videos');
    }
  };

  const handleOpenFotos = () => {
    if (typeof window !== 'undefined' && window.openGalleryFolder) {
      window.openGalleryFolder('fotos');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '40px', margin: '30px auto', padding: '0 20px', width: '100%', maxWidth: '1050px', placeItems: 'center' }}>
      <FolderFloat
        items={videoItems}
        label=""
        sublabel=""
        trigger="hover"
        closeOnSelect={false}
        physics={true}
        drift={0.5}
        onClickFolder={handleOpenVideos}
        onSelect={handleOpenVideos}
        frontImage="assets/galeria/videos.png"
        folderColor="#27272a"
        frontColor="#3f3f46"
        paperColor="#f5f5f5"
        itemColor="#ff4444"
        itemTextColor="#ffffff"
        width={420}
        height={460}
        radius={16}
        spread={280}
        lift={60}
        tilt={12}
        flapAngle={35}
        restAngle={10}
        openDuration={600}
        stagger={60}
        bounce={0.35}
      />

      <FolderFloat
        items={fotoItems}
        label=""
        sublabel=""
        trigger="hover"
        closeOnSelect={false}
        physics={true}
        drift={0.5}
        onClickFolder={handleOpenFotos}
        onSelect={handleOpenFotos}
        frontImage="assets/galeria/foto.png"
        folderColor="#27272a"
        frontColor="#3f3f46"
        paperColor="#f5f5f5"
        itemColor="#ff4444"
        itemTextColor="#ffffff"
        width={420}
        height={460}
        radius={16}
        spread={280}
        lift={60}
        tilt={12}
        flapAngle={35}
        restAngle={10}
        openDuration={600}
        stagger={60}
        bounce={0.35}
      />
    </div>
  );
}
