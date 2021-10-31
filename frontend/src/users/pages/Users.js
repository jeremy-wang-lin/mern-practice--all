import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users/");
        if (!response.ok) {
          throw new Error(response.message);
        }
        const responseData = await response.json();
        console.log(responseData);
        setLoadedUsers(responseData.users);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  const errorStateHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal error={error} onClear={errorStateHandler} />
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
