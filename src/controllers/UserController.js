const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const {
    validateLogin,
    validateRegistration,
    validateDeviceId
} = require('../utils/validations/UserValidation')


class UserController{

    async create(req, res) {
        const {error} = validateRegistration(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const postData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            email: req.body.email
        }
        try {
            const userIsExist = await User.findOne({email: postData.email})
            if (userIsExist) {
                return res.status(400).json({
                    error: "User with such email has been already registered"
                })
            }
        }catch (e) {
            return res.status(500).json({
                error: e
            })
        }
        try {
            const user = await User(postData)
            const savedUser = await user.save()
            res.json({user: savedUser})
        } catch (err) {
            res.json({error: err})
        }
    }

    async login(req,res){
        const {error} = validateLogin(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        const user = await User.findOne({email: req.body.email})
        //Check if user exists
        if (!user){
            return res.status(400).json({error: "Email or password does not match"})
        }
        //Compare passwords
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordIsValid){
            return res.status(400).json({error: "Email or password does not match"})
        }else{
            const token = await jwt.sign({_id: user.id}, process.env.JWT_SECRET_KEY)
            return res.json({
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                session:{ accessToken: token }
            })
        }
    }

    async getMe(req, res){
        const user = await User.findById(req.user._id)
        if (!user){
            return res.status(404).json({error: 'Not found'})
        }
        return res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
    }

    async updateDeviceToken(req, res){
        const deviceToken = req.body.deviceToken;
        const {error} = validateDeviceId(req.body);
        if (error){
            return res.status(400).json({error: error.details[0].message});
        }
        const user = await User.findByIdAndUpdate(req.user._id);
        if (!user){
            return res.status(404).json({error: 'Not found'});
        }
        user.set({deviceToken: deviceToken});
        user.save()
            .then(() => {
                return res.status(204).json({});
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err
                });
            });
    }
}

module.exports = UserController;