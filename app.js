const express = require("express");
const https = require("node:https");
const bodyParse =require("body-parser");

const app = express();

app.use(bodyParse.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "f92f71c5ee192167517de5032906768d";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = (weatherData.weather[0].description);
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
            res.write("<p>The weather is currently " +des+ "</p>")
            res.write("<h1>The temperature in "+query+ " is "+temp+" degree Celsius</h1>");
            res.write("<img src="+ imageURL +">");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server started at port 3000");
});

