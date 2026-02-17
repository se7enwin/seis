require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('🔥 Conectando a:', process.env.DEV_DATABASE_URL);

// PASAR LA VARIABLE EXPLÍCITAMENTE
const sequelize = new Sequelize(process.env.DEV_DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ Conexión OK'))
    .catch(err => console.error('❌ Error:', err));

module.exports = sequelize;
