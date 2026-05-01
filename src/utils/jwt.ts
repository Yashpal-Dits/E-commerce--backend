import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";


export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}


export const generateAccessToken = (payload: JwtPayload): string => {
  const token = jwt.sign(
    payload,
    jwtConfig.secret,
    { expiresIn: "30m" }
  );
  return token;
};


export const generateRefreshToken = (payload: JwtPayload): string => {
  const token = jwt.sign(
    payload,
    jwtConfig.secret,
    { expiresIn: "7d" }
  );
  return token;
};


export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const payload = jwt.verify(token, jwtConfig.secret) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
};
  

export const generateTokens = (payload: JwtPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};


export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};