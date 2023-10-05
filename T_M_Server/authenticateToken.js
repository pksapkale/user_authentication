import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: err.message });
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;
