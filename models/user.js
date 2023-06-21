import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
    CONSUMER: "consumer",
    SUPPORT: "support",
};


const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
    },
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    isAvatarset: {
        type: Boolean,
        default: false
    },
    avatarlink: {
        type: String,
        default: "",
    },
    password: String,
    chats: Array,
},

    {
        timestamps: true,
        collection: "users"
    },

)

export default mongoose.model("User", userSchema);