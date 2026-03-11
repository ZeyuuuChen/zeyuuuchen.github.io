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
import { useLanguage } from "../contexts/LanguageContext";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export function Education() {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const educationData = [
    {
      id: 3,
      period: "Sep 2022 – Jun 2025",
      school: t("Tsinghua University", "清华大学"),
      location: t("Beijing", "北京"),
      degree: t("M.E., Electronic and Information Engineering", "工学硕士，电子信息工程"),
      details: t("Master's program in IID & Intelligent Computing Laboratory (Prof. Xiu Li)", "IID & 智能计算实验室硕士项目 (李秀教授)"),
      coordinates: [116.3262, 40.0000] as [number, number],
    },
    {
      id: 2,
      period: "Summer Semester 24",
      school: t("Technical University of Munich", "慕尼黑工业大学"),
      location: t("Munich", "慕尼黑"),
      degree: t("Exchange Student, Informatics", "交换生，信息学"),
      details: t("Chair for Computer Aided Medical Procedures & Augmented Reality - CAMP (Prof. Nassir Navab)", "计算机辅助医疗程序与增强现实教席 - CAMP (Nassir Navab教授)"),
      coordinates: [11.5820, 48.1351] as [number, number],
    },
    {
      id: 4,
      period: "Sep 2018 – Jun 2022",
      school: t("Zhejiang University", "浙江大学"),
      location: t("Hangzhou", "杭州"),
      degree: t("B.Eng., Ocean Engineering and Technology", "工学学士，海洋工程与技术"),
      details: t("Institute of Marine Engineering and Technology (Prof. Haocai Huang)", "海洋工程与技术研究所 (黄豪彩教授)"),
      coordinates: [120.1551, 30.2741] as [number, number],
    }
  ];

  const chronologicalData = [
    educationData.find(e => e.id === 4)!,
    educationData.find(e => e.id === 3)!,
    educationData.find(e => e.id === 2)!,
  ];

  return (
    <PageTransition>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col min-h-full p-8 md:p-16 lg:p-24 max-w-7xl mx-auto relative">
        <header className="mb-12 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-5xl text-[var(--color-ink)] uppercase tracking-tight mb-6">
            {t("Education", "教育背景")}
          </h1>
          <p className="font-body text-sm md:text-base max-w-2xl opacity-80 leading-relaxed mx-auto md:mx-0">
            {t("Academic journey and institutional background.", "学术历程与教育背景。")}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl mx-auto items-start">
          {/* World Map Section */}
          <div className="w-full lg:w-1/2 bg-[var(--color-ink)]/5 rounded-3xl overflow-hidden relative aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-center justify-center">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 140,
                center: [60, 35]
              }}
              width={500}
              height={400}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#cbd5e1"
                      stroke="none"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
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
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    className="animate-[dash_10s_linear_infinite]"
                    style={{ opacity: 0.4 }}
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
                    style={{
                      default: { outline: "none", cursor: "pointer" },
                      hover: { outline: "none", cursor: "pointer" },
                      pressed: { outline: "none", cursor: "pointer" },
                    }}
                  >
                    <circle 
                      r={isHovered ? 5 : 3.5} 
                      fill={isHovered ? "#1e3a8a" : "#3b82f6"} 
                      stroke="#fff" 
                      strokeWidth={1.5} 
                      className="transition-all duration-300"
                    />
                    <text
                      textAnchor="middle"
                      y={-14}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fill: isHovered ? "#1e3a8a" : "#475569",
                        fontWeight: isHovered ? "600" : "500",
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                        textShadow: "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                        transition: "all 0.3s ease",
                        pointerEvents: "none"
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
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:pb-12">
            {educationData.map((edu, idx) => (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-6 border transition-all duration-300 cursor-pointer w-full group ${
                  hoveredId === edu.id 
                    ? "bg-[var(--color-ink)]/10 border-[var(--color-ink)]/20 shadow-lg -translate-y-1" 
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
      </div>
    </PageTransition>
  );
}
