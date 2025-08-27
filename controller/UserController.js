const User = require('../model/UserScema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, resp) => {
    try {
        console.log(req.body);
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) return resp.state(409).json({'message': 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const savedUser = await User.create({
            name, email, passwordHash: hashedPassword
        });
        resp.status(201).json({'message': 'User Created Successfully', userId: savedUser._id});

    } catch (e) {
        resp.status(500).json({'message': 'Signup Error', error: e});
    }
}

const login = async (req, resp) => {
    try {
        const {email, password}= req.body;
        const selectedUser = await User.findOne({email});
        if(!selectedUser) return resp.status(404).json({'message':'User Not Found'});

        const isPasswordValid = await bcrypt.compare(password, selectedUser.passwordHash);
        if(!isPasswordValid) return resp.status(404).json({'message':'Invalid Credentials'});

        const token = jwt.sign({userId:selectedUser._id, email:selectedUser.email}, JWT_SECRET, {expiresIn: '1h'});
        resp.status(200).json({'message':'success!', token:token});

    }catch (e) {
        resp.status(500).json({'message': 'Login Error', error: e});
    }
}

module.exports={signup, login};