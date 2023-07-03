
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}); // new so that it shows updated item
        res.status(200).json(updatedUser);
    } catch(err) {
        console.log(err);
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {

        const toBeDeletedUser = await User.findById(req.params.id);
        // try mongoose findOneAndDelete() later
        if(toBeDeletedUser) {
            await User.findByIdAndDelete(req.params.id);
            console.log("User id: " ,toBeDeletedUser._id, "is deleted" );
            res.status(200).json("User Deleted");
        } else {
            res.status(200).json("Cannot Delete. User not found in database");
        }
    } catch(err) {
        console.log(err);
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try {
        // const updatedUser = await User.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true}); // new so that it shows updated item
        const user = await User.findById(req.params.id);
        // console.log(User._id);
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        next(err);
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        // const updatedUser = await User.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true}); // new so that it shows updated item
        const users = await User.find();
        // console.log(User._id);
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        next(err);
    }
}