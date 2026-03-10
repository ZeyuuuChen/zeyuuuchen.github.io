import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "../components/PageTransition";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line
} from "react-simple-maps";
import geoData from "../../public/countries-110m.json";
import { useState } from "react";

const educationData = [
  {
    id: 2,
    period: "Summer Semester 24",
    school: "Technical University of Munich",
    degree: "Exchange Student, Informatics",
    details: "Chair for Computer Aided Medical Procedures & Augmented Reality - CAMP (Prof. Nassir Navab)",
    coordinates: [11.5820, 48.1351] as [number, number], // Munich
    country: "Germany"
  },
  {
    id: 3,
    period: "Sep 2022 – Jun 2025",
    school: "Tsinghua University",
    degree: "M.E., Electronic and Information Engineering",
    details: "Master's program in IID & Intelligent Computing Laboratory (Prof. Xiu Li)",
    coordinates: [116.3262, 40.0000] as [number, number], // Beijing
    country: "China"
  },
  {
    id: 4,
    period: "Sep 2018 – Jun 2022",
    school: "Zhejiang University",
    degree: "B.Eng., Ocean Engineering and Technology",
    details: "Institute of Marine Engineering and Technology (Prof. Haocai Huang)",
    coordinates: [120.1551, 30.2741] as [number, number], // Hangzhou
    country: "China"
  }
];

// Sort data chronologically for the map lines
const chronologicalData = [...educationData].reverse();

export function Education() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const hoveredEducation = hoveredCountry 
    ? educationData.filter(edu => edu.country === hoveredCountry)
    : [];

  return (
    <PageTransition>
      <div 
        className="flex flex-col h-full overflow-y-auto p-8 md:p-16 lg:p-24 max-w-7xl mx-auto relative"
        onMouseMove={handleMouseMove}
      >
        <header className="mb-12 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">Education</h1>
          <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
            Academic journey and institutional background.
          </p>
        </header>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto flex-1 h-full min-h-[500px]">
          {/* World Map Section */}
          <div className="w-full lg:w-2/3 bg-[var(--color-ink)]/5 rounded-3xl overflow-hidden relative min-h-[400px] lg:min-h-0">
            <div className="absolute inset-0 p-4 md:p-8 flex items-center justify-center">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 110,
                  center: [30, 30]
                }}
                width={600}
                height={1000}
                style={{ width: "auto", height: "auto", objectFit: "contain" }}
              >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHighlighted = geo.properties.NAME === "China" || geo.properties.NAME === "Germany";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      if (isHighlighted) {
                        setHoveredCountry(geo.properties.NAME);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isHighlighted) {
                        setHoveredCountry(null);
                      }
                    }}
                    fill={isHighlighted ? "#bae6fd" : "#cbd5e1"}
                    stroke="#94a3b8"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "all 0.3s" },
                      hover: { 
                        outline: "none", 
                        fill: isHighlighted ? "#7dd3fc" : "#94a3b8",
                        cursor: isHighlighted ? "pointer" : "default",
                        transition: "all 0.3s"
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Draw lines between locations chronologically */}
          {chronologicalData.map((edu, idx) => {
            if (idx === 0) return null;
            const prevEdu = chronologicalData[idx - 1];
            // Don't draw a line if it's the same location
            if (prevEdu.coordinates[0] === edu.coordinates[0] && prevEdu.coordinates[1] === edu.coordinates[1]) return null;
            
            return (
              <Line
                key={`line-${idx}`}
                from={prevEdu.coordinates}
                to={edu.coordinates}
                stroke="#1e3a8a" // text-blue-900
                strokeWidth={2}
                strokeDasharray="4 4"
                strokeLinecap="round"
                className="animate-[dash_10s_linear_infinite]"
                style={{ opacity: 0.6 }}
              />
            );
          })}

          {/* Draw markers for each location */}
          {educationData.map((edu) => (
            <Marker key={`marker-${edu.id}`} coordinates={edu.coordinates}>
              <circle r={4} fill="#1e3a8a" stroke="#fff" strokeWidth={1.5} />
              <text
                textAnchor="middle"
                y={-10}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fill: "#1e3a8a",
                  fontWeight: "bold",
                  textShadow: "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
                }}
              >
                {edu.school.includes("Munich") ? "Munich" : edu.school.includes("Tsinghua") ? "Beijing" : "Hangzhou"}
              </text>
            </Marker>
          ))}
        </ComposableMap>
        </div>
        </div>

        {/* Education List Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {educationData.map((edu, idx) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--color-ink)]/5 rounded-2xl p-6 border border-[var(--color-ink)]/10 hover:bg-[var(--color-ink)]/10 transition-colors"
              onMouseEnter={() => setHoveredCountry(edu.country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">
                {edu.period}
              </div>
              <h3 className="font-serif text-lg font-bold text-[var(--color-ink)] leading-tight mb-1">
                {edu.school}
              </h3>
              <div className="font-body text-sm opacity-80">
                {edu.degree}
              </div>
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

        {/* Tooltip for Education History */}
        <AnimatePresence>
          {hoveredCountry && hoveredEducation.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute pointer-events-none z-50 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[var(--color-ink)]/10 max-w-sm"
              style={{
                left: mousePos.x + 20,
                top: mousePos.y + 20,
                // Prevent tooltip from going off-screen
                transform: `translate(${mousePos.x > window.innerWidth - 400 ? '-100%' : '0'}, ${mousePos.y > window.innerHeight - 300 ? '-100%' : '0'})`
              }}
            >
              <h3 className="font-serif text-xl text-[var(--color-ink)] uppercase mb-4 border-b border-[var(--color-ink)]/10 pb-2">
                {hoveredCountry}
              </h3>
              <div className="flex flex-col gap-4">
                {hoveredEducation.map((edu) => (
                  <div key={edu.id} className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-70 mb-1">
                      {edu.period}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[var(--color-ink)] leading-tight mb-1">
                      {edu.school}
                    </h4>
                    <span className="font-body text-xs opacity-90 mb-1">{edu.degree}</span>
                    <p className="font-body text-[10px] opacity-70 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
