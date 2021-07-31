const request = require("postman-request");

//using callback to make above request reusable.

function getLatLong(lat, long, callback) {
    const url =
        "http://api.weatherstack.com/current?access_key=416f2385b68735c66e36dfb48d047682&query=" +
        lat +
        "," +
        long;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback(
                "unable to get location, can't access internet services.",
                undefined
            );
        } else if (body.error) {
            callback("unable to get location.", undefined);
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out. It is ${body.current.humidity} humid.`
            );
        }
    });
}

module.exports = getLatLong;
