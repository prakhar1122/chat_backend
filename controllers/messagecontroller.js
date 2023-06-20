
import messagemodel from "../models/messagemodel.js";

export default {
    addMessage: async (req, res) => {
        console.log(req.body);
        try {
            const { sender, receiver, message } = req.body;
            const data = await messagemodel.create({
                message: { text: message },
                users: [sender, receiver],
                sender

            });
            if (data) return res.json({ msg: "message added" });
            return res.json({ msg: "failed to add message to the database" });
        } catch (error) {
            console.log(error);
        }
    },
    getAllmessage: async (req, res) => {
        console.log(req.body);
        try {
            const { sender, receiver } = req.body;
            const messages = await messagemodel.find({
                users: {
                    $all: [sender, receiver]
                }
            }).sort({ updatedAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromself: msg.sender.toString() === sender,
                    message: msg.message.text,
                    hour: msg.updatedAt.getHours(),
                    minutes: msg.updatedAt.getMinutes()
                };
            })
            res.json(projectedMessages);
        } catch (error) {
            console.log(error);
        }
    }
}