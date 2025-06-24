const Reservation = require('../models/reservation.model');

exports.createReservation = async (req, res) => {
    const { service, user, date, time, status, notes } = req.body;
    try {
        const newReservation = await Reservation.create({
            service,
            user,
            date,
            time,
            status,
            notes
        });
        return res.status(201).json({ newReservation });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al crear la reserva',
            error: error.message
        });
    }
};

exports.getReservations = async (req, res) => {
    try {
        // Solo mostrar reservas del usuario autenticado
        const reservations = await Reservation.find({ user: req.user.id })
            .populate('service', 'name price') // trae nombre y precio del servicio
            .populate('user', 'username email'); // trae username y email del user

        return res.json({ reservations });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al obtener las reservas',
            error: error.message
        });
    }
};


exports.updateReservationById = async (req, res) => {
    const { service, user, date, time, status, notes } = req.body;
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { service, user, date, time, status, notes },
            { new: true, runValidators: true }
        );

        if (!updatedReservation)
            return res.status(404).json({ message: 'Reserva no encontrada' });

        return res.json({ updatedReservation });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al actualizar la reserva',
            error: error.message
        });
    }
};

exports.deleteReservationById = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

        if (!deletedReservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        return res.status(200).json({ deletedReservation });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al borrar la reserva',
            error: error.message
        });
    }
};

// Cambia el estado de la reserva a 'confirmada' (simula pago)
exports.payReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status: 'confirmada' },
            { new: true }
        );
        if (!updatedReservation)
            return res.status(404).json({ message: 'Reserva no encontrada' });
        return res.json({ updatedReservation });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al confirmar el pago',
            error: error.message
        });
    }
};
