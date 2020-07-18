const UserController = require('./../controllers/UserController')
const verifyToken = require('../middlewares/verifyToken')

const userRouter = (app) => {
    const User = new UserController();

    app.post('/user/session', User.login)
    app.get('/user/me', verifyToken, User.getMe)
    app.post('/user', User.create)

};

module.exports = userRouter;