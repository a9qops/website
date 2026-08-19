 
"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  services: string[];
  thumbnail: string;
  videoUrl: string;
};

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`text-sm md:text-base font-medium uppercase tracking-widest px-4 py-2 rounded-full ${
              activeFilter === category 
                ? "bg-amber-500 text-black font-bold" 
                : "text-zinc-400 hover:text-white border border-white/10 hover:border-white/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Static Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {filteredProjects.map((project) => (
          <div key={project.id}>
            <Link href={`/work/${project.id}`} className="group relative block overflow-hidden rounded-xl bg-zinc-900 aspect-video border border-white/5 shadow-2xl">
              {project.thumbnail ? (
                <Image 
                  src={project.thumbnail} 
                  alt={project.title} 
                  fill
                  className="object-cover opacity-80 group-hover:opacity-20 z-0"
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-800 opacity-80 group-hover:opacity-20 z-0" />
              )}
              
              {/* Cinematic Hover Video */}
              <video 
                src={project.videoUrl}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 z-10"
                onMouseEnter={(e) => {
                  const v = e.currentTarget;
                  v.play().catch(()=>{});
                }}
                onMouseLeave={(e) => { 
                  const v = e.currentTarget;
                  v.pause(); 
                  setTimeout(() => { v.currentTime = 0; }, 500); 
                }}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 z-20">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-amber-500 font-medium text-sm md:text-base tracking-widest uppercase opacity-0 group-hover:opacity-100 delay-75">{project.category}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
