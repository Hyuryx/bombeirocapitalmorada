window.initBackgroundVideos = function() {
    const video1 = document.getElementById('bg-video-inicio-1');
    const video2 = document.getElementById('bg-video-inicio-2');
    
    // Prevent multiple initializations
    if (!video1 || !video2 || window._bgVideosInitialized) return;
    window._bgVideosInitialized = true;

    const videosList = [
        '/assets/inicio/videos/inicio1.mp4',
        '/assets/inicio/videos/inicio2.mp4',
        '/assets/inicio/videos/inicio3.mp4',
        '/assets/inicio/videos/inicio4.mp4',
        '/assets/inicio/videos/inicio5.mp4',
        '/assets/inicio/videos/inicio6.mp4',
        '/assets/inicio/videos/inicio7.mp4',
        '/assets/inicio/videos/inicio8.mp4'
    ];

    let currentIndex = 0;
    const fadeDuration = 1.0; // 1 second crossfade

    // Initialize first video
    video1.src = videosList[0];
    video1.load();
    video1.play().catch(e => console.log("Autoplay prevented", e));

    // Preload second video
    video2.src = videosList[1];
    video2.load();

    function setupVideoListener(currentVid, nextVid) {
        currentVid.ontimeupdate = () => {
            if (currentVid.duration && currentVid.currentTime >= currentVid.duration - fadeDuration) {
                // Remove listener to prevent multiple triggers
                currentVid.ontimeupdate = null;
                
                // Start next video
                nextVid.play().catch(e => console.log("Autoplay prevented", e));
                
                // Crossfade
                nextVid.style.opacity = '1';
                currentVid.style.opacity = '0';
                
                // Update index
                currentIndex = (currentIndex + 1) % videosList.length;
                let nextToPreloadIndex = (currentIndex + 1) % videosList.length;
                
                // Wait for current video to finish fading out, then pause and update source
                setTimeout(() => {
                    currentVid.pause();
                    currentVid.src = videosList[nextToPreloadIndex];
                    currentVid.load();
                    // Set up listener for the newly active video
                    setupVideoListener(nextVid, currentVid);
                }, fadeDuration * 1000 + 200);
            }
        };
    }

    setupVideoListener(video1, video2);
};

// Auto-init for React
setTimeout(() => { if(window.initBackgroundVideos) window.initBackgroundVideos(); }, 1000);
