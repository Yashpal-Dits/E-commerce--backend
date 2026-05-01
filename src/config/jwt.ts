import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-12345";

if (!process.env.JWT_SECRET) {
  console.warn(" Using default JWT_SECRET. Set JWT_SECRET in .env for production.");
}

export const jwtConfig = {
  secret: JWT_SECRET,
  expiresIn: "30m",
  refreshTokenExpiry: "7d",
};