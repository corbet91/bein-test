import { jwtDecode } from "jwt-decode";

export function jwtVerification(access_token: string) {
  try {
    if (!access_token.trim()) {
      return false;
    }

    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;

    // Check if 'exp' exists and is less than currentTime
    if (decoded?.exp === undefined || decoded.exp < currentTime) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
