import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get('/', (req,res)=> {
    res.send("Hi, auth endpoint here")
})
router.get('/register', (req,res)=> {
    res.send("Hi, auth register endpoint here")
})

export default router;