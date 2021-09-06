const request = require('postman-request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=afba9c972c94abeaafbf8ed938f9cc84&query=' + latitude +','+ longitude

    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service.',undefined)
        }else if(body.error){
            callback('Unable to find location. Please enter valid location.',undefined)
        }else{
            const {temperature,feelslike,weather_descriptions} = body.current
            callback(undefined,{
                temperature,
                apparentTemperature: feelslike,
                description: weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast