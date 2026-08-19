"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function YouTubeFacade({
  videoId,
  posterUrl,
  altText,
}: {
  videoId: string;
  posterUrl?: string | null;
  altText?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Derive poster: use provided poster, otherwise fallback to high-res YouTube thumbnail
  const finalPoster = posterUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="w-full aspect-video relative overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.button
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${altText || 'Project video'}`}
            className="absolute inset-0 w-full h-full group overflow-hidden bg-zinc-900 block focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={finalPoster}
              alt={altText || ""}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,184,0,0.3)] transform transition-transform duration-300 group-hover:scale-110">
                <Play size={40} className="text-black fill-black ml-2" />
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.iframe
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={altText || "YouTube Video Player"}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </AnimatePresence>
    </section>
  );
}
