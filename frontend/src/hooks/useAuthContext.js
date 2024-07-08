import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  // This will retrieve the value we passed in {state, dispatch}
  const context = useContext(AuthContext);

  // Check if context is being used inside the provider
  if (!context) {
    throw Error("useAuthContext must be used inside AuthContextProvider");
  }

  return context;
};
