import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Aucun token d'accès trouvé. Veuillez vous reconnecter en tant qu'administrateur.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/users");
      setUsers(res.data.data || res.data || []);
    } catch (err) {
      console.error(err.response ?? err);
      const serverMessage = err.response?.data?.message;
      const status = err.response?.status;

      if (status === 403) {
        setError("Accès refusé : ce compte n'est pas reconnu comme administrateur.");
      } else if (status === 401) {
        setError("Non authentifié : veuillez vous reconnecter.");
      } else if (serverMessage) {
        setError(serverMessage);
      } else {
        setError("Impossible de charger les utilisateurs. Vérifiez votre connexion et vos droits admin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDesactiver = async (id) => {
    if (!confirm("Désactiver ce compte ?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-white line-clamp-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Gestion des utilisateurs
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-1">Voir et gérer les comptes utilisateurs</p>
      </div>

      <div className="bg-[#1A1A2E] rounded-xl border border-white/5 overflow-x-auto">
        {loading ? (
          <div className="p-4 sm:p-6 text-gray-500 text-sm">Chargement...</div>
        ) : error ? (
          <div className="p-4 sm:p-6 text-red-400 text-sm">{error}</div>
        ) : (
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap">NOM</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap hidden md:table-cell">EMAIL</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap">RÔLE</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap hidden lg:table-cell">INSCRIT LE</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 sm:px-4 py-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                          {u.nom?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-white truncate">{u.nom}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-400 hidden md:table-cell truncate">{u.email}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold whitespace-nowrap ${
                        u.role === "admin"
                          ? "bg-pink-500/15 text-pink-400"
                          : "bg-violet-500/15 text-violet-400"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-400 hidden lg:table-cell whitespace-nowrap">{u.cree_le}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      {u.role !== "admin" && (
                        <button
                          onClick={() => handleDesactiver(u.id)}
                          className="text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer transition-colors min-h-[32px] flex items-center justify-center gap-1"
                          title="Désactiver"
                        >
                          <i className="bi bi-x-circle"></i>
                          <span className="hidden sm:inline">Désactiver</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}