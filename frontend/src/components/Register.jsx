import { useState } from "react";
import api from "../services/api";

function InputField({ label, type = "text", placeholder, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
        style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.15em" }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg px-4 py-3 text-sm text-gray-200 outline-none transition-all duration-200 placeholder-gray-500 bg-white/5 border focus:ring-2 ${
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/15"
            : "border-white/10 focus:border-violet-500/50 focus:ring-violet-500/15"
        }`}
      />
      {error && <span className="text-xs text-red-400 font-medium">{error}</span>}
    </div>
  );
}

export default function Register({ onSwitchToLogin, onGoHome, onLoginSuccess }) {
  const [form, setForm] = useState({ nom: "", email: "", mot_de_passe: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nom) {
      newErrors.nom = "Le nom est requis.";
    } else if (form.nom.length < 2) {
      newErrors.nom = "Le nom doit avoir au moins 2 caractères.";
    }

    if (!form.email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Format d'email invalide.";
    }

    if (!form.mot_de_passe) {
      newErrors.mot_de_passe = "Le mot de passe est requis.";
    } else if (form.mot_de_passe.length < 6) {
      newErrors.mot_de_passe = "Le mot de passe doit avoir au moins 6 caractères.";
    }

    if (!form.confirm) {
      newErrors.confirm = "La confirmation est requise.";
    } else if (form.mot_de_passe !== form.confirm) {
      newErrors.confirm = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setGlobalError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/register", {
        nom: form.nom,
        email: form.email,
        mot_de_passe: form.mot_de_passe,
        mot_de_passe_confirmation: form.confirm,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onLoginSuccess(res.data.user);
    } catch (err) {
      setGlobalError(
        err.response?.data?.message || "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 flex items-center justify-center min-h-screen bg-[#0d0d1a]">
      <div className="w-full max-w-sm rounded-2xl p-6 md:p-8 flex flex-col gap-5 my-8 bg-white/[0.04] border border-white/[0.07] backdrop-blur-md">

        {/* Logo */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={onGoHome}
            className="text-3xl md:text-4xl font-black tracking-widest text-center bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            GAMEVIBE
          </button>
          <p className="text-sm text-gray-400 mt-1">Créer votre compte</p>
        </div>

        {/* Erreur globale */}
        {globalError && (
          <div className="flex items-start gap-3 bg-red-500/15 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-lg">
            <span className="text-lg mt-0.5">⚠️</span>
            <span>{globalError}</span>
          </div>
        )}

        {/* Champs */}
        <div className="flex flex-col gap-4">
          <InputField
            label="Nom"
            placeholder="Votre nom"
            value={form.nom}
            onChange={handle("nom")}
            error={errors.nom}
          />
          <InputField
            label="Email"
            type="email"
            placeholder="votre@email.com"
            value={form.email}
            onChange={handle("email")}
            error={errors.email}
          />
          <InputField
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={form.mot_de_passe}
            onChange={handle("mot_de_passe")}
            error={errors.mot_de_passe}
          />
          <InputField
            label="Confirmer mot de passe"
            type="password"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handle("confirm")}
            error={errors.confirm}
          />
        </div>

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 md:py-4 rounded-xl font-bold tracking-widest text-sm text-white uppercase bg-gradient-to-r from-violet-600 to-pink-500 cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 transition-all disabled:opacity-50"
          style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.12em" }}
        >
          {loading ? "Chargement..." : "Créer mon compte"}
        </button>

        {/* Lien */}
        <p className="text-center text-sm text-gray-400">
          Déjà un compte ?{" "}
          <button onClick={onSwitchToLogin} className="font-semibold text-violet-400 cursor-pointer hover:underline hover:text-violet-300 transition-colors">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}