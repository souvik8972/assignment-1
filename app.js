const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const userRoute = require("./routes/userRoute")
const geofencingRoute=require("./routes/geofencingRoute")


//calling routes
app.use(userRoute)
app.use(geofencingRoute)

// Connect to MongoDB
mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB");
        // Start  server if connection is successful
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);


    });