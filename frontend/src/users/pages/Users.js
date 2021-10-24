import React from "react";

import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "jeremy",
      image:
        "https://cdn-images-1.medium.com/max/2560/1*HSisLuifMO6KbLfPOKtLow.jpeg",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
