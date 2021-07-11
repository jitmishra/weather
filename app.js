const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extened:true}));


app.get("/", (req, res)=>{
res.sendFile(__dirname + "/index.html")

  //res.send("Server is up and running"); you have to send only one else error of crashed
});

app.post("/", (req, res)=>{
  const query=req.body.cityName;
  const apiKey="648fabb758aee6b1277558ce129edbe6";
  const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" +unit;
    https.get(url, (response)=>{
      console.log(response.statusCode);
      response.on("data",(data)=>{
        // console.log(data);
        const weatherData = JSON.parse(data);
        // console.log(weatherData);
        const temp= weatherData.main.temp;
        const desc= weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in " + query + " is "+temp+". Degree Celcius</h1>");
        res.write("<p>weather seems "+desc+" today</p>");
        res.write("<img src=" +imageUrl+">")
        res.send();
      })
})})

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
});
