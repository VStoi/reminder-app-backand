const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({error: 'Unauthorized'})
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({error: 'Unauthorized'})
    }
}