const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../dynamicHTML/views')
const partialsPath = path.join(__dirname, '../dynamicHTML/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Sarthak"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Sarthak"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Sarthak"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide a location"
        })
    }
    geocode(req.query.address, (geocodeError, { location, latitude, longitude } = {}) => {
        if (geocodeError) {
            return res.send({
                error: geocodeError
            })
        }
        forecast(latitude, longitude, (forecastError, { temperature, apparentTemperature, description } = {}) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }
            res.send({
                location,
                description,
                forecast: description + ". The current temperature is " + temperature + " degrees celsius. It feels like " + apparentTemperature + " degrees celsius.",
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarthak',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarthak',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started at ' + port)
})