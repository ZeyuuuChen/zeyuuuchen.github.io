import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "../components/PageTransition";
import { useLanguage } from "../contexts/LanguageContext";

const imageModules = import.meta.glob('/public/figs/portfolio/*.{png,jpg,JPG,jpeg,webp,gif}', { eager: true });
const portfolioImages = Object.keys(imageModules).map(key => key.replace('/public', ''));

const unsplashImages = [
  "https://images.unsplash.com/photo-1757520245420-e97d90bf668a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757520161565-824bd49e0819?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757520420440-510e246a90ca?q=80&w=1326&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355391-930bb6c7478d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136349808-f3b6cad32fa8?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355378-d47465b57199?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355390-3dfcd8029969?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355378-228c4e4f3d16?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355386-9d3a4fe29f8a?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355382-e27d8cc9ae22?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757520471103-f9d2b8c3d753?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1773136355576-c5c4a5ef7a41?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const displayImages = [...portfolioImages, ...unsplashImages];

export function Portfolio() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTVOpen, setIsTVOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    { id: "k92QMANTZnE", title: "Video 1" },
    { id: "dq3Xsb2gOJw", title: "Video 2" }
  ];

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col min-h-full p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-8 text-center md:text-left">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">
              {t("Portfolio", "作品集")}
            </h1>
            <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
              {t("Photography by Zeyu", "Zeyu 的摄影作品")} ({t("Loaded", "已加载")} {displayImages.length} {t("images", "张图片")})
            </p>
            <p className="font-serif italic text-sm md:text-base max-w-2xl opacity-60 leading-relaxed mx-auto md:mx-0 mt-2">
              {t("\"If your pictures aren't good enough, you're not close enough.\"","\"If your pictures aren't good enough, you're not close enough.\"")} — Robert Capa
            </p>
          </div>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mb-20">
          {displayImages.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 5) * 0.1, duration: 0.8 }}
              className="break-inside-avoid overflow-hidden cursor-pointer mb-6"
              onClick={() => setSelectedImage(imgSrc)}
            >
              <img
                src={imgSrc}
                alt={`Portfolio item ${idx + 1}`}
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex items-end justify-start mb-12 mt-12 gap-4">
          <RetroTV onClick={() => setIsTVOpen(true)} />
          <p className="font-serif italic text-sm opacity-60 mb-2">{t("You wanna see something?", "想看点什么吗？")}</p>
        </div>
      </div>
    </div>

    <AnimatePresence>
        {isTVOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-xl"
          >
            <button 
              onClick={() => {
                setIsTVOpen(false);
                setActiveVideo(null);
              }}
              className="absolute top-6 right-6 text-white/80 hover:text-white z-50 p-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {!activeVideo ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl"
              >
                {videos.map((video) => (
                  <div key={video.id} className="flex flex-col gap-4 w-full max-w-md">
                    <h3 className="text-white text-xl font-medium text-center tracking-wide">{video.title}</h3>
                    <div 
                      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl aspect-video"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-5xl flex flex-col gap-4"
              >
                <div className="flex justify-start">
                  <button 
                    onClick={() => setActiveVideo(null)}
                    className="text-white/80 hover:text-white flex items-center gap-2 transition-colors px-2 py-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    {t("Back", "返回")}
                  </button>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black w-full">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-[var(--color-bg)]/40 backdrop-blur-md cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged portfolio item"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

function RetroTV({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center cursor-pointer transition-transform duration-200 active:scale-95 group"
    >
      {/* Main Monitor Body */}
      <div className="w-56 h-40 bg-[#e6e6e1] rounded-2xl shadow-[0_15px_25px_rgba(0,0,0,0.15),inset_0_4px_10px_rgba(255,255,255,0.9),inset_0_-4px_10px_rgba(0,0,0,0.05)] p-3 relative z-10 border border-[#d1d1cc]">
        
        {/* Blue Faceplate */}
        <div className="w-full h-full bg-[#255b82] rounded-xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.5)] relative flex items-center p-3 border border-[#1a4363]">
          
          {/* Top Sensor / Camera */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0a0a0a] rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.2)]"></div>

          {/* Screen Area */}
          <div className="w-[75%] h-[85%] mt-1 bg-[#081616] rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden border-2 border-[#1c405c]">
            
            {/* Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-lg pointer-events-none"></div>

            {/* Static Noise (Hover) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden"
                >
                  <style>{`
                    @keyframes static-noise {
                      0%, 100% { transform: translate(0, 0); }
                      10% { transform: translate(-5%, -10%); }
                      20% { transform: translate(-15%, 5%); }
                      30% { transform: translate(7%, -25%); }
                      40% { transform: translate(20%, 25%); }
                      50% { transform: translate(-25%, 10%); }
                      60% { transform: translate(15%, 5%); }
                      70% { transform: translate(0%, 15%); }
                      80% { transform: translate(25%, 35%); }
                      90% { transform: translate(-10%, 10%); }
                    }
                    .animate-static {
                      animation: static-noise 0.2s steps(2) infinite;
                    }
                  `}</style>
                  <div 
                    className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-static"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px'
                    }}
                  ></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play Icon */}
            <motion.div 
              animate={{ opacity: isHovered ? 0 : 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#4ade80] border-b-[8px] border-b-transparent drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]"
            ></motion.div>
          </div>

          {/* Right Button */}
          <div className="absolute right-5 bottom-6 w-4 h-4 bg-[#111] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-black group-hover:scale-95 transition-transform"></div>
        </div>
      </div>

      {/* Stand */}
      <div className="w-24 h-5 bg-[#d1d1cc] -mt-2 z-0 shadow-[inset_0_4px_6px_rgba(0,0,0,0.2)] border-x border-[#b5b5b0]"></div>
      <div className="w-36 h-3 bg-[#e6e6e1] rounded-md shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-[#d1d1cc]"></div>
    </div>
  );
}
