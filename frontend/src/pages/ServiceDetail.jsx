import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../config/axios";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axiosClient.get(`/services/${id}`)
      .then(res => setService(res.data.servicesById))
      .catch(() => setService(null));
  }, [id]);

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return setMessage("Debes iniciar sesión para reservar.");
      await axiosClient.post("/reservations", {
        service: id,
        user: userId,
        date,
        status: "pendiente"
      });
      setMessage("Reserva realizada correctamente. Puedes ver el estado en tu perfil.");
      setSuccess(true);
      // Despacha el evento para actualizar el badge del carrito
      window.dispatchEvent(new Event('reservationsChanged'));
    } catch {
      setMessage("Error al reservar. Intenta de nuevo.");
    }
  };

  if (!service) return <div>Servicio no encontrado</div>;

  return (
    <div style={{
      maxWidth: 500,
      margin: "2rem auto",
      padding: "2rem 1rem",
      border: "1px solid #e0e0e0",
      borderRadius: 16,
      background: "#fff",
      boxShadow: "0 4px 16px #00336622",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: "100%",
      boxSizing: "border-box"
    }}>
      <h2 style={{fontWeight:700, fontSize:"1.5rem", marginBottom:8, wordBreak: "break-word", color: "#003366"}}>{service.name}</h2>
      <p style={{marginBottom:8, wordBreak: "break-word", color: "#222"}}>{service.description}</p>
      <p style={{marginBottom:4, color: "#0072ce"}}><strong>Duración:</strong> {service.duration} minutos</p>
      <p style={{marginBottom:16, color: "#0072ce"}}><strong>Precio:</strong> ${service.price}</p>
      <form onSubmit={handleReserve} style={{marginTop:20, display:"flex", flexDirection:"column", gap:12}}>
        <label style={{marginBottom:8}}>Fecha de reserva:
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} required style={{marginLeft:8, minWidth:120, padding:4, borderRadius:4, border:'1px solid #ccc'}} />
        </label>
        <button
          type="submit"
          style={{background: success ? '#aaa' : '#0072ce', color:'#fff', border:'none', borderRadius:8, padding:'10px 0', fontWeight:600, cursor: success ? 'not-allowed' : 'pointer', width:'100%', fontSize:'1rem', letterSpacing:1, boxShadow:'0 2px 8px #00336622'}}
          disabled={success}
        >{success ? 'Reservado' : 'Comprar/Reservar'}</button>
      </form>
      {message && <p style={{color: message.includes("Error") ? "red" : "green", marginTop:12}}>{message}</p>}
    </div>
  );
};

export default ServiceDetail;