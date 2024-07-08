import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    // Remove current user from local storage
    localStorage.removeItem("user");

    // Update context value
    dispatch({ type: "LOGOUT" });

    sessionStorage.clear();
  };

  return { logout };
};
