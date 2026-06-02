import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [view, setView] = useState("home"); // "home" | "login" | "register"

  // Gestion de l'historique du navigateur
  useEffect(() => {
    // Ajouter l'état initial à l'historique
    window.history.replaceState({ view: "home" }, "GameVibe", window.location.href);
  }, []);

  useEffect(() => {
    // Écouter les changements de l'historique (bouton back/forward)
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (newView) => {
    setView(newView);
    window.history.pushState({ view: newView }, "GameVibe", window.location.href);
  };

  return (
    <>
      {view === "home" && (
        <Home
          onGoToLogin={() => navigateTo("login")}
          onGoToRegister={() => navigateTo("register")}
        />
      )}
      {view === "login" && (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#0d0d1a" }}
        >
          <Login
            onSwitchToRegister={() => navigateTo("register")}
            onGoHome={() => navigateTo("home")}
          />
        </div>
      )}
      {view === "register" && (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#0d0d1a" }}
        >
          <Register
            onSwitchToLogin={() => navigateTo("login")}
            onGoHome={() => navigateTo("home")}
          />
        </div>
      )}
    </>
  );
}