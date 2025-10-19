import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    const run = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (res.status === 401 || res.status === 422) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError("Error de conexión");
      }
    };
    run();
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      <h1>LO MEJOR DE YOUTUBE MI GENTE</h1>
      {data && <p className="mt-3">{data.msg || "Acceso concedido"}</p>}
      {error && <div className="text-danger mt-2">{error}</div>}
      <div className="container mt-4">
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/5TGgJQgDf68"
            title="Video privado"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};