const User = require('../models/User');
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { loginValidator, registerValidator } = require('../Validator/User')

class UserController {
    async load(req, res) {
        try {
            const user = await User.findById(req.Id);
            if(!user){
                return res.status(400).json({success: false, messages:'User not found'})
            }
            res.json({success: true, user})
        }
        catch(error){
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async login(req, res) {
        const {username, password} = req.body;
        const { error } = loginValidator(req.body);
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message });
        try {
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({success: false, messages:'Incorrect username or password'})
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Invalid password'}) 
            }
            const accessToken = jwt.sign(
                { Id: user._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({ success: true, messages: 'Login successfully', accessToken})
        }
        catch(error){
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async register(req, res) {
        const {username, password} = req.body;
        const { error } = registerValidator(req.body);
        if( error ) return res.status(400).json({success: false, messages: error.details[0].message });
        try {
            const user = await User.findOne({ username });
            if(user){
                return res.status(400).json({success: false,messages:'Username already taken'});
            }
            const hashpassword = await argon2.hash(password);
            const newUser = new User({...req.body, password:hashpassword})
            await newUser.save()

            const accessToken = jwt.sign(
                { Id: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )
            res.json({ success:true, messages:'Register successfully', accessToken })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async changePassword(req, res) {
        const {username, password, newPassword} = req.body;
        if(!username || !password || !newPassword) return res.status(400).json({success: false, messages: 'Missing data'});
        try {
            const user = await User.findOne({ username });
            if(!user){
                return res.status(400).json({success: false,messages:'Username uncorrect'});
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Invalid password'}) 
            }
            const hashpassword = await argon2.hash(newPassword);
            await User.updateOne({ username },{ password:hashpassword })

            res.json({ success:true, messages:'Change password successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async changeInfor(req, res) {
        const { username } = req.body;
        if(!username) return res.status(400).json({success: false, messages: 'Missing username'});
        try {
            const user = await User.findOne({ username });
            if(!user){
                return res.status(400).json({success: false,messages:'Username uncorrect'});
            }
            await User.updateOne({ username }, req.body)

            res.json({ success:true, messages:'Change password successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new UserController()