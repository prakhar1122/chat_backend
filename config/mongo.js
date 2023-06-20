import mongoose from "mongoose";
import config from "./index.js"

// const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`
const CONNECTION_URL = "mongodb+srv://prakharsh:prakharsh@cluster0.bnudwh0.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongo has connected succesfully')
}).catch((error) => { console.log(error) })