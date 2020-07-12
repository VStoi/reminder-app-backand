const UserController = require('./../controllers/UserController')
const verifyToken = require('../middlewares/verifyToken')

const userRouter = (app) => {
    const User = new UserController();

    app.get('/', (req, res) => {
        res.json({text: "hello!!"})
    })

    app.post('/user', User.create)
    app.post('/user/session', User.login)
    app.get('/user/me', verifyToken, User.getMe)


};

module.exports = userRouter;