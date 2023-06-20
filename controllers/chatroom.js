import roommodel from "../models/chat_model.js";
export default {
    initiate: async (req, res) => {
        console.log("req.body");
        try {
            const { sender, receiver } = req.body;
            const room = await roommodel.create({
                sender: sender,
                receiver: receiver
            });

            if (room) return res.json({ msg: "room created" });
            return res.json({ msg: "error creating room" })
        } catch (error) {
            console.log(error);
        }
    },
    postMessage: async (req, res) => { },
    gotRecentConversation: async (req, res) => { },
    gotConversationByRoomId: async (req, res) => { },
    markConversationReadByRoomId: async (req, res) => { },
}