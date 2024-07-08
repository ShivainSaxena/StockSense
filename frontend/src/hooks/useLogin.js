import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useFillStocks } from "./useFillStocks";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { fillstocks } = useFillStocks();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    } else {
      try {
        await fillstocks(data.token);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setIsLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };
  return { login, error, isLoading };
};
