// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
require('dotenv').config();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const apiParam = req.params.date;
  if (apiParam !== undefined) {
    const dateFromString = new Date(apiParam);
    if (dateFromString != 'Invalid Date') {
      res.json({ unix: dateFromString.getTime(), utc: dateFromString.toUTCString() });
    } else {
      const millis = +apiParam;
      if (Number.isNaN(millis) == false) {
        const dateFromMillis = new Date(millis);
        res.json({ unix: dateFromMillis.getTime(), utc: dateFromMillis.toUTCString() });
      } else {
      	res.json({ error: 'Invalid Date'});
      }
    }
  } else {
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
