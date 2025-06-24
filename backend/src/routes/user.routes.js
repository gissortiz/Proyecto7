const express = require('express');
const auth = require('../middleware/authorization');
const { createUser, updateUserById, login, verifyUser } = require('../controllers/user.controller')

const userRouter = express.Router();

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *       500:
 *         description: Error al crear el usuario
 */
userRouter.post('/create', createUser); //localhost:3000/

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
userRouter.put('/:id', updateUserById); // localhost:3000/api/users/:id

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Usuario o contraseña no corresponden
 *       404:
 *         description: Usuario no existe
 *       500:
 *         description: Error al iniciar sesión
 */
userRouter.post('/login', login); //localhost:3000/api/users/login

/**
 * @swagger
 * /api/users/verify-user:
 *   get:
 *     summary: Obtener datos del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *       500:
 *         description: Error al consultar usuario
 */
userRouter.get('/verify-user', auth, verifyUser); //localhost:3000/api/users/verify-user

module.exports = userRouter;