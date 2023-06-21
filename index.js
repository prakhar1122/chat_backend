import http from "http";
import express from "express";
import logger from "morgan";
// import cors from "cors";
import "./config/mongo.js"
import indexRouter from "./routes/index.js";
import chatRoomRouter from "./routes/chatroom.js"
import userRouter from "./routes/user.js"
import deleteRouter from "./routes/delete.js"
import messagerouter from "./routes/messageroutes.js"
import messagemodel from "./models/messagemodel.js";
import cors from "cors"
import { Server } from "socket.io";
import { env } from "process";
const app = express();
const port = process.env.port || 4000
app.set("port", port);
//what our express app is using
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
app.use("/delete", deleteRouter);
app.use("/messages", messagerouter)
//middleware
import { decode } from "./middleware/jwt.js"
//if catch 404 error and forward to error handler
app.use('*', (req, res) => {
    return res.status(404).json({
        succesful: false,
        message: "api do not exist"
    })
});

//creating http server
const server = http.createServer(app);
var io = new Server(server);
global.onlineUsers = new Map();

io.on("connection", (socket) => {

    socket.on("add", async ({ user }) => {
        console.log(`ew joining ${user}`);
        onlineUsers.set(user, socket.id);
        socket.join(user);
    });

    socket.on("send", async ({ sender, receiver, message }) => {
        console.log(`receiver is${receiver}`)
        const to = onlineUsers.get(receiver);
        const data = await messagemodel.create({
            message: { text: message },
            users: [sender, receiver],
            sender
        });
        if (to) {
            console.log("adding message");
            console.log(`message is ${message}`);
            socket.to(receiver).emit("received", data);
        }
    });
    socket.on("dconnect", async ({ user }) => {
        onlineUsers.delete(user);
        socket.disconnect(user);
        console.log("disconnected ");
        if (socket.rooms.has(user)) {
            console.log('Socket is connected to room1');
        } else {
            console.log('Socket is not connected to room1');
        }
    });
});
// console.log("harsh");
server.listen(port, () => { console.log("server started") });
