import bcrypt from "bcrypt";

// Hash a password (for storing in database)
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;  // Security level (higher = slower but more secure)
  return await bcrypt.hash(password, saltRounds);
};

// Compare password with hash (for login)
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};