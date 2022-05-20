const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = "#"

const connectDB = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectDB;
