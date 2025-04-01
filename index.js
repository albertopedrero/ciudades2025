// Importar módulos
const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

var corsOptions = { 
    origin: 'http://api.openweathermap.org/*',
    optionsSuccessStatus: 200
}
// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Importar rutas
const ciudadesAPI =require('./rutas/ciudades')
ciudadesAPI(app)

app.use(express.static('public'), cors(corsOptions))


// Iniciar servidor
var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})