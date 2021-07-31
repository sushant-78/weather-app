const request = require("postman-request");

const geolocation = (placeName, callback) => {
    const locNameToGeoLoc =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(placeName) +
        ".json?access_token=pk.eyJ1Ijoic2hhbmU3OCIsImEiOiJja3IxenNjNWcxcTQ2MndueGVnZHBieHY4In0.4G6P5Xg6DM0tt5oJegQaaw&limit=1";

    request({ url: locNameToGeoLoc, json: true }, (err, { body }) => {
        if (err) {
            callback(
                "unable to get geolocation, can't access internet services.",
                undefined
            );
        } else if (body.features == undefined || body.features.length === 0) {
            callback("unable to get geolocation", undefined);
        } else {
            callback(undefined, [
                body.features[0].center[1],
                body.features[0].center[0],
                body.features[0].place_name,
            ]);
        }
    });
};

module.exports = geolocation;
