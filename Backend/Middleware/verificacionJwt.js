const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ error: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'tu_secreto_jwt', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = decoded; 
        next(); 
    });
};

module.exports = authMiddleware;
