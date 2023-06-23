import express from "express";
import Hotel from '../models/Hotel.js'

const router = express.Router();

// Create
router.post("/", async (req,res)=> {

    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update
router.put("/:id", async (req,res)=> {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true}); // new so that it shows updated item
        res.status(200).json(updatedHotel);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// Delete
// Get
// GetAll

export default router;