import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js' // extension required for import
import usersRoute from './routes/users.js' // extension required for import
import hotelsRoute from './routes/hotels.js' // extension required for import
import roomsRoute from './routes/rooms.js' // extension required for import
import { createError } from "./utils/error.js";

const app = express();
dotenv.config();

// important initial connection
const connect = async () => { // does not retry
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("[Initial] Connected to MongoDB Atlas");
    } catch (err) {
        throw err;
    }
}

mongoose.connection.on("disconnected", ()=>{ // retries
    console.log("[Retried] MongoDB disconnected!");
});

mongoose.connection.on("connected", ()=>{ // retries
    console.log("[Retried] MongoDB connected!");
})

// middlewares
app.use(express.json()); // postman

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// err handling middleware
app.use((err,req,res,next)=>{
    const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated"));


    // const errStatus = err.status || 500;
    // const errMessage = err.message || "Something went wrong!";
    // return res.status(errStatus).json(errMessage);
    // return res.status(errStatus).json({
    //     success: false,
    //     status: errStatus,
    //     message: errMessage,
    //     stack: err.stack,
    // }); 
    
});


app.get('/', (req, res) => {
    res.send("hello");
} );

app.listen(8800, () => {
    connect();
    console.log("Server running on port: 8800");
});
