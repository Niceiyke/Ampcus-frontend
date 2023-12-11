import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "./useAuth";
import { encryptData } from "../utils/encryptdycrpt";
import { useNavigate } from "react-router-dom";

const useFetchGet = () => {
  const { accessToken,refreshToken, user, logout } = useAuth();
  const navigate = useNavigate();

  let config: RequestInit = {};

  const BASEURL = import.meta.env.VITE_APP_BASE_URL;

  const NewAccessToken = async (
    refresh: string
  ): Promise<string | undefined> => {
    try {
      const response = await fetch(`${BASEURL}/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ refresh }),
      });

      if (response.status === 200) {
        const token = await response.json();

        const access_token = token.access;

        encryptData("access", access_token);
        encryptData("user", jwtDecode(access_token));
        return access_token;
      }
    } catch (error) {
      // Handle error
    }
  };

  const originalRequest = async (url: string,customHeaders?: Record<string, string>,): Promise<any> => {
    const url2 = `${BASEURL}${url}`;
    const response = await fetch(url2, customHeaders);

    const data = await response.json();

    return data;
  };

  const callFetch = async (url: string): Promise<any> => {
    const isExpiredAccessToken = dayjs.unix(user.exp).diff(dayjs()) < 1;

    const refresh = jwtDecode(refreshToken);
    const isExpiredRefreshToken = dayjs.unix(refresh.exp).diff(dayjs()) < 1;

    if (isExpiredRefreshToken) {
      console.log("refresh expired");
      logout();
      navigate("/login");
    }

    if (isExpiredAccessToken) {
      console.log("token expired");
      const access_token = await NewAccessToken(refreshToken);
      console.log("token updated");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        
      };

      const response = await originalRequest(url,headers);

      return response;
    } else {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        
      };
      const response = await originalRequest(url,headers);

      return response;
    }
  };

  return callFetch;
};

export default useFetchGet;
