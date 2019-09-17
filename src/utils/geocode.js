const request = require('request');

const geocode = (address, callback) => {
  const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicHJhdGlrMjE5NCIsImEiOiJjazBjOHc2bGQxMnJkM21tZzNiMjBveHJxIn0.rGNgxXecCnVyXmjyFHP3cA&limit=1"

  request({url, json:true}, (error, response) => {
    if(error){
      callback('Unable to fetch lat/long', undefined)
    }else if(response.body.features.length === 0){
      callback('please check the parameter', undefined)
    }else{
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports= geocode;