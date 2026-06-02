export default function Home({ onGoToLogin, onGoToRegister }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0d0d1a" }}
    >
      {/* ── Fond dégradé radial comme la maquette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(139,92,246,0.18) 0%, rgba(236,72,153,0.10) 40%, transparent 70%)",
        }}
      />

      {/* ── NAVBAR ── */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5">
        {/* Logo */}
        <span
          className="text-xl font-black tracking-widest"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: "linear-gradient(90deg, #7c3aed, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          GAMEVIBE
        </span>

        {/* Liens nav */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-sm font-medium text-white border-b border-white pb-0.5"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}
          >
            Catalogue
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}
          >
            Plateformes
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}
          >
            Catégories
          </a>
        </div>

        {/* Boutons auth */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoToLogin}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-purple-400 transition-all hover:bg-purple-400/10"
            style={{
              border: "1px solid #7c3aed",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Connexion
          </button>
          <button
            onClick={onGoToRegister}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #ec4899)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            S&apos;inscrire
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 gap-8 -mt-10">

        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-gray-300 uppercase"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)",
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "0.15em",
          }}
        >
          <span>🎮</span>
          <span>Plateforme de notation</span>
        </div>

        {/* Titre principal */}
        <h1
          className="text-6xl font-black leading-tight max-w-3xl"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="text-white">Découvrez les<br />jeux</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            appréciés par la<br />communauté
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-gray-400 text-base max-w-lg">
          Notez, commentez et explorez les meilleurs jeux vidéo selon les avis de vrais joueurs.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="px-8 py-4 rounded-xl text-sm font-bold tracking-widest text-white uppercase transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #ec4899)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            Explorer le catalogue
          </button>
          <button
            className="px-8 py-4 rounded-xl text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-white/10 active:scale-95"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.12em",
            }}
            onClick={onGoToRegister}
          >
            Rejoindre la communauté
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-16 mt-4">
          {[
            { value: "1 240", label: "Jeux" },
            { value: "8 500", label: "Avis" },
            { value: "3 200", label: "Joueurs" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl font-black"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </span>
              <span className="text-xs text-gray-400 tracking-widest uppercase"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}