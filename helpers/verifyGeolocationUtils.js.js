
// Function to validate latitude
function validateLatitude(latitude) {
    // Latitude ranges from -90 to +90 degrees
    return typeof latitude === 'number' && latitude >= -90 && latitude <= 90;
}

// Function to validate longitude
function validateLongitude(longitude) {
    // Longitude ranges from -180 to +180 degrees
    return typeof longitude === 'number' && longitude >= -180 && longitude <= 180;
}

// Export the functions
module.exports = { validateLatitude, validateLongitude };
