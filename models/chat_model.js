// import express from express
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    sender: String,
    receiver: String
},
    {
        collection: "rooms"
    });

export default mongoose.model("Rooms", roomSchema);