import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";
import { ArrowUpRight } from "lucide-react";

const researchImages = import.meta.glob('/public/figs/research/*.{png,jpg,jpeg,webp,gif}', { eager: true });
const getResearchImage = (name: string, fallback: string) => {
  const key = Object.keys(researchImages).find(k => k.toLowerCase().includes(name.toLowerCase()));
  return key ? key.replace('/public', '') : fallback;
};

const projects = [
  {
    id: "01",
    name: "UW-SDF",
    desc: "Exploiting Hybrid Geometric Priors for Neural SDF Reconstruction from Underwater Multi-view Monocular Images.",
    tags: ["3D Recon", "Neural SDF"],
    img: getResearchImage("UW-SDF", "https://figures.semanticscholar.org/6fa3cc535ba4e78c6217ce7044ff4f37b0f1285e/1-Figure1-1.png"),
    colSpan: "md:col-span-2",
    links: [
      { name: "Website", url: "https://ieeexplore.ieee.org/document/10802499" },
      { name: "Github", url: "https://github.com/THUSIGSICLAB/ROV6D" },
      { name: "PDF", url: "#" }
    ]
  },
  {
    id: "02",
    name: "ROV6D",
    desc: "Benchmark dataset for 6D pose estimation of ROVs in underwater environments.",
    tags: ["6D Pose", "Dataset"],
    img: getResearchImage("ROV6D", "https://figures.semanticscholar.org/6c8775bc0f71de2ea279285e4523785bf2482757/2-Figure1-1.png"),
    colSpan: "md:col-span-1",
    links: [
      { name: "Website", url: "https://ieeexplore.ieee.org/document/10313927" },
      { name: "Video", url: "#" },
      { name: "PDF", url: "#" }
    ]
  },
  {
    id: "03",
    name: "MonoGSDF",
    desc: "Monocular Geometric Cues for Gaussian Splatting-Guided Implicit Surface Reconstruction.",
    tags: ["Gaussian Splatting"],
    img: getResearchImage("MonoGSDF", "https://figures.semanticscholar.org/ffdb0c253ff8f3e590aa96a8edc2d37b8d4257fb/1-Figure1-1.png"),
    colSpan: "md:col-span-1",
    links: [
      { name: "Website", url: "https://bmvc2025.bmva.org/proceedings/690/" },
      { name: "Video", url: "https://bmva-archive.org.uk/bmvc/2025/assets/papers/Paper_690/video.mp4" },
      { name: "PDF", url: "https://bmva-archive.org.uk/bmvc/2025/assets/papers/Paper_690/paper.pdf" }
    ]
  },
  {
    id: "04",
    name: "AquaSim",
    desc: "Unity3D-Based Framework for Multimodal Underwater Simulation.",
    tags: ["Unity3D", "Simulation"],
    img: getResearchImage("AquaSim", "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600&auto=format&fit=crop"),
    colSpan: "md:col-span-2",
    links: [
      { name: "Website", url: "https://sites.google.com/view/aq2uasim/call-for-papers?authuser=0" },
      // { name: "Video", url: "#" },
      { name: "PDF", url: "#" }
    ]
  },
];

const publications = [
  { year: "2025", title: "Reinforcement Learning Meets Masked Generative Models: Mask-GRPO for Text-to-Image Generation", journal: "NeurIPS", status: "Published", links: [{ name: "Website", url: "#" }, { name: "Video", url: "#" }, { name: "PDF", url: "#" }] },
  { year: "2025", title: "MonoGSDF: Exploring Monocular Geometric Cues for Gaussian Splatting-Guided Implicit Surface Reconstruction", journal: "BMVC", status: "Published", links: [{ name: "Website", url: "#" }, { name: "Video", url: "#" }, { name: "PDF", url: "#" }] },
  { year: "2025", title: "AquaSim: A Unity3D-Based Framework for Multimodal Underwater Simulation in 3D Vision Research", journal: "ICRA", status: "Published", links: [{ name: "Website", url: "#" }, { name: "Video", url: "#" }, { name: "PDF", url: "#" }] },
  { year: "2024", title: "UW-SDF: Exploiting Hybrid Geometric Priors for Neural SDF Reconstruction from Underwater Multi-view Monocular Images", journal: "IROS", status: "Published", links: [{ name: "Website", url: "#" }, { name: "Video", url: "#" }, { name: "PDF", url: "#" }] },
  { year: "2024", title: "FAFA: Frequency-Aware Flow-Aided Self-Supervision for Underwater Object Pose Estimation", journal: "ECCV", status: "Published", links: [{ name: "Website", url: "#" }, { name: "Video", url: "#" }, { name: "PDF", url: "#" }] },
  { year: "2023", title: "ROV6D: 6D Pose Estimation Benchmark Dataset for Underwater Remotely Operated Vehicles", journal: "IEEE RA-L", status: "Published", links: [{ name: "Website", url: "#" }, { name: "Video", url: "#" }, { name: "PDF", url: "#" }] },
  ];

export function Research() {
  return (
    <PageTransition>
      <div className="flex flex-col h-full overflow-y-auto p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
        
        <header className="mb-20 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">Research</h1>
          <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
            Investigating the fundamental principles of nature through rigorous methodology and computational analysis.
          </p>
        </header>

        {/* Bento Box Projects */}
        <section className="mb-24">
          <h2 className="font-serif text-xl md:text-2xl text-[var(--color-ink)] uppercase tracking-widest mb-12 flex items-center justify-center md:justify-start gap-6">
            <span className="w-12 h-[1px] bg-[var(--color-ink)]/30"></span>
            Research Projects
            <span className="w-12 h-[1px] bg-[var(--color-ink)]/30 md:hidden"></span>
          </h2>
          
          <div className="flex flex-wrap gap-8">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className={`flex flex-col overflow-hidden rounded-3xl bg-[var(--color-ink)]/5 p-6 group flex-grow basis-[300px] ${proj.colSpan === 'md:col-span-2' ? 'md:basis-[600px]' : ''}`}
              >
                <div className="w-full mb-6 rounded-2xl overflow-hidden flex justify-center items-center bg-white/50">
                  <img src={proj.img} alt={proj.name} className="max-w-full h-auto max-h-[300px] object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-lg md:text-xl text-[var(--color-ink)] uppercase tracking-wide">{proj.name}</h3>
                    <span className="font-mono text-xs opacity-60">{proj.id}</span>
                  </div>
                  <p className="font-body text-sm opacity-80 mb-8 flex-1 leading-relaxed">{proj.desc}</p>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {proj.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] uppercase tracking-widest border border-[var(--color-ink)]/20 rounded-full px-3 py-1 opacity-70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {proj.links && (
                    <div className="flex gap-4 mt-6">
                      {proj.links.map(link => (
                        <a 
                          key={link.name} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-mono text-xs font-medium transition-all duration-300 hover:scale-110 hover:text-blue-800 flex items-center gap-1 opacity-80 hover:opacity-100"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <h2 className="font-serif text-xl md:text-2xl text-[var(--color-ink)] uppercase tracking-widest mb-12 flex items-center justify-center md:justify-start gap-6">
            <span className="w-12 h-[1px] bg-[var(--color-ink)]/30"></span>
            Publications
            <span className="w-12 h-[1px] bg-[var(--color-ink)]/30 md:hidden"></span>
          </h2>
          
          <div className="flex flex-col">
            {publications.map((pub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                className="py-8 border-b border-dashed border-[var(--color-ink)]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-[var(--color-ink)]/5 px-6 -mx-6 rounded-2xl transition-colors duration-500"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-[10px] opacity-60">{pub.year}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest border border-[var(--color-ink)]/30 rounded-full px-3 py-0.5 opacity-70">{pub.status}</span>
                  </div>
                  <h3 className="font-serif text-base md:text-lg text-[var(--color-ink)] leading-snug transition-all duration-300 mb-2">{pub.title}</h3>
                  {pub.links && (
                    <div className="flex gap-4 mt-2">
                      {pub.links.map(link => (
                        <a 
                          key={link.name} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-mono text-xs font-medium transition-all duration-300 hover:scale-110 hover:text-blue-800 flex items-center gap-1 opacity-70 hover:opacity-100"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-serif text-sm md:text-base opacity-80 flex items-center gap-3 md:text-right">
                  {pub.journal}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
