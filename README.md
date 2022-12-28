# Timestamp Microservice

This is the code for the [Timestamp Microservice project at freecodecamp.org](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice). 

This Timestamp Microservice handle API Endpoint at `/api/:date?`, the cases are:
1. If there is a `GET` request at `/api/2015-12-25`, the response is :
```JSON
{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
```
The date string `2015-12-25` use ISO Format, and the date and the month also can be omitted, for example if the request is `/api/2015-12`, the response is:
```JSON
{"unix":1448928000000,"utc":"Tue, 01 Dec 2015 00:00:00 GMT"}
```
If the request is `/api/2015`, the response is:
```JSON
{"unix":1420070400000,"utc":"Thu, 01 Jan 2015 00:00:00 GMT"}
```
2. This microservice also can handle input date in milliseconds, for example : `/api/1451001600000`, the response is:
```JSON
{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
```
3. If the input date string is invalid, for example: `/api/2015-13-25`, the response is:
```JSON
{"error":"Invalid Date"}
```
4. If the input date parameter is omitted, for example : `/api/` or `/api`, the api returns the current time, for example:
```JSON
{"unix":1672193004146,"utc":"Wed, 28 Dec 2022 02:03:24 GMT"}
```