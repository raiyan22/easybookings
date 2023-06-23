import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

// important connection
const connect = async () => { // does not retry
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (err) {
        throw err;
    }
}

mongoose.connection.on("disconnected", ()=>{ // retries
    console.log("MongoDB disconnected!");
})

mongoose.connection.on("connected", ()=>{ // retries
    console.log("MongoDB connected!");
})


app.get('/', (req, res) => {
    res.send("hello");
} )

app.listen(8800, () => {
    console.log("Connected to backend...!");
})