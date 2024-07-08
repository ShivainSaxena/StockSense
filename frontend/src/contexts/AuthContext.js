import { createContext, useReducer } from "react";
// Create Context and export it for use in other files
export const AuthContext = createContext();

// Create reducer function with access to inital values and action object
export const AuthReducer = (state, action) => {
  // Use switch to handle different types of state change
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        username: null,
      };
    default:
      return state;
  }
};

// Create provider tag that can wrap the App component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
