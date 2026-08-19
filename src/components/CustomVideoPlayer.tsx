 
"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react";

export default function CustomVideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowControls(true);
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration / 100) * seekTo;
      setProgress(seekTo);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      className="relative w-full bg-black group rounded-xl overflow-hidden border border-white/10 shadow-2xl"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full aspect-video object-cover cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        playsInline
      />

      {showControls && (
        <div
          className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none"
        >
          <div className="flex items-center gap-6 pointer-events-auto w-full">
            <button onClick={togglePlay} className="text-white hover:text-amber-500">
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
            
            <div className="flex-1 relative flex items-center h-4 group/progress cursor-pointer">
              <input 
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleMute} className="text-white hover:text-amber-500">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <button onClick={toggleFullScreen} className="text-white hover:text-amber-500">
                <Maximize size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Big Play Button Overlay when paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-24 h-24 bg-amber-500/90 rounded-full flex items-center justify-center pl-2 shadow-[0_0_30px_rgba(255,184,0,0.5)] backdrop-blur-md">
            <Play size={40} className="text-black fill-black" />
          </div>
        </div>
      )}
    </div>
  );
}
