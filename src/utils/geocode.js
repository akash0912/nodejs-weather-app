const request = require('postman-request')
const geocode = (address, callback)=>{
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWthc2gwOTEyIiwiYSI6ImNrenFoZ2txajU3cXcybm8xNzJiNWI0dXkifQ.iK6V-DnzJW-k2rF7MxHa5g&limit=1`
    request({url: url, json: true},(error, {body})=>{

            if(error){
                callback('Unable to connect to network services!')
            }else if(body.features.length === 0){
                callback("Could not fetch data of the location!")
            }else{
                const data = body.features[0];
               callback(undefined,{
                   latitude: body.features[0].center[1],
                   longitude:body.features[0].center[0],
                   location: body.features[0].place_name,
               })
            }
        
        })
        

}

module.exports = geocode;