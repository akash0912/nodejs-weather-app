const request = require('postman-request');

const forecast = (lat,lng, callback)=>{
    const url =`http://api.weatherstack.com/current?access_key=2c66eb74ffcd035b3452450a960b9205&query=${lat},${lng}`;

    request({url: url,json: true},(error, {body})=>{
        
        if(error){
            callback("Could not connect to weather service, Check Internet connection!")
        }else if(body.error){
            callback("Unable to find the location.");
        }
        else{
            //after adding the json to url object
            const data = body.current
           callback(undefined,`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out but it feels like ${data.feelslike} degrees out. Huhmidity is ${data.humidity} percent.`)
        }
       
       
       
    })
    
}

module.exports = forecast