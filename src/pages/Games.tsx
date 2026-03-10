import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";

export function Games() {
  return (
    <PageTransition>
      <div className="flex flex-col h-full overflow-y-auto p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
        <header className="mb-20 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">Interactive</h1>
          <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
            Playful experiments and game development projects.
          </p>
        </header>

        <div className="flex-1 flex items-center justify-center py-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-[var(--color-ink)]/5 rounded-[3rem] p-12 md:p-20 max-w-3xl w-full text-center relative overflow-hidden border border-dashed border-[var(--color-ink)]/20 shadow-sm"
          >
            {/* Decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute top-12 left-12 w-16 h-16 border border-dashed border-[var(--color-ink)]/20 rounded-full opacity-50"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute bottom-12 right-12 w-24 h-24 border border-[var(--color-ink)]/10 rounded-full opacity-50"
            ></motion.div>

            <h2 className="font-serif text-2xl md:text-4xl text-[var(--color-ink)] uppercase mb-8 relative z-10">
              DragonBooom
            </h2>
            
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 mb-10 inline-block border border-[var(--color-ink)]/20 rounded-full px-4 py-1 relative z-10">
              Unity3D Game
            </div>

            <p className="font-body text-sm md:text-base opacity-80 mb-12 leading-relaxed max-w-xl mx-auto relative z-10">
              An interactive educational game developed using Unity3D, adapted from the traditional Chinese Lantern Festival custom of Bench Dragon Lanterns. The project has received multiple awards in various competitions.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-serif uppercase tracking-widest text-xs bg-[var(--color-ink)] text-[var(--color-bg)] px-10 py-4 rounded-full relative z-10 hover:shadow-lg transition-shadow duration-300"
            >
              Play Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
