

const { checkGeofence } = require("../services/googleMapsService.js")

const User = require('../models/userModel');
const { validateLatitude, validateLongitude } = require("../helpers/verifyGeolocationUtils.js");



exports.distanceChecking = async (req, res) => {
    try {
        // Get Location Position
        const { locationLatitude, locationLongitude } = req.body;

        // Validate location latitude and longitude
        if (!validateLatitude(locationLatitude) || !validateLongitude(locationLongitude)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude values' });
        }

        // Get user position
        const userId = req.query.user_id;
        const userDetails = await User.findOne({ _id: userId }).select('latitude longitude');

        // If user not found
        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userLatitude = userDetails.latitude;
        const userLongitude = userDetails.longitude;

        // Check geofence
        const response = await checkGeofence(userLatitude, userLongitude, locationLatitude, locationLongitude);


        // console.log(response)

        // Check if the distance is within radius 
        const distance = response.rows[0].elements[0].distance.value;

        if (distance <= 100) {
            return res.status(200).json({ message: 'User is within the radius' });
        } else {
            return res.status(400).json({ message: 'User is outside of the radius' });
        }
    } catch (error) {
        console.error('Error occurred during distance checking:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};