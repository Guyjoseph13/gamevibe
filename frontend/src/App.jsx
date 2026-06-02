import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [view, setView] = useState("home"); // "home" | "login" | "register"

  return (
    <>
      {view === "home" && (
        <Home
          onGoToLogin={() => setView("login")}
          onGoToRegister={() => setView("register")}
        />
      )}
      {view === "login" && (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#0d0d1a" }}
        >
          <Login
            onSwitchToRegister={() => setView("register")}
            onGoHome={() => setView("home")}
          />
        </div>
      )}
      {view === "register" && (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#0d0d1a" }}
        >
          <Register
            onSwitchToLogin={() => setView("login")}
            onGoHome={() => setView("home")}
          />
        </div>
      )}
    </>
  );
}