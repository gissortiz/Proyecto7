const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.routes');
const serviceRouter = require('./routes/service.routes');
const reservationRouter = require('./routes/reservation.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // <<< USAS EL swagger.js MODULAR

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/reservations', reservationRouter);

app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto: ' + PORT);
});
