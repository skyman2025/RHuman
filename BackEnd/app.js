const express = require('express');
const path = require('path');
const cors = require('cors');
//const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

const applicantsRoutes = require('./src/routes/applicantsRoutes');
const professionsRoutes = require('./src/routes/professionsRoutes');
const app = express();

app.use(cors());//Cabecera de CORS para evitar el error de direcciones cruzadas.
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
//app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use('/applicants',applicantsRoutes);
app.use('/professions',professionsRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));