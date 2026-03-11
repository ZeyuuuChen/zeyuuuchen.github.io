import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export function VisitorCounter() {
  const { t } = useLanguage();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Log visit and get count
    fetch("/api/visit", { method: "POST" })
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error("Server returned non-JSON response");
        }
      })
      .then((data) => {
        if (data.success) {
          setCount(data.count);
        }
      })
      .catch((err) => console.error("Visit tracking failed:", err));
  }, []);

  if (count === null) return null;

  return (
    <Link 
      to="/admin-stats"
      className="hidden md:block mt-4 pt-4 border-t border-[var(--color-ink)]/10 font-mono text-[9px] opacity-60 hover:opacity-100 transition-opacity uppercase tracking-widest"
    >
      {count.toString().padStart(6, "0")}
    </Link>
  );
}
