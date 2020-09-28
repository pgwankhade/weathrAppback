const request = require('request');

// const url = 'http://api.weatherstack.com/current?access_key=c3d65581f8b4720c13c024a86afbed3a&query=20.9320,77.7523'
// //const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/mumbai.json?access_token=pk.eyJ1IjoicHJpeWFua2FhZ3ciLCJhIjoiY2tmZ3ZoeDFtMGY1NjJ4bnZmazR4ZGs5ZyJ9.s4VsFWnCRIW_ct58xSx95g'

// request({url:url , json:true}, function (error, response, body) {

//     console.log(response.body.current.temperature)
 
// });


const forecast = (long, lati, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3d65581f8b4720c13c024a86afbed3a&query='+long+','+lati+'&units=m'
  ///  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicHJpeWFua2FhZ3ciLCJhIjoiY2tmZ3ZoeDFtMGY1NjJ4bnZmazR4ZGs5ZyJ9.s4VsFWnCRIW_ct58xSx95g'
  
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('unable to find location.', undefined)
        }
        else{
            callback(undefined,{
               
              current : response.body.current.weather_descriptions[0]+' ... it is currently '+response.body.current.temperature+' degree.. there is '+response.body.current.precip+' % chance of rain.'
            })
        }
    })
  }


  module.exports = forecast 