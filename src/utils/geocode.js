const request = require('postman-request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJhY3F1aW5lIiwiYSI6ImNrdDNoeDVnMDB1aTcydnMyMjZsYnk1YmUifQ.7pZ_JzTCHnaBB88aemLXng&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services.',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Please enter valid location.',undefined)
        }else{
            const {center,place_name} = body.features[0]
            callback(undefined,{
                latitude: center[0],
                longitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geocode