import User from "../models/User.js";
import createError from "../utils/error.js";
import bcrypt from 'bcryptjs';


export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync( req.body.password, salt);

        const newUser = new User({
            username: req.body.username, 
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
        // res.json(err);
    }
}

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({username:req.body.username});
        if(!user) return res.status(404).send("User not found");

        const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPassCorrect) return res.status(400).send("Wrong pass/username");

        // res.status(200).send("Logged in!");
        res.status(200).json(user);
    } catch (err) {
        // next(err);
        res.json(err);
    }
}