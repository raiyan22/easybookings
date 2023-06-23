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
router.delete("/:id", async (req,res)=> {

    try {

        const toBeDeletedHotel = await Hotel.findById(req.params.id);
        // try mongoose findOneAndDelete() later
        if(toBeDeletedHotel) {
            await Hotel.findByIdAndDelete(req.params.id);
            console.log("Hotel id: " ,toBeDeletedHotel._id, "is deleted" );
            res.status(200).json("Hotel Deleted");
        } else {
            res.status(200).json("Cannot Delete. Hotel not found in database");
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get
router.get("/:id", async (req,res)=> {

    try {
        // const updatedHotel = await Hotel.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true}); // new so that it shows updated item
        const hotel = await Hotel.findById(req.params.id);
        // console.log(hotel._id);
        res.status(200).json(hotel);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GetAll
router.get("/", async (req,res)=> {

    try {
        // const updatedHotel = await Hotel.findByIdAndDelete(req.params.id, { $set: req.body}, {new: true}); // new so that it shows updated item
        const hotels = await Hotel.find();
        // console.log(hotel._id);
        res.status(200).json(hotels);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DeleteAll

export default router;
