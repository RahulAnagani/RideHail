const express=require("express");
const router=express.Router();
const {validateUser}=require("../middlewares/AAth");
const {query}=require("express-validator");
const {getAddressCoordinates, getDistance, getSuggestions}=require("../controllers/map.controller");
router.get("/get-coordinates",query('address').isString().isLength({min:3}),validateUser,getAddressCoordinates);
router.get("/get-distance",query("origin").isString().isLength({min:3}),query("destination").isString().isLength({min:3}),validateUser,getDistance);
router.get("/get-suggestions",query("input").isString().isLength({min:5}),validateUser,getSuggestions);
module.exports=router;