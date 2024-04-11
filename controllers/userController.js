
const User = require('../models/userModel');
const { validateLatitude, validateLongitude } = require("../helpers/verifyGeolocationUtils.js")

exports.createAccount = async (req, res) => {

    try {
        const { firstName, lastName, latitude, longitude } = req.body;
        console.log(req.body)

        // Check if all required fields are provided
        if (!firstName || !lastName || !latitude || !longitude) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate latitude and longitude
        if (!validateLatitude(latitude) || !validateLongitude(longitude)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude values' });
        }

        // Create a new user instance
        const newUser = new User({ firstName, lastName, latitude, longitude });

        // Save the user to the database
        await newUser.save();
        //succesfully create   
        res.status(201).json({ message: 'User created successfully', user_id: newUser._id });
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}












