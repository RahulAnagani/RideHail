const express=require("express");
const { body } = require("express-validator");
const rideController=require("../controllers/ride.controller")
const router=express.Router();
router.post("/create",[body('userId').isString().isLength({min:24,max:24}),body('pickup').isString().isLength({min:3}),body("destination").isString().isLength({min:3})],)
router.get("/get-fare",[body("pickup").isString().isLength({min:4}),body('destination').isString().isLength({min:3})],rideController.getFare);
module.exports=router;