import React from "react";
import { useParams } from "react-router";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Taipei 101',
    description: 'One of the most famous landmarks in Taiwan',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg',
    address: '110台北市信義區信義路五段7號',
    location: {
      lat: 22.6203184,
      lng: 120.332019
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Taipei 101',
    description: 'One of the most famous landmarks in Taiwan',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Sun_Down_%28250260941%29.jpeg',
    address: '110台北市信義區信義路五段7號',
    location: {
      lat: 22.6203184,
      lng: 120.332019
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;