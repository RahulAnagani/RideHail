const RideModel = require("../models/rides")
const mapServices=require("./maps.services");
module.exports.getFare=async(pickup,destination)=>{
    if(!pickup||!destination)return null;
    const details=await mapServices.getDistance(pickup,destination);
    if(!details||details.status!=="OK")return null;
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    const fare = {
        Auto: Math.round(baseFare.auto + ((details.distance.value / 1000) * perKmRate.auto) + ((details.duration.value / 60) * perMinuteRate.auto)),
        Car: Math.round(baseFare.car + ((details.distance.value / 1000) * perKmRate.car) + ((details.duration.value / 60) * perMinuteRate.car)),
        Bike: Math.round(baseFare.moto + ((details.distance.value / 1000) * perKmRate.moto) + ((details.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}
module.exports.createRide=async({user,pickup,destination,vehicleType})=>{
    if(!user||!pickup||!destination||!vehicleType)return null;
    else{
        const fare=await this.getFare(pickup,destination);
        const ride=await RideModel.create({
            user,
            pickup,
            destination,
            vehicleType,
            fare:fare.vehicleType
        })
    }
}