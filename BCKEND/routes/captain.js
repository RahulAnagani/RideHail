const express=require("express");
const router=express.Router();
const {body}=require("express-validator")
const captainController=require("../controllers/captainController");
router.post("/register",
    [
        body("fullName.firstName").trim().isLength({min:3}),
        body("fullName.lastName").optional().trim().isLength({min:3}),
        body("email").trim().isEmail(),
        body("password").isLength({min:4}),
        body("vehicle.color").isLength({min:3}),
        body("vehicle.plate").isLength({min:5}),
        body("vehicle.capacity").isInt({min:1}),
        body("vehicle.type").isIn(['Car','Bike','Auto'])
    ],
    captainController.register
)
module.exports=router;