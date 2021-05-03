const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("DB Connected");
    } catch (error) {
        console.log({ msg: "DB not Connected", error });
    }
};
module.exports = connectDB;
