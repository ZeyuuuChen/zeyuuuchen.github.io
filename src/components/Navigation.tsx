import { NavLink } from "react-router-dom";
import { Mail, Linkedin, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export function Navigation() {
  const { t } = useLanguage();
  
  const links = [
    { path: "/", label: t("Home", "主页") },
    { path: "/education", label: t("Education", "教育") },
    { path: "/research", label: t("Research", "研究") },
    { path: "/portfolio", label: t("Portfolio", "作品集") },
  ];

  const [eyeState, setEyeState] = useState("normal");
  const [phrase, setPhrase] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  const phrases = [
    "你好! (Nǐ Hǎo)",
    "Beep boop!",
    "Bonjour! ",
    "Processing...",
    "こんにちは! (Hi!)",
    "Wow!",
    "Ciao!",
    "Oi!Oi!",
    "¡Hola! ",
    "안녕하세요! (Hi!)",
    "Exploring...",
    "Hallo! ",
    "مرحبا! ",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const states = ["normal", "blink", "lookLeft", "lookRight", "happy", "surprised"];
      const randomState = states[Math.floor(Math.random() * states.length)];
      setEyeState(randomState);
      
      // Randomly show a speech bubble
      if (Math.random() > 0.6 && !showBubble) {
        setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
        setShowBubble(true);
        setTimeout(() => setShowBubble(false), 2000);
      }
      
      // Return to normal after a short duration if it's a blink or expression
      if (randomState !== "normal") {
        setTimeout(() => setEyeState("normal"), 800);
      }
    }, 3000); // Change state every 3 seconds

    return () => clearInterval(interval);
  }, [showBubble]);

  const getEyeAnimation = (isLeft: boolean) => {
    switch (eyeState) {
      case "blink":
        return { scaleY: 0.1, transition: { duration: 0.1, yoyo: 1 } };
      case "lookLeft":
        return { x: -4, transition: { duration: 0.3 } };
      case "lookRight":
        return { x: 4, transition: { duration: 0.3 } };
      case "happy":
        return { scaleY: 0.5, y: -2, borderRadius: "50% 50% 0 0", transition: { duration: 0.2 } };
      case "surprised":
        return { scale: 1.5, transition: { duration: 0.2 } };
      default:
        return { x: 0, y: 0, scale: 1, scaleY: 1, borderRadius: "50%", transition: { duration: 0.3 } };
    }
  };

  return (
    <nav className="flex flex-row md:flex-col h-full py-6 px-6 md:py-12 md:px-12 items-center md:items-start relative">
      <div className="md:mb-32 text-left flex flex-col items-start gap-2 relative">
        <img 
          src="signature-zeyu.png" 
          alt="Zeyu Signature" 
          className="h-6 md:h-9 object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      <ul className="flex flex-row md:flex-col gap-6 md:gap-8 ml-auto md:ml-0 overflow-x-auto md:overflow-visible items-center md:items-start w-full md:w-auto">
        {links.map((link) => (
          <li key={link.path} className="flex-shrink-0">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block font-serif uppercase tracking-widest transition-all duration-500 origin-left ${
                  isActive
                    ? "text-blue-900 font-bold text-lg md:text-xl"
                    : "text-slate-400 text-xs md:text-sm hover:scale-110 hover:text-slate-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Social Links & Robot - Bottom Left */}
      <div className="flex flex-col items-center md:items-start gap-5 fixed md:absolute bottom-8 left-6 md:bottom-12 md:left-12 z-50">
        {/* Social Links - Hidden on mobile to avoid covering content */}
        <div className="hidden md:flex flex-col gap-5">
          <a href="mailto:chenzeyu114@gmail.com" className="text-slate-400 hover:text-blue-900 hover:scale-110 transition-all duration-300" title="Email">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-900 hover:scale-110 transition-all duration-300" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-900 hover:scale-110 transition-all duration-300" title="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        {/* Animated Robot Eyes - Always visible, placed below icons on desktop */}
        <div className="relative">
          <div className="flex gap-2 items-center justify-center w-10 h-6 bg-[var(--color-ink)] rounded-full px-2 shadow-inner">
            <motion.div 
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={getEyeAnimation(true)}
              style={{ boxShadow: "0 0 4px rgba(96, 165, 250, 0.8)" }}
            />
            <motion.div 
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={getEyeAnimation(false)}
              style={{ boxShadow: "0 0 4px rgba(96, 165, 250, 0.8)" }}
            />
          </div>
          
          {/* Speech Bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="absolute left-[120%] top-[-10px] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-2xl rounded-bl-none shadow-sm border border-[var(--color-ink)]/10 text-[10px] font-mono whitespace-nowrap z-10 text-[var(--color-ink)]/80"
              >
                {phrase}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
