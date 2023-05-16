const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res) {
    
    const query = req.body.cityName;
    const apiKey = 'f2de816e338f0089fd3a344183af0a5b';
    const weatherUnit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query +'&appid=' + apiKey +'&units=' + weatherUnit

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const imageUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'

            res.setHeader('Content-Type', 'text/html');
            res.write('<h3>The weather is currently ' + weatherDesc + ' in ' + query + '.</h3>');
            res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degrees Celcius.</h1>');
            res.write('<img src=' + imageUrl +'>');
            res.send()
    })
})
})




app.listen(port, function() {
    console.log('Server at port 3000 is now functional');
})