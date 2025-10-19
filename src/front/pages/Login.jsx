import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 200 && data.access_token) {
        sessionStorage.setItem("token", data.access_token);
        navigate("/private");
      } else {
        setError(data.msg || "Credenciales inválidas");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Inicio de sesión</h1>
      <form onSubmit={handleSubmit} className="col-4 mx-auto">
        <input
          type="email"
          placeholder="Correo"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100">
          Iniciar sesión
        </button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};