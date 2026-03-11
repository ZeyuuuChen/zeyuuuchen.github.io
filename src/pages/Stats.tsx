import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface VisitLog {
  id: number;
  ip: string;
  country: string;
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

  if (!isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center p-8">
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
              className="w-full px-4 py-2 bg-[var(--color-ink)]/5 border border-[var(--color-ink)]/10 rounded-lg focus:outline-none focus:border-[var(--color-ink)]/30 font-mono"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-mono">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[var(--color-ink)] text-[var(--color-bg)] rounded-lg font-mono text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
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
      className="h-full overflow-y-auto p-8 md:p-12 lg:p-16"
    >
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              {t("Visitor Statistics", "访客统计")}
            </h1>
            <p className="text-[var(--color-ink)]/60 font-mono">
              {t("Detailed logs including geolocation", "包含地理位置的详细日志")}
            </p>
          </div>
          <div className="text-right font-mono text-xs opacity-40">
            {logs.length} {t("records", "条记录")}
          </div>
        </header>

        <div className="space-y-4">
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
              <div className="text-blue-900">{log.country}</div>
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
