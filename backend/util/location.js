const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDG1ntF4ANokkHKD5vz3UNWq7K2YT4dEMQ";

async function getCoordsForAddress(address) {
  //return {
  //  lat: 25.0338089,
  //  lng: 121.5623674,
  //};

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  //console.log(JSON.stringify(data));

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError(
      `Could not find location for specified address: [${address}]`,
      422
    );
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
