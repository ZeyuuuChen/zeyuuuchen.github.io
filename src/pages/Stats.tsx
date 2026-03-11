import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface VisitLog {
  id: number;
  ip: string;
  country: string;
  country_code: string;
  lat: number | null;
  lon: number | null;
  user_agent: string;
  timestamp: string;
}

export function Stats() {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<VisitLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    fetch("/api/admin/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setLogs(data);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(t("Incorrect password", "密码错误"));
        setLoading(false);
      });
  };

  // Aggregated data for charts
  const chartData = useMemo(() => {
    if (!logs.length) return { daily: [], countries: [], mapData: {} };

    // Daily visits
    const dailyMap: Record<string, number> = {};
    const countryMap: Record<string, number> = {};
    const mapData: Record<string, number> = {};

    logs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      dailyMap[date] = (dailyMap[date] || 0) + 1;
      countryMap[log.country] = (countryMap[log.country] || 0) + 1;
      if (log.country_code) {
        mapData[log.country_code] = (mapData[log.country_code] || 0) + 1;
      }
    });

    const daily = Object.entries(dailyMap)
      .map(([date, count]) => ({ date, count }))
      .reverse()
      .slice(-14); // Last 14 days

    const countries = Object.entries(countryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 countries

    return { daily, countries, mapData };
  }, [logs]);

  const COLORS = ["#1E3A5F", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

  if (!isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-[var(--color-bg)]">
        <div className="max-w-sm w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-serif mb-2">{t("Admin Access", "管理员访问")}</h2>
            <p className="text-sm text-[var(--color-ink)]/40 font-mono">
              {t("Please enter password to view statistics", "请输入密码以查看统计信息")}
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Password", "密码")}
              className="w-full px-4 py-2 bg-[var(--color-ink)]/5 border border-[var(--color-ink)]/10 rounded-lg focus:outline-none focus:border-[var(--color-ink)]/30 font-mono text-[var(--color-ink)]"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[var(--color-ink)] text-[var(--color-bg)] rounded-lg font-mono text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {loading ? t("Verifying...", "验证中...") : t("Login", "登录")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto p-8 md:p-12 lg:p-16 bg-[var(--color-bg)] text-[var(--color-ink)]"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              {t("Visitor Statistics", "访客统计")}
            </h1>
            <p className="text-[var(--color-ink)]/60 font-mono">
              {t("Real-time insights and data visualization", "实时洞察与数据可视化")}
            </p>
          </div>
          <div className="text-right font-mono text-xs opacity-40">
            {logs.length} {t("records", "条记录")}
          </div>
        </header>

        {/* Map Section */}
        <div className="mb-16 bg-[var(--color-paper)] p-6 rounded-2xl border border-[var(--color-ink)]/5 shadow-sm">
          <h3 className="text-sm font-mono uppercase tracking-widest mb-6 opacity-60">
            {t("Global Visitor Map", "全球访客分布图")}
          </h3>
          <div className="h-[400px] w-full bg-blue-50/10 rounded-xl overflow-hidden">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 80 }}>
              <Sphere id="sphere" stroke="#E4E5E6" strokeWidth={0.5} fill="transparent" />
              <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#F5F7FA"
                      stroke="#D6D6DA"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#E4E5E6", outline: "none" },
                        pressed: { fill: "#E4E5E6", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {logs.filter(log => log.lat !== null && log.lon !== null).map((log, index) => (
                <Marker key={`${log.id}-${index}`} coordinates={[log.lon!, log.lat!]}>
                  <circle r={3} fill="#3B82F6" stroke="#fff" strokeWidth={1} />
                  <title>{`${log.country} (${log.ip})`}</title>
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-[var(--color-paper)] p-6 rounded-2xl border border-[var(--color-ink)]/5 shadow-sm">
            <h3 className="text-sm font-mono uppercase tracking-widest mb-6 opacity-60">
              {t("Daily Visits", "每日访问量")}
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.daily}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-ink)" opacity={0.1} />
                  <XAxis dataKey="date" fontSize={10} tick={{ fill: 'var(--color-ink)', opacity: 0.5 }} />
                  <YAxis fontSize={10} tick={{ fill: 'var(--color-ink)', opacity: 0.5 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-ink)', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--color-ink)' }}
                  />
                  <Bar dataKey="count" fill="var(--color-ink)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[var(--color-paper)] p-6 rounded-2xl border border-[var(--color-ink)]/5 shadow-sm">
            <h3 className="text-sm font-mono uppercase tracking-widest mb-6 opacity-60">
              {t("Country Distribution", "国家分布")}
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.countries}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.countries.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-paper)', border: '1px solid var(--color-ink)', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-widest mb-4 opacity-60">
            {t("Recent Logs", "最近日志")}
          </h3>
          <div className="grid grid-cols-5 font-bold border-b border-[var(--color-ink)]/20 pb-2 text-[10px] uppercase tracking-wider font-mono">
            <div>{t("IP", "IP")}</div>
            <div>{t("Country", "国家")}</div>
            <div className="col-span-1">{t("Time", "时间")}</div>
            <div className="col-span-2">{t("User Agent", "浏览器信息")}</div>
          </div>
          {logs.map((log) => (
            <div
              key={log.id}
              className="grid grid-cols-5 py-3 border-b border-[var(--color-ink)]/5 text-[10px] font-mono hover:bg-[var(--color-ink)]/5 transition-colors"
            >
              <div className="font-bold truncate" title={log.ip}>{log.ip}</div>
              <div className="text-blue-600 dark:text-blue-400">{log.country}</div>
              <div className="opacity-60">{new Date(log.timestamp).toLocaleString()}</div>
              <div className="col-span-2 truncate opacity-40" title={log.user_agent}>
                {log.user_agent}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
