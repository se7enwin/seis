const express = require('express');
//const router = require('./src/routes'); //Descomentar para reestablecer BD original
const server = express();
const morgan = require('morgan');
const PORT = 3010;
//const { conn } = require('./src/database/conexion');//Descomentar para BD original
//La BD original(del curso) no tenia consistencia.Se genero copia como baseSinMigration en carpeta utils

require('dotenv').config();
require('./src/bd/config/postgresql'); // ← Ejecuta base de datos

server.listen(PORT, () => {
   console.log('Server raised in port: ' + PORT);
   // conn.sync({force: true});// Descomentar para BD original

   console.log('Hola, iniciando desde Index.js')
});


server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept,Authorization, X-Api-Key, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});

server.use(morgan('dev'));
server.use(express.json());

//Descomentar linea de abajo para reestablecer base original
//server.use('/rickandmorty',router) // Ponemos path aqui en lugar de en cada enrutamiento

// Ejemplo Base de Datos Nuevo - 

var postRouter = require('./src/routes/postRoute');
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
//server.use('/api/v1/', postRouter)
server.use('/harrypotter/', postRouter)
