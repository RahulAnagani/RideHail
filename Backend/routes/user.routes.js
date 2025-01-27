const express=require("express");
const router=express.Router();
const {body}=require("express-validator")
const userController=require("../controllers/userController")
const validator=require("../middlewares/AAth");
router.post ("/register",[
    body("email").trim().isEmail(),
    body('password').isLength({min:4}),
    body("fullName.firstName").isLength({min:4}),
    // body("fullName.lastName").optional().trim().isLength({min:3})],
],
    userController.registerUser
)
router.post("/login",[
    body("email").trim().isEmail(),
    body("password").isLength(4)
],
    userController.loginUser
)
router.post("/logout",validator.validateUser,userController.logoutUser);
router.get("/profile",validator.validateUser,userController.getUserProfile);

module.exports=router;