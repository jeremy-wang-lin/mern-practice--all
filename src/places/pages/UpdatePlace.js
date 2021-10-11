import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taipei 101",
    description: "One of the most famous landmarks in Taiwan",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg",
    address: "110台北市信義區信義路五段7號",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Taipei 101",
    description: "One of the most famous landmarks in Taiwan",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg",
    address: "110台北市信義區信義路五段7號",
    location: {
      lat: 25.0338089,
      lng: 121.5623674,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  console.log(identifiedPlace);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
