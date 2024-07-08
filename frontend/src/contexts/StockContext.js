import { createContext, useReducer } from "react";

// Create Context and export it for use in other files
export const StockContext = createContext();

// Create reducer function with access to inital values and action object
export const StockReducer = (state, action) => {
  // Use switch to handle different types of state change
  switch (action.type) {
    case "FILL":
      return action.payload;
    default:
      return state;
  }
};

// Create provider tag that can wrap the App component
export const StockContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StockReducer, []);

  return (
    <StockContext.Provider value={{ state, dispatch }}>
      {children}
    </StockContext.Provider>
  );
};
