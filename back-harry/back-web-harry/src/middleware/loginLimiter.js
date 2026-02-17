const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,                  // 5 intentos
    message: {
        msg: "Demasiados intentos. Intenta nuevamente en 15 minutos"
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = loginLimiter;
