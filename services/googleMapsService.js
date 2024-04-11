const { Client } = require('@googlemaps/google-maps-services-js');

// Load environment variables
require("dotenv").config();
const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;



// Create Google Maps client
const googleMapsClient = new Client({ apiKey: GOOGLE_MAP_API_KEY });

// Function to call Google Maps Distance Matrix API
const checkGeofence = async (userLatitude, userLongitude, locationLatitude, locationLongitude) => {
    try {
        const response = await googleMapsClient.distancematrix({
            params: {
                origins: [{ lat: userLatitude, lng: userLongitude }],
                destinations: [{ lat: locationLatitude, lng: locationLongitude }],
                units: 'metric'
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error occurred while checking geofence:', error);
        throw error;
    }
};

module.exports = { checkGeofence };