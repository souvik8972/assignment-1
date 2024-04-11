const express=require("express");   
const route=express.Router();
const userController=require("../controllers/userController")

route.post("/api/createuser",userController.createAccount)

module.exports=route