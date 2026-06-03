import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../services/api";

function StatCard({ icon, num, label, color }) {
  return (
    <div className="bg-[#1A1A2E] rounded-xl p-5 border border-white/5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${color}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <div
          className="text-2xl font-black bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {num}
        </div>
        <div className="text-xs text-gray-500 tracking-widest uppercase mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    totalJeux: 0,
    totalUsers: 0,
    totalAvis: 0,
    totalPlateformes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jeux, users, plateformes, categories] = await Promise.all([
          api.get("/jeux"),
          api.get("/users"),
          api.get("/plateformes"),
          api.get("/categories"),
        ]);

        console.log("jeux", jeux.data);
        console.log("users", users.data);
        console.log("plateformes", plateformes.data);
        console.log("categories", categories.data);

        setStats({
          totalJeux: jeux.data.data?.length ?? 0,
          totalUsers: users.data.data?.length ?? 0,
          totalPlateformes: plateformes.data.data?.length ?? 0,
          totalCategories: categories.data.data?.length ?? 0,
        });
      } catch (err) {
        console.error("Erreur stats dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-black text-white"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">Vue globale de la plateforme GameVibe</p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="text-gray-500 text-sm">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <StatCard icon="bi-joystick" num={stats.totalJeux} label="Jeux" color="bg-violet-500/15" />
          <StatCard icon="bi-people-fill" num={stats.totalUsers} label="Utilisateurs" color="bg-pink-500/15" />
          <StatCard icon="bi-chat-left-fill" num={stats.totalAvis} label="Avis" color="bg-yellow-500/15" />
          <StatCard icon="bi-pc-display" num={stats.totalPlateformes} label="Plateformes" color="bg-green-500/15" />
        </div>
      )}

      {/* Accès rapides */}
      <div className="bg-[#1A1A2E] rounded-xl border border-white/5 p-5">
        <h2
          className="text-sm font-bold text-white mb-4 tracking-widest uppercase"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Accès rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {[
            { icon: "bi-joystick", label: "Jeu", page: "jeux" },
            { icon: "bi-pc-display", label: "Plateforme", page: "plateformes" },
            { icon: "bi-tag-fill", label: "Catégorie", page: "categories" },
            { icon: "bi-person-fill", label: "Développeur", page: "developpeurs" },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all cursor-pointer min-h-[80px] sm:min-h-auto"
            >
              <i className={`bi ${item.icon} text-xl sm:text-2xl`}></i>
              <span className="text-xs text-gray-400 text-center font-medium line-clamp-2">+ {item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}