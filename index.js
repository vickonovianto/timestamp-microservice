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
  // check if apiParam is exist or not
  if (apiParam !== undefined) {
    // assume the apiParam is date string and try make Date from it
    const dateFromString = new Date(apiParam);
    if (dateFromString != 'Invalid Date') {
      // the param is date string and is a valid date
      res.json({ unix: dateFromString.getTime(), utc: dateFromString.toUTCString() });
    } else {
      /* If the Date from date string is invalid, there are
         two possibilities, first is the date string contains invalid date,
         second is the date string is actually time in milliseconds which is valid input
      */
      const millis = +apiParam; // try convert apiParam to integer to check if it is milliseconds or not
      if (Number.isNaN(millis) == false) {
        // if it is valid integer, then the apiParam is time in milliseconds
        const dateFromMillis = new Date(millis);
        res.json({ unix: dateFromMillis.getTime(), utc: dateFromMillis.toUTCString() });
      } else {
        // if the apiParam is not integer, then the input is invalid date string
      	res.json({ error: 'Invalid Date'});
      }
    }
  } else {
    // if the apiParam is undefined, return the current date
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
