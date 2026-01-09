require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('🔥 Intentando conectar a PostgreSQL...');

const sequelize = new Sequelize(process.env.DEV_DATABASE_URL);

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexión OK a PostgreSQL');
    })
    .catch(err => {
        console.error('❌ Error al conectar a la DB:', err);
    });
