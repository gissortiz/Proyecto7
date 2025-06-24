const express = require('express');

const { createReservation, getReservations, updateReservationById, deleteReservationById, payReservation } = require('../controllers/reservation.controller');
const authMiddleware = require('../middleware/authorization');

const reservationRouter = express.Router();

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: ID del servicio
 *               user:
 *                 type: string
 *                 description: ID del usuario
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       500:
 *         description: Error al crear la reserva
 */
reservationRouter.post('/', createReservation); // http://localhost:3000/api/reservations/

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *       500:
 *         description: Error al obtener las reservas
 */
reservationRouter.get('/', authMiddleware, getReservations); // http://localhost:3000/api/reservations/

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *               user:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               status:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al actualizar la reserva
 */
reservationRouter.put('/:id', updateReservationById); // http://localhost:3000/api/reservations/:id

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al borrar la reserva
 */
reservationRouter.delete('/:id', deleteReservationById); // http://localhost:3000/api/reservations/:id

// Endpoint para simular pago de una reserva
reservationRouter.put('/:id/pay', authMiddleware, payReservation); // http://localhost:3000/api/reservations/:id/pay

module.exports = reservationRouter;
