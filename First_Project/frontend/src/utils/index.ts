import { jwtDecode } from "jwt-decode";

export const tokenDecode = (token: string) => {
  if(!token) return "";

  const decodedData = jwtDecode(token);
  const expTime = new Date(decodedData.exp * 1000);
  const currentTime = new Date();

  if (expTime < currentTime) {
    localStorage.removeItem("buildit-token");
    return "";
  }
  return decodedData;
}