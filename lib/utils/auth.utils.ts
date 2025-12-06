import { hash, compare } from 'bcryptjs';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

// This file centralizes the security functions:
// 1. Hashing and comparing  passwords with bcrypt
// 2. Creating and verifying JSON Web Tokens (JWTs)

const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = new TextEncoder().encode(JWT_SECRET);
const DEFAULT_EXPIRATION = '7d'; // Use one standard place

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

// @returns A promise that resolves to the hashed password
export const hashPassword = async (password: string): Promise<string> => {
  // uses 12 salt rounds. 10-12 is a good balance of security and performance.
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

/**
 * Compares a plain-text password with a hash to see if they match.
 * @returns A promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
};

export const createToken = async (payload: Record<string, string | number | boolean>): Promise<string> => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(DEFAULT_EXPIRATION)
    .sign(secretKey);
  return token;
};

export const verifyTokenServer = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
};
