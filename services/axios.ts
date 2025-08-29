import { jwtVerification } from "@/lib/jwt-verification";
import axios from "axios";

import TokenService from "./token.service";
import AppHistory from "./navigate.service";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_DEVELOP,
  headers: {
    "Content-Type": "application/json",
    timeout: 3000,
    "Accept-Language": "vn",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token && jwtVerification(token)) {
      config.headers!["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig?.url !== "/auth/login" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = TokenService.getLocalRefreshToken();
          if (refreshToken && jwtVerification(refreshToken)) {
            const rs = await axios.post(
              process.env.API_URL_DEVELOP + "/auth/refresh",
              null,
              {
                headers: {
                  Authorization: "Bearer " + refreshToken,
                },
              }
            );
            const { data } = rs.data;

            if (data) {
              TokenService.updateLocalAccessToken(data.access_token);
            }
            return instance(originalConfig);
          } else {
            TokenService.removeAuth();
            AppHistory.push("/pages/login");
            return Promise.reject();
          }
        } catch (_error) {
          TokenService.removeAuth();
          AppHistory.push("/pages/login");
          return Promise.resolve(_error);
        }
      }
    }
    return Promise.reject({ error: err.response });
  }
);

export default instance;
