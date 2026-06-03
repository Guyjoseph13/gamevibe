import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../services/api";

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#1A1A2E] rounded-xl border border-violet-500/20 w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 sticky top-0 bg-[#1A1A2E] z-10">
          <h2 className="font-bold text-white text-sm sm:text-base line-clamp-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-lg sm:text-xl cursor-pointer flex-shrink-0 ml-2 min-h-[36px] min-w-[36px] flex items-center justify-center"><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#0F0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 transition-colors w-full"
      />
    </div>
  );
}

const EMPTY_FORM = {
  titre: "", description: "", image: "", date_sortie: "",
  developpeur_id: "", plateformes: [], categories: [],
};

export default function AdminJeux() {
  const [jeux, setJeux] = useState([]);
  const [plateformes, setPlateformes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [developpeurs, setDeveloppeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // "add" | "edit"
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [jeuxRes, platRes, catRes, devRes] = await Promise.all([
        api.get("/jeux"),
        api.get("/plateformes"),
        api.get("/categories"),
        api.get("/developpeurs"),
      ]);
      setJeux(jeuxRes.data.data ?? []);
      setPlateformes(platRes.data.data ?? []);
      setCategories(catRes.data.data ?? []);
      setDeveloppeurs(devRes.data.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handle = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const toggleArray = (field, id) => {
    const arr = form[field];
    setForm({
      ...form,
      [field]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
    });
  };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setModal("add");
  };

  const openEdit = (jeu) => {
    setForm({
      titre: jeu.titre,
      description: jeu.description,
      image: jeu.image ?? "",
      date_sortie: jeu.date_sortie,
      developpeur_id: jeu.developpeur?.id ?? "",
      plateformes: jeu.plateformes?.map((p) => p.id) ?? [],
      categories: jeu.categories?.map((c) => c.id) ?? [],
    });
    setEditId(jeu.id);
    setModal("edit");
  };

  const handleSubmit = async () => {
    try {
      if (modal === "add") {
        await api.post("/jeux", form);
      } else {
        await api.put(`/jeux/${editId}`, form);
      }
      setModal(null);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce jeu ?")) return;
    try {
      await api.delete(`/jeux/${id}`);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = jeux.filter((j) =>
    j.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-black text-white line-clamp-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Gestion des jeux
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-1">Ajouter, modifier ou supprimer des jeux</p>
        </div>
        <button
          onClick={openAdd}
          className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-90 cursor-pointer flex items-center gap-2 min-h-[40px] whitespace-nowrap"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <i className="bi bi-plus-lg"></i>
          <span className="hidden sm:inline">Ajouter un jeu</span>
          <span className="sm:hidden">Jeu</span>
        </button>
      </div>

      {/* Recherche */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1A1A2E] border border-white/10 rounded-lg px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white outline-none focus:border-violet-500/50 pr-10"
        />
        <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
      </div>

      {/* Table Container */}
      <div className="bg-[#1A1A2E] rounded-xl border border-white/5 overflow-x-auto">
        {loading ? (
          <div className="p-4 sm:p-6 text-gray-500 text-sm">Chargement...</div>
        ) : (
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap">TITRE</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap hidden md:table-cell">PLATEFORMES</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap hidden lg:table-cell">CATÉGORIES</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap">NOTE</th>
                <th className="text-left px-3 sm:px-4 py-2 sm:py-3 text-xs text-gray-500 tracking-widest uppercase whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 sm:px-4 py-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm">
                    Aucun jeu trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((jeu) => (
                  <tr key={jeu.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white whitespace-nowrap line-clamp-1">{jeu.titre}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {jeu.plateformes?.map((p) => (
                          <span key={p.id} className="text-xs px-2 py-0.5 rounded bg-violet-500/15 text-violet-400 whitespace-nowrap">{p.nom}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {jeu.categories?.map((c) => (
                          <span key={c.id} className="text-xs px-2 py-0.5 rounded bg-pink-500/15 text-pink-400 whitespace-nowrap">{c.nom}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-yellow-400 whitespace-nowrap flex-shrink-0"><i className="bi bi-star-fill"></i> {jeu.note_moyenne}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={() => openEdit(jeu)}
                          className="text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 cursor-pointer transition-colors min-h-[32px] flex items-center justify-center"
                          title="Modifier"
                        >
                          <i className="bi bi-pencil"></i>
                          <span className="hidden sm:inline ml-1">Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDelete(jeu.id)}
                          className="text-xs px-2 sm:px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 cursor-pointer transition-colors min-h-[32px] flex items-center justify-center"
                          title="Supprimer"
                        >
                          <i className="bi bi-trash"></i>
                          <span className="hidden sm:inline ml-1">Supprimer</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Ajouter / Modifier */}
      {modal && (
        <Modal title={modal === "add" ? "Ajouter un jeu" : "Modifier le jeu"} onClose={() => setModal(null)}>
          <div className="flex flex-col gap-4">
            <InputField label="Titre" value={form.titre} onChange={handle("titre")} placeholder="Ex: Elden Ring" />
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Description</label>
              <textarea
                value={form.description}
                onChange={handle("description")}
                placeholder="Description du jeu..."
                rows={3}
                className="bg-[#0F0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 resize-none"
              />
            </div>
            <InputField label="Image (URL)" value={form.image} onChange={handle("image")} placeholder="https://..." />
            <InputField label="Date de sortie" type="date" value={form.date_sortie} onChange={handle("date_sortie")} />

            {/* Développeur */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Développeur</label>
              <select
                value={form.developpeur_id}
                onChange={handle("developpeur_id")}
                className="bg-[#0F0F1A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/50"
              >
                <option value="">Sélectionner un développeur</option>
                {developpeurs.map((d) => (
                  <option key={d.id} value={d.id}>{d.nom}</option>
                ))}
              </select>
            </div>

            {/* Plateformes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Plateformes</label>
              <div className="flex flex-wrap gap-2">
                {plateformes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggleArray("plateformes", p.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                      form.plateformes.includes(p.id)
                        ? "bg-violet-500/20 border-violet-500 text-violet-300"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    {p.nom}
                  </button>
                ))}
              </div>
            </div>

            {/* Catégories */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-widest">Catégories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleArray("categories", c.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                      form.categories.includes(c.id)
                        ? "bg-pink-500/20 border-pink-500 text-pink-300"
                        : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                  >
                    {c.nom}
                  </button>
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:opacity-90 cursor-pointer"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {modal === "add" ? "Ajouter" : "Modifier"}
              </button>
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2.5 rounded-lg text-sm font-bold text-gray-400 border border-white/10 hover:bg-white/5 cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}