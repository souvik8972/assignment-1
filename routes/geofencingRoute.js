
const express = require("express");
const route = express.Router();
const geofencingController = require("../controllers/geofencingController")


route.post('/api/geofence',geofencingController.distanceChecking)


module.exports=route

