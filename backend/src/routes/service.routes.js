const express = require('express');
const { createService, getServices, updateServiceById, deleteServiceById, getServicesById } = require('../controllers/service.controller');

const serviceRouter = express.Router();

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *                 description: Duración en minutos
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Servicio creado correctamente
 *       500:
 *         description: Error al crear el servicio
 */
serviceRouter.post('/', createService); // POST http://localhost:3000/api/services/

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtener todos los servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 *       500:
 *         description: Error al obtener los servicios
 */
serviceRouter.get('/', getServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Obtener un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error al obtener el servicio
 */
serviceRouter.get('/:id', getServicesById);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualizar un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Servicio actualizado correctamente
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error al actualizar el servicio
 */
serviceRouter.put('/:id', updateServiceById);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Eliminar un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio eliminado correctamente
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error al borrar el servicio
 */
serviceRouter.delete('/:id', deleteServiceById);

module.exports = serviceRouter;
