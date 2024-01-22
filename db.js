// db.js
const mongoose = require("mongoose");
const connectionUri = process.env.MONGO_URI_L;

const connectToDatabase = async () => {
  mongoose.connect(connectionUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectToDatabase;