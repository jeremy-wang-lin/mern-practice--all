import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      console.log("Enter sendRequest()");
      setIsLoading(true); // => will trigger parent component re-rendering immediately and concurrently
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        console.log("Start fetch");
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        console.log("End fetch. Response:");
        console.log(response);

        const responseData = await response.json();
        console.log("ResponseData:");
        console.log(responseData);

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );


        if (!response.ok) {
          console.log("response isn't ok. stauts: " + response.status);
          throw new Error(responseData.message);
        }

        setIsLoading(false); // => will trigger parent component re-rendering immediately and concurrently

        return responseData;
      } catch (error) {
        console.log("Catch error. Error is as follows:");
        console.log(error);

        console.log("Execute setHttpError(...)");
        setHttpError(error.message); // => will trigger parent component re-rendering immediately and concurrently
        console.log("Execute setIsLoading(false)");
        setIsLoading(false); // => will trigger parent component re-rendering immediately and concurrently

        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setHttpError(null);
  };

  useEffect(() => {
    return () => {
      // This function will be executed when the compoent using this effect unmounts 
      console.log("Enter useEffect() clean up!")
      activeHttpRequests.current.forEach((abortCtrl) => {
        console.log("Execute abort()")
        abortCtrl.abort();
      });
    };
  }, []);

  return [isLoading, httpError, sendRequest, clearError];
};
