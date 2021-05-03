const express = require("express");
const app = express();
const port = 5000;
const connectDB = require("./config/ConnectDB");
const PersonRoute = require("./routes/PersonRoute");

app.use(express.json());
connectDB();
app.use("/", PersonRoute);

app.listen(port, () => {
    console.log(`port:${port}`);
});
