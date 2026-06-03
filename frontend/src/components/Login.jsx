import { useState } from "react";
import api from "../services/api";

function InputField({ label, type = "text", placeholder, value, onChange, error, showToggle, showValue, onToggle }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
        style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.15em" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg px-4 py-3 text-sm text-gray-200 outline-none transition-all duration-200 placeholder-gray-500 bg-white/5 border focus:ring-2 ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/15"
              : "border-white/10 focus:border-violet-500/50 focus:ring-violet-500/15"
          } ${showToggle ? "pr-12" : ""}`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 right-3 flex items-center justify-center rounded-full  px-2 text-gray-900  "
            aria-label={showValue ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            <i className={showValue ? "bi bi-eye-slash" : "bi bi-eye"} aria-hidden="true" />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-400 font-medium">{error}</span>}
    </div>
  );
}

export default function Login({ onSwitchToRegister, onGoHome, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", mot_de_passe: "" });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

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
      const res = await api.post("/login", {
        email: form.email,
        mot_de_passe: form.mot_de_passe,
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
      <div className="w-full max-w-sm rounded-2xl p-6 md:p-8 flex flex-col gap-5 bg-white/[0.04] border border-white/[0.07] backdrop-blur-md">

        {/* Logo */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={onGoHome}
            className="text-3xl md:text-4xl font-black tracking-widest text-center bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            GAMEVIBE
          </button>
          <p className="text-sm text-gray-400 mt-1">Connectez-vous à votre compte</p>
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
            label="Email"
            type="email"
            placeholder="votre@email.com"
            value={form.email}
            onChange={handle("email")}
            error={errors.email}
          />
          <InputField
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.mot_de_passe}
            onChange={handle("mot_de_passe")}
            error={errors.mot_de_passe}
            showToggle
            showValue={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        </div>

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 md:py-4 rounded-xl font-bold tracking-widest text-sm text-white uppercase bg-gradient-to-r from-violet-600 to-pink-500 cursor-pointer hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 transition-all disabled:opacity-50"
          style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.12em" }}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>

        {/* Lien */}
        <p className="text-center text-sm text-gray-400">
          Pas encore de compte ?{" "}
          <button onClick={onSwitchToRegister} className="font-semibold text-violet-400 cursor-pointer hover:underline hover:text-violet-300 transition-colors">
            S&apos;inscrire
          </button>
        </p>
      </div>
    </div>
  );
}