import { useEffect, useState } from "react";
import axiosClient from "../config/axios";

const Profile = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simula autenticación: token y userId desde localStorage
    const token = localStorage.getItem("token");
    if (!token) return setMessage("Debes iniciar sesión para ver tus reservas.");
    axiosClient.get("/reservations", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setReservations(res.data.reservations))
      .catch(() => setMessage("Error al cargar reservas"));
  }, []);

  const handlePay = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axiosClient.put(`/reservations/${id}/pay`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(reservations.map(r => r._id === id ? { ...r, status: "confirmada" } : r));
    } catch {
      setMessage("Error al pagar la reserva");
    }
  };

  if (message) return <div>{message}</div>;

  return (
    <div style={{maxWidth:700, margin:"2rem auto"}}>
      <h2>Mis Reservas</h2>
      {reservations.length === 0 ? <p>No tienes reservas.</p> : (
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r._id} style={{borderBottom:"1px solid #ccc"}}>
                <td>{r.service?.name}</td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "pendiente" && (
                    <button onClick={() => handlePay(r._id)}>Pagar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;
