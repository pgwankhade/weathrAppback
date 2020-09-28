const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const geocode = require('./utils/map')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001
app.use(bodyparser.json());
app.use(cors())


app.get('',(req, res)=>{
    res.send({
        msg:"hello"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
               res.send({
                forecast: forecastData.current,
                location,
                address: req.query.address
            })
        })
    })
})

app.listen(port,()=>{
    console.log('app running on ', port)
})