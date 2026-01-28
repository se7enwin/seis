const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    console.log('🔐 AUTH HEADER:', req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: 'Token no enviado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;


        if (!decoded?.id) {
            return res.status(401).json({ msg: 'Token inválido' });
        }
        next();

    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
};

module.exports = checkAuth;
