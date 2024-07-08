import { useLogout } from "./useLogout";

export const useFetch = () => {
  const { logout } = useLogout();

  const AuthFetch = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (response.status === 401) {
      // Handle the unauthorized requests
      logout();
    }

    return response;
  };

  return { AuthFetch };
};
