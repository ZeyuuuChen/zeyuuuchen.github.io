import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto">
        <div className="relative flex flex-col min-h-full">
          <div className="relative z-10 flex-1 p-8 md:p-16 lg:p-32 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto w-full gap-12">
          
          {/* Intro Content (Left) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mb-8"
            >
              {/* <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-[var(--color-ink)] uppercase">
                Zeyu Chen
              </h1> */}
              <img 
                src="signature.png" 
                alt="Zeyu Chen Signature" 
                className={`h-20 md:h-28 lg:h-32 object-contain filter drop-shadow-sm transition-all duration-500 ${theme === 'dark' ? 'invert' : ''}`}
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="font-body text-sm md:text-base leading-loose text-[var(--color-ink)]/80 mb-12"
            >
              <p className="mb-6 font-bold text-blue-900 text-lg">
                — {t("AI Researcher | Photographer", "AI 研究员 | 摄影师")}
              </p>
              <blockquote className="mb-6 italic border-l-2 border-[var(--color-ink)]/30 pl-4 text-[var(--color-ink)]/70">
                "Ich bin ein Verehrer der Wandern, des Wechsels, der Phantasie. Ich halte nichts davon, meine Liebe an irgend einen Fleck der Erde festzunageln." <br/>
                <span className="text-sm">— Hermann Hesse</span>
              </blockquote>
              <p className="font-medium text-[var(--color-ink)]">
                {t("Maybe we can be friends.", "也许我们可以成为朋友。")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-wrap gap-8"
            >
              <Link to="/research" className="font-mono font-bold uppercase tracking-widest text-xs border-b border-[var(--color-ink)]/30 pb-1 text-[var(--color-ink)] hover:text-blue-900 hover:border-blue-900 hover:scale-105 transition-all duration-300 inline-block origin-left">
                {t("Explore Research", "探索研究")}
              </Link>
              <Link to="/portfolio" className="font-mono font-bold uppercase tracking-widest text-xs border-b border-[var(--color-ink)]/30 pb-1 text-[var(--color-ink)] hover:text-blue-900 hover:border-blue-900 hover:scale-105 transition-all duration-300 inline-block origin-left">
                {t("View Portfolio", "查看作品集")}
              </Link>
            </motion.div>
          </div>

          {/* Hand-drawn Boy with Camera (Right) - Improved */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full md:w-1/2 flex justify-center items-center"
          >
            <svg viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-full max-w-[500px] text-[var(--color-ink)] opacity-90">
              
              {/* Blue Accents */}
              <path d="M160,260 L120,290 L60,420 L140,450 L170,300 Z" fill="#60a5fa" fillOpacity="0.3" stroke="none" />
              <path d="M340,260 L380,290 L440,350 L400,450 L330,300 Z" fill="#60a5fa" fillOpacity="0.3" stroke="none" />
              <path d="M380,140 Q400,120 430,130 Q460,130 450,160 Q470,180 440,190 L370,190 Q340,180 350,160 Q340,130 380,140 Z" fill="#60a5fa" fillOpacity="0.2" stroke="none" />
              <path d="M30,390 L70,330 L100,370 L130,320 L170,390 Z" fill="#60a5fa" fillOpacity="0.2" stroke="none" />

              {/* Doodles */}
              <circle cx="80" cy="80" r="12" stroke="#eab308" strokeWidth="3" />
              <path d="M80,55 L80,45 M80,105 L80,115 M55,80 L45,80 M115,80 L125,80 M62,62 L55,55 M98,98 L105,105 M62,98 L55,105 M98,62 L105,55" stroke="#eab308" strokeWidth="3" />
              
              <path d="M380,140 Q400,120 430,130 Q460,130 450,160 Q470,180 440,190 L370,190 Q340,180 350,160 Q340,130 380,140 Z" strokeWidth="3" />
              
              <path d="M30,390 L70,330 L100,370 L130,320 L170,390" strokeWidth="3" />
              <path d="M70,330 L70,350 M130,320 L130,340" strokeWidth="3" />
              
              <path d="M380,420 L380,460 A8,8 0 1,1 365,460 A8,8 0 1,1 380,460 M380,420 L410,410 L410,450 A8,8 0 1,1 395,450 A8,8 0 1,1 410,450 M380,435 L410,425" strokeWidth="3" />
              
              <path d="M140,120 L145,135 L160,135 L148,145 L152,160 L140,150 L128,160 L132,145 L120,135 L135,135 Z" strokeWidth="2" />
              
              <path d="M450,100 A10,10 0 0,1 470,100 A10,10 0 0,1 490,100 Q490,120 470,135 Q450,120 450,100 Z" stroke="#ef4444" strokeWidth="3" />

              {/* Character */}
              {/* Hair Back */}
              <path d="M150,150 Q160,80 250,70 Q340,80 350,150" strokeWidth="4" />
              
              {/* Face */}
              <path d="M170,170 C170,260 330,260 330,170" strokeWidth="4" fill="var(--color-bg)" />
              
              {/* Ears */}
              <path d="M170,170 C150,170 150,200 170,200" strokeWidth="4" fill="var(--color-bg)" />
              <path d="M330,170 C350,170 350,200 330,200" strokeWidth="4" fill="var(--color-bg)" />

              {/* Hair Front (Bangs) */}
              <path d="M150,150 L170,120 L180,140 L210,100 L230,130 L260,90 L280,120 L310,100 L330,130 L350,150" strokeWidth="4" fill="var(--color-bg)" />
              <path d="M170,90 L150,70 M210,70 L200,40 M270,70 L290,40 M330,100 L360,80" strokeWidth="4" />

              {/* Glasses */}
              <circle cx="210" cy="160" r="28" strokeWidth="4" fill="var(--color-bg)" />
              <circle cx="290" cy="160" r="28" strokeWidth="4" fill="var(--color-bg)" />
              <path d="M238,155 Q250,145 262,155" strokeWidth="4" />
              <path d="M182,155 L165,150" strokeWidth="4" />
              <path d="M318,155 L335,150" strokeWidth="4" />

              {/* Eyes */}
              <circle cx="210" cy="160" r="5" fill="currentColor" stroke="none" />
              <circle cx="290" cy="160" r="5" fill="currentColor" stroke="none" />

              {/* Smile */}
              <path d="M240,195 Q250,205 260,195" strokeWidth="4" />

              {/* Cheeks */}
              <path d="M180,185 L195,180 M185,190 L195,185" stroke="#f87171" strokeWidth="3" opacity="0.6" />
              <path d="M305,180 L320,185 M305,185 L315,190" stroke="#f87171" strokeWidth="3" opacity="0.6" />

              {/* Neck & T-shirt */}
              <path d="M230,240 L230,270 M270,240 L270,270" strokeWidth="4" />
              <path d="M210,270 Q250,290 290,270" strokeWidth="4" />
              <path d="M230,270 L230,450 M270,270 L270,450" strokeWidth="4" />

              {/* Jacket */}
              <path d="M210,270 L160,290 L130,450" strokeWidth="4" />
              <path d="M290,270 L340,290 L370,450" strokeWidth="4" />
              <path d="M170,270 L120,300 L70,420 L100,450 L150,400" strokeWidth="4" />
              <path d="M330,270 L380,300 L440,360 L410,390 L360,340" strokeWidth="4" />
              <path d="M160,290 L130,300 M340,290 L370,300" strokeWidth="4" />

              {/* Camera Strap */}
              <path d="M210,270 C180,330 180,370 220,390" stroke="#78350f" strokeWidth="5" fill="none" />
              <path d="M290,270 C320,330 320,370 280,390" stroke="#78350f" strokeWidth="5" fill="none" />

              {/* Camera */}
              <rect x="130" y="230" width="90" height="60" rx="6" fill="var(--color-bg)" strokeWidth="4" />
              <circle cx="175" cy="260" r="18" strokeWidth="4" fill="var(--color-bg)" />
              <circle cx="175" cy="260" r="8" strokeWidth="4" />
              <rect x="140" y="220" width="25" height="10" rx="2" strokeWidth="4" fill="var(--color-bg)" />
              <circle cx="205" cy="245" r="5" fill="currentColor" stroke="none" />

              {/* Hands */}
              {/* Left Hand (holding camera) */}
              <path d="M130,250 C110,250 110,270 130,270 C110,270 110,290 130,290 C110,290 110,310 130,310" strokeWidth="4" fill="var(--color-bg)" />

              {/* Right Hand (Peace Sign) */}
              <path d="M380,330 L380,260 A12,12 0 0,1 404,260 L404,330" strokeWidth="4" fill="var(--color-bg)" />
              <path d="M404,330 L420,270 A12,12 0 0,1 444,275 L428,340" strokeWidth="4" fill="var(--color-bg)" />
              <path d="M370,340 C350,340 350,380 380,380 L420,380 C440,380 440,350 420,350 Z" strokeWidth="4" fill="var(--color-bg)" />
              <path d="M370,350 C390,340 410,360 400,370" strokeWidth="4" fill="none" />
            </svg>
          </motion.div>

        </div>
      </div>
    </div>
  </PageTransition>
  );
}
