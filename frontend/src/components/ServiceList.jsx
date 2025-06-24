import { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import { useNavigate } from "react-router-dom";


const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/services")
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((err) => {
        console.error("Error al obtener servicios:", err);
      });
  }, []);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "5.5rem 5.5rem",
      padding: "2.5rem 1rem 3rem 1rem",
      maxWidth: 1200,
      margin: "0 auto",
      width: "100%",
      boxSizing: "border-box"
    }}>
      {services.map(service => (
        <div
          key={service._id}
          style={{
            border: "1.5px solid #0072ce",
            borderRadius: 16,
            boxShadow: "0 4px 16px #00336622",
            padding: 32,
            background: "#fff",
            cursor: "pointer",
            transition: "box-shadow 0.2s, border-color 0.2s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 0,
            minHeight: 240,
            width: "100%",
            maxWidth: 420,
            margin: "0 auto"
          }}
          onClick={() => navigate(`/servicios/${service._id}`)}
        >
          <h3 style={{fontSize: "1.3rem", fontWeight: 700, marginBottom: 12, wordBreak: "break-word", color: "#003366"}}>{service.name}</h3>
          <p style={{marginBottom: 12, wordBreak: "break-word", color: "#222"}}>{service.description}</p>
          <p style={{marginBottom: 6, color: "#0072ce"}}><strong>Duración:</strong> {service.duration} minutos</p>
          <p style={{marginBottom: 18, color: "#0072ce"}}><strong>Precio:</strong> ${service.price}</p>
          <button
            style={{
              marginTop: "auto",
              background: "#0072ce",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 0",
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
              fontSize: "1rem",
              letterSpacing: 1,
              boxShadow: "0 2px 8px #00336622"
            }}
            onClick={e => {
              e.stopPropagation();
              navigate(`/servicios/${service._id}`);
            }}
          >Ver detalle</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
