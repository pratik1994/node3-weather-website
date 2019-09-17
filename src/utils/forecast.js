const request = require('request');


const forecast = (lat,long, callback) => {
  const url = `https://api.darksky.net/forecast/1d6c3e9093283795731164ee061a303d/${lat},${long}?units=si`

  request({ url, json: true },(error, response) => {
  if(error){
    callback('Unable to fetch weather report', undefined)
  }else if(response.body.error) {
    callback('please check the parameter', undefined)
  }else{
    const forecast= response.body;
    callback(undefined,`${forecast.daily.data[0].summary}It is currently ${forecast.currently.temperature} degrees out. The high today is ${forecast.daily.data[0].temperatureHigh} with a low of ${forecast.daily.data[0].temperatureLow}. There is ${forecast.currently.precipProbability}% chances of rain.`)
  }  
})
}


module.exports = forecast;