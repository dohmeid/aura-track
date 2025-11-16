import { hash, compare } from 'bcryptjs'
import { sign, verify, Secret, SignOptions, JwtPayload } from 'jsonwebtoken'
import { SignJWT, jwtVerify } from 'jose'

// This file centralizes the security functions:
// 1. Hashing and comparing  passwords with bcrypt
// 2. Creating and verifying JSON Web Tokens (JWTs)

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error(
    'Please define the JWT_SECRET environment variable inside .env.local'
  )
}

// @returns A promise that resolves to the hashed password
export const hashPassword = async (password: string): Promise<string> => {
  // uses 12 salt rounds. 10-12 is a good balance of security and performance.
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

/**
 * Compares a plain-text password with a hash to see if they match.
 * @returns A promise that resolves to true if the passwords match, false otherwise.
 */
export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await compare(password, hashedPassword)
  return isMatch
}

/**
 * Creates a JSON Web Token (JWT) for a user.
 * This function is for standard backend logic (API routes).
 * @param payload The data to include in the token (e.g., userId).
 * @returns The signed JWT string.
 */
export const createToken = (
  payload: Record<string, any>,
  options: SignOptions = { expiresIn: '1d' }
): string => {
  return sign(payload, JWT_SECRET as Secret, options)
}

/**
 * Verifies a JSON Web Token (JWT).
 * This function is for standard backend logic (API routes).
 * @param token The JWT string to verify.
 * @returns The decoded payload if the token is valid.
 */
export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload
    return decoded
  } catch (error) {
    throw new Error('Invalid or expired token.')
  }
}

// --- Functions for 'jose' (Used in Middleware) ---
const secretKey = new TextEncoder().encode(JWT_SECRET)

/**
 * Creates a JWT using 'jose' for use in Edge-compatible environments.
 * @param payload The data to include in the token.
 * @param expiresIn Expiration time (e.g., "1d", "2h").
 * @returns A promise that resolves to the signed JWT string.
 */
export const createTokenEdge = async (
  payload: Record<string, any>,
  expiresIn: string = '1d'
): Promise<string> => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey)
  return token
}

/**
 * Verifies a JWT using 'jose' for use in Edge-compatible environments.
 * @param token The JWT string.
 * @returns A promise that resolves to the decoded payload if valid.
 */
export const verifyTokenEdge = async (
  token: string
): Promise<object | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (error) {
    // This will catch expired tokens, invalid signatures, etc.
    return null
  }
}
