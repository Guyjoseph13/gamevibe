import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLayout from "./components/admin/AdminLayout";

export default function App() {
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const hashView = window.location.hash.replace(/^#/, "");
    const allowedViews = ["home", "login", "register", "admin"];
    const initialView = allowedViews.includes(hashView) ? hashView : "home";

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (initialView === "home" && parsedUser.role === "admin") {
        setView("admin");
      } else {
        setView(initialView);
      }
    } else {
      setView(initialView);
    }

    const targetHash = hashView.startsWith("admin") ? `#${hashView}` : `#${initialView}`;
    window.history.replaceState({ view: initialView }, "GameVibe", targetHash);
  }, []);

  useEffect(() => {
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
    const hash = newView === "admin" ? "#admin" : `#${newView}`;
    window.history.pushState({ view: newView }, "GameVibe", hash);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Si admin → espace admin, sinon → home
    if (userData.role === "admin") {
      navigateTo("admin");
    } else {
      navigateTo("home");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigateTo("home");
  };

  return (
    <>
      {view === "home" && (
        <Home
          user={user}
          onGoToLogin={() => navigateTo("login")}
          onGoToRegister={() => navigateTo("register")}
          onLogout={handleLogout}
        />
      )}
      {view === "login" && (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0d1a" }}>
          <Login
            onSwitchToRegister={() => navigateTo("register")}
            onGoHome={() => navigateTo("home")}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}
      {view === "register" && (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0d1a" }}>
          <Register
            onSwitchToLogin={() => navigateTo("login")}
            onGoHome={() => navigateTo("home")}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}
      {view === "admin" && (
        <AdminLayout
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}