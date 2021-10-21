const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taipei 101",
    description: "One of the most famous landmarks in Taiwan",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    address: "110台北市信義區信義路五段7號",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Taipei 102",
    description: "One of the most famous landmarks in Taiwan",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    address: "110台北市信義區信義路五段7號",
    creator: "u1",
  },
  {
    id: "p3",
    title: "Taipei 103",
    description: "One of the most famous landmarks in Taiwan",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    address: "110台北市信義區信義路五段7號",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: p1 }
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  console.log("GET Request in Places");

  if (!place) {
    // use throw error for synchronous call
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place }); // => { place } => { place: place }
};

// Other alternatives:
// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (userPlaces.length === 0) {
    // use next for asynchronous call
    return next(
      new HttpError("Could not find any place for the provided user id.", 404)
    );
  }

  res.json({ userPlaces });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  // const title = req.body.title;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const placeId = req.params.pid; // { pid: p1 }
  const { title, description } = req.body;

  const placeIndex = DUMMY_PLACES.findIndex(obj => obj.id === placeId);
  DUMMY_PLACES[placeIndex].title = title;
  DUMMY_PLACES[placeIndex].description = description;

  res.status(200).json({ place: DUMMY_PLACES[placeIndex] });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
