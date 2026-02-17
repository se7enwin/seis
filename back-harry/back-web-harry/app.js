const express = require('express');
const server = express();
const morgan = require('morgan');
const cors = require('cors');
const postRouter = require('./src/routes/postRoute');
//const PORT = 3010;

require('./src/bd/config/postgresql'); /* Run DB */
require('dotenv').config();

const allowedOrigins = ['https://harrypotter.miniweb.ar'];

const PORT = 3003;

server.listen(PORT, '0.0.0.0', () => {
   console.log(`API escuchando en puerto ${PORT}`);
});


server.use(cors({
   origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
         return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
   },
   credentials: true
}));

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }))
server.use('/harrypotter/', postRouter)