import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://nearmeappber2.herokuapp.com";

export const useHtml = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback((config, applyData) => {
    setIsLoading(true);
    fetch(`${BASE_URL}${config.route}`, {
      method: config.method ? config.method : "GET",
      headers: config.headers ? config.headers : {},
      mode: "cors",
      credentials: "include",
      body: config.body ? JSON.stringify(config.body) : null,
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        applyData(res.data);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
