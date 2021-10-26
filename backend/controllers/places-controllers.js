const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Place = require("../models/place");
const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: p1 }

  //const place = DUMMY_PLACES.find((p) => {
  //  return p.id === placeId;
  //});

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const errMsg = `Error occurs while finding place by ID (${placeId}). Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  if (!place) {
    const httpError = new HttpError(
      "Could not find a place for the provided id.",
      404
    );

    return next(httpError);
  }

  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

// Other alternatives:
// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  //const userPlaces = DUMMY_PLACES.filter((p) => {
  //  return p.creator === userId;
  //});

  let userPlaces;
  try {
    userPlaces = await Place.find({ creator: userId });
  } catch (error) {
    const errMsg = `Error occurs while finding places by user ID (${userId}). Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  if (!userPlaces || userPlaces.length === 0) {
    // use next for asynchronous call
    return next(
      new HttpError("Could not find any place for the provided user id.", 404)
    );
  }

  res.json({
    userPlaces: userPlaces.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description, address, creator } = req.body;
  // const title = req.body.title;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    const errMsg = "Error occurs while saving place! Error: " + error;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }
  //DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const placeId = req.params.pid; // { pid: p1 }
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const errMsg = `Error occurs while finding place by ID (${placeId}). Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    const errMsg = `Error occurs while updating place by ID (${placeId}). Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  //if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
  //  throw new HttpError("Could not find a place for that id.", 404);
  //}

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const errMsg = `Error occurs while finding place by ID (${placeId}). Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  if (!place) {
    const httpError = new HttpError(
      "Could not find a place for the provided id.",
      404
    );

    return next(httpError);
  }

  try {
    await place.remove();
  } catch (error) {
    const errMsg = `Error occurs while deleting. Error: ${error}`;
    console.log(errMsg);
    const httpError = new HttpError(errMsg, 500);

    return next(httpError);
  }

  //DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "ok" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
