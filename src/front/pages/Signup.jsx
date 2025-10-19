import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 201) {
        navigate("/login");
      } else {
        const data = await res.json();
        setError(data.msg || "Error al registrarse");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Registro</h1>
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
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};
