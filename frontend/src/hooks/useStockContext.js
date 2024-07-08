import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";

export const useStockContext = () => {
  // This will retrieve the value we passed in {state, dispatch}
  const context = useContext(StockContext);

  // Check if context is being used inside the provider
  if (!context) {
    throw Error("useStockContext must be used inside StockContextProvider");
  }

  return context;
};
