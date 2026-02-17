const attempts = new Map();

module.exports = (req, res, next) => {
    const ip = req.ip;
    const count = attempts.get(ip) || 0;

    attempts.set(ip, count + 1);

    const delay = Math.min(count * 1000, 5000);

    setTimeout(() => {
        next();
    }, delay);
};
