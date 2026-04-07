var express = require("express");
var cors = require("cors");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const weather = [
    {
        city: "Oslo",
        weather: {
            wind: {
                speed: 8,
                deg: 170
            },
            clouds: 0,
            temp: 0,
            precipitation: 0
        }
    },
    {
        city: "Edinburgh",
        weather: {
            wind: {
                speed: 4,
                deg: 85
            },
            clouds: 60,
            temp: 3,
            precipitation: 0
        }
    },
    {
        city: "Berlin",
        weather: {
            wind: {
                speed: 16,
                deg: 117
            },
            clouds: 70,
            temp: 2,
            precipitation: 30
        }
    },
    {
        city: "Amsterdam",
        weather: {
            wind: {
                speed: 7,
                deg: 160
            },
            clouds: 80,
            temp: 5,
            precipitation: 10
        }
    },
    {
        city: "Yakutsk",
        weather: {
            wind: {
                speed: 0,
                deg: 0
            },
            clouds: 0,
            temp: -40,
            precipitation: 0
        }
    }
];

app.get("/", (req, res, next) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sample Site</title>
      </head>
      <body>
        <h1>Weather Service is Running</h1>
        <p>Use /weather?city=Berlin to get data.</p>
      </body>
    </html>
  `);
});

app.get("/weather", async (req, res, next) => {
    let ret = weather.find(e => e.city === req.query.city);
    if(ret) {
        if(!req.query.info || !Object.keys(ret.weather).includes(req.query.info)) {
            res.json(ret);
        } else {
            res.json({
                city: ret.city,
                weather: {
                    [req.query.info]: ret.weather[req.query.info]
                }
            });
        }
    } else {
        res.json({
            city: req.query.city
        });        
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});