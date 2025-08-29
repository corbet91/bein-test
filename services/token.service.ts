import type { TJwtPayload, TUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const getLocalRefreshToken = () => {
  const refreshToken = Cookies.get("refreshToken");
  return refreshToken ? refreshToken : null;
};

const getLocalAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? accessToken : null;
};

const updateLocalAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 7 }); // Hết hạn sau 7 ngày, điều chỉnh theo nhu cầu
};

const getAuth = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

const setAuth = (user: TUser) => {
  Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Hết hạn sau 7 ngày
};

const removeAuth = () => {
  Cookies.remove("user");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const getUserId = () => {
  const accessToken = getLocalAccessToken();
  if (accessToken) {
    const decoded = jwtDecode(accessToken) as TJwtPayload;
    return decoded.userId;
  }
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getAuth,
  setAuth,
  removeAuth,
  getUserId,
};

export default TokenService;