const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({error: 'Unauthorized'})
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).json({error: 'Unauthorized'})
    }
}