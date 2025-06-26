import UserModel from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try{
        const { name, email, password } = req.body;
        const existingUser=await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser=await UserModel.create({
            name,
            email,
            password: hashedPassword
        })
        return res.status(201).json(newUser);
    }catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token=jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
       

    }catch(error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}