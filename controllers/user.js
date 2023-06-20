import bcrypt from "bcrypt";
import otpgenerator from "otp-generator";
import crypto from "crypto";
import msg91 from "msg91";
import UserModel, { USER_TYPES } from '../models/user.js';
export default {
    onGetAllusers: async (req, res) => {
        try {
            const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
                "_id",
                "name",
                "email"
            ]);
            return res.status(200).json({ success: true, users });

        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },
    onGetuserById: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const user = await UserModel.findOne({ _id: id });
            console.log(`username is ${user.name}`)
            return res.json({
                success: true,
                user
            })
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, error: e });
        }
    },
    //this is for register
    onCreateuser: async (req, res) => {
        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            const nameCheck = await UserModel.findOne({ name });
            if (nameCheck) {
                return res.json({
                    msg: "username already exist",
                    status: false,
                    error: "user",
                })
            }
            const emailcheck = await UserModel.findOne({ email });
            if (emailcheck) {
                return res.json({
                    msg: "email already used",
                    status: false,
                    error: "email",
                })
            }
            // const encryptedpass = await bcrypt.hash(password, 10);

            const user = await UserModel.create({ name, email, password });
            // delete user.password;
            return res.json({ status: true, msg: "user created", user: user });
        } catch (error) {
            console.log(error);
        }

    },
    onDeleteUserById: async (req, res) => {
        const id = req.params;
        try {
            const user = await UserModel.remove({ _id: id });
            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${user.deletedCount} user.`
            })
        } catch (error) {
            return res.status(500).json({ success: false, error: e });
        }
    },
    onLoginuser: async (req, res) => {
        console.log(req.body);
        try {
            const { name, password } = req.body;
            const User = await UserModel.findOne({ name: name });
            if (!User) {
                console.log("incorrect username");
                return res.json({
                    msg: "incorrect username ",
                    status: false,
                })
            }
            const Passcheck = password == User.password;
            if (!Passcheck) {
                console.log("incorrect pass");

                return res.json({
                    msg: "incorrect   password",
                    status: false,
                })
            }
            console.log("good");
            delete User.password;
            return res.json({ status: true, msg: "successfully login", user: User });
        } catch (error) {
            console.log(error);
        }
    },
    generateOtp: async (req, res) => {
        try {
            const { phone } = req.body;
            const otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            msg91.initialize({ authKey: "Your-Auth-Key" });
            console.log(`otp is ${otp}`);
            const ttl = 2 * 60 * 1000;
            const expire = Date.now() + ttl;
            const data = `${phone}.${otp}.${expire}`;
            const hash = crypto.createHmac("sha256", "myotpgenerator").update(data).digest("hex");
            const fullhash = `${hash}.${expire}`;
            return res.json({ msg: "otp send", fullhash });
        } catch (error) {
            console.log(error);
        }
    },
    verifyOtp: async (req, res) => {
        try {
            const { oldhash, phone, otp } = req.body;
            let [hashvalue, expires] = oldhash.split('.');
            let now = Date.now();
            if (now > parseInt(expires)) { return res.json({ error: "otp expired" }) }

            let data = `${phone}.${otp}.${expires}`;
            let newhash = crypto.createHmac("sha256", "myotpgenerator").update(data).digest("hex");

            if (hashvalue === newhash) {
                return res.json({ msg: "otp verified" });
            }
            return res.json({ msg: "invalid otp" });
        } catch (error) {
            console.log(error);
        }
    },
    addChat: async (req, res) => {
        try {
            const { sender, receiver } = req.body;
            const User = await UserModel.findOne({ _id: sender });
            const OtherUser = await UserModel.findOne({ _id: receiver });
            console.log(`sender is ${User.name}`);
            console.log(`sender is ${OtherUser.name}`);
            User.chats.push(receiver);
            User.save();
            OtherUser.chats.push(sender);
            OtherUser.save();
            return res.json({ msg: "chat started succesfully" });
        } catch (error) {
            console.log(error);
        }
    },
    getUsersWithChat: async (req, res) => {
        console.log("getting users");
        try {
            const { sender } = req.body;
            // var all_users = [];
            var User = await UserModel.findOne({ _id: sender });
            console.log(User.chats.length);
            return res.json({ "success": "false", "chats": User.chats });
        } catch (error) {
            console.log(error);
        }
    }
}





