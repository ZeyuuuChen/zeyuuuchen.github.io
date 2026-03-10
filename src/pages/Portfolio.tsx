import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "../components/PageTransition";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="flex flex-col h-full overflow-y-auto p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-8 text-center md:text-left">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">Portfolio</h1>
            <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
              Photography by Zeyu  (Loaded {displayImages.length} images)
            </p>
            <p className="font-serif italic text-sm md:text-base max-w-2xl opacity-60 leading-relaxed mx-auto md:mx-0 mt-2">
              "If your pictures aren't good enough, you're not close enough." — Robert Capa
            </p>
          </div>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
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
      </div>

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
