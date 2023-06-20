import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const msgSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
    },
    users: Array,
    sender: {
        type: String,
        required: true
    }

},

    {
        timestamps: true,
        collection: "Messages"
    },

);

export default mongoose.model("Messages", msgSchema);