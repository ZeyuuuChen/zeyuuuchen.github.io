import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line
} from "react-simple-maps";
import { useState } from "react";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const educationData = [
  {
    id: 3,
    period: "Sep 2022 – Jun 2025",
    school: "Tsinghua University",
    location: "Beijing",
    degree: "M.E., Electronic and Information Engineering",
    // details: "Master's program in IID & Intelligent Computing Laboratory (Prof. Xiu Li)",
    coordinates: [116.3262, 40.0000] as [number, number],
  },
  {
    id: 2,
    period: "Summer Semester 24",
    school: "Technical University of Munich",
    location: "Munich",
    degree: "Exchange Student, Informatics",
    // details: "Chair for Computer Aided Medical Procedures & Augmented Reality - CAMP (Prof. Nassir Navab)",
    coordinates: [11.5820, 48.1351] as [number, number],
  },
  {
    id: 4,
    period: "Sep 2018 – Jun 2022",
    school: "Zhejiang University",
    location: "Hangzhou",
    degree: "B.Eng., Ocean Engineering and Technology",
    // details: "Institute of Marine Engineering and Technology (Prof. Haocai Huang)",
    coordinates: [120.1551, 30.2741] as [number, number],
  }
];

// Sort chronologically: ZJU (2018) -> THU (2022) -> TUM (2024)
const chronologicalData = [
  educationData.find(e => e.id === 4)!,
  educationData.find(e => e.id === 3)!,
  educationData.find(e => e.id === 2)!,
];

export function Education() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="flex flex-col h-full overflow-y-auto p-8 md:p-16 lg:p-24 max-w-7xl mx-auto relative">
        <header className="mb-12 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">Education</h1>
          <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
            Academic journey and institutional background.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto flex-1 h-full min-h-[500px]">
          {/* World Map Section */}
          <div className="w-full lg:w-2/3 bg-[var(--color-ink)]/5 rounded-3xl overflow-hidden relative min-h-[400px] lg:min-h-0 flex items-center justify-center">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
                center: [40, 35]
              }}
              width={600}
              height={500}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#cbd5e1"
                      stroke="none" // Hide political borders to remain completely impartial
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#cbd5e1" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Draw lines between locations chronologically */}
              {chronologicalData.map((edu, idx) => {
                if (idx === 0) return null;
                const prevEdu = chronologicalData[idx - 1];
                
                return (
                  <Line
                    key={`line-${idx}`}
                    from={prevEdu.coordinates}
                    to={edu.coordinates}
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    className="animate-[dash_10s_linear_infinite]"
                    style={{ opacity: 0.6 }}
                  />
                );
              })}

              {/* Draw markers for each location */}
              {educationData.map((edu) => {
                const isHovered = hoveredId === edu.id;
                return (
                  <Marker 
                    key={`marker-${edu.id}`} 
                    coordinates={edu.coordinates}
                    onMouseEnter={() => setHoveredId(edu.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle 
                      r={isHovered ? 6 : 4} 
                      fill={isHovered ? "#1e3a8a" : "#3b82f6"} 
                      stroke="#fff" 
                      strokeWidth={1.5} 
                      className="transition-all duration-300"
                    />
                    <text
                      textAnchor="middle"
                      y={-12}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: isHovered ? "12px" : "10px",
                        fill: isHovered ? "#1e3a8a" : "#475569",
                        fontWeight: isHovered ? "bold" : "normal",
                        textShadow: "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {edu.location.split(',')[0]}
                    </text>
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>

          {/* Education List Section */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {educationData.map((edu, idx) => (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                  hoveredId === edu.id 
                    ? "bg-[var(--color-ink)]/10 border-[var(--color-ink)]/20 shadow-md scale-[1.02]" 
                    : "bg-[var(--color-ink)]/5 border-[var(--color-ink)]/10 hover:bg-[var(--color-ink)]/10"
                }`}
                onMouseEnter={() => setHoveredId(edu.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-xs uppercase tracking-widest opacity-60">
                    {edu.period}
                  </div>
                  <div className="font-mono text-[10px] text-blue-800/80 bg-blue-100/50 px-2 py-0.5 rounded-full">
                    {edu.location}
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-[var(--color-ink)] leading-tight mb-1">
                  {edu.school}
                </h3>
                <div className="font-body text-sm opacity-80 mb-2 font-medium">
                  {edu.degree}
                </div>
                <p className="font-body text-xs opacity-70 leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -100;
            }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: var(--color-ink);
            opacity: 0.2;
            border-radius: 10px;
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
