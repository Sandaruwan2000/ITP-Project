
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signup =async (req, res) => {

    const {username, email, password} = req.body;
    const hashesPassword =bcrypt.hashSync(password, 10);
    const newUser = new User({username, email, password: hashesPassword});

    try{
   await newUser.save();
   res.status(201).json('User created successfully!');
}catch(err){
    res.status(500).json(err.message);
}
};