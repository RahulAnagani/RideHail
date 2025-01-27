const fetch = require('node-fetch');
const captainModel = require('../models/captain.model');
module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await fetch(`https://maps.gomaps.pro/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(address)}&inputtype=textquery&fields=geometry&key=${process.env.API}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            const location = data.candidates[0].geometry.location;
            return location;
        } else {
            console.log(`No coordinates found for ${address}`);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
module.exports.getDistance=async(origin,destination)=>{
    try{
        const response=await fetch(`https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(destination)}&origins=${encodeURIComponent(origin)}&key=${process.env.API}`);
        if(!response.status===200){
            return null;
        }
        const data=await response.json();
        return data.rows[0].elements[0];
    }
    catch(e){
        console.log(e);
        return null;
    }
}
    module.exports.getSuggestions=async(input)=>{
        try{
            const response=await fetch(`https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&key=${process.env.API}`);
            if(!response.status===200)return null;
            const data=await response.json();
            return data;
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    module.exports.getCaptains=async(lat,lng,radius,vehicleType)=>{
        try{
            const captains=await captainModel.find({
                location:{
                    $geoWithin:{
                        $centerSphere: [ [ Number(lat), Number(lng) ], radius / 6371 ]
                    }
                },
                "vehicle.type":vehicleType
            });     
            return captains;
        }
        catch(e){
            console.log("Some error occured",e);
        }
        return null;
    }