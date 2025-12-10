import { SignJWT, jwtVerify } from "jose";

// Lazy initialization to avoid build-time errors when JWT_SECRET is not set
// This allows the build to complete, but will fail at runtime if JWT_SECRET is missing
function getSecretKey(): Uint8Array {
  const SECRET_KEY = process.env.JWT_SECRET;
  if (!SECRET_KEY) {
    // During build time, allow build to continue with a placeholder
    // At runtime in production, this will cause authentication to fail (which is expected)
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      // In production runtime, throw error
      throw new Error("JWT_SECRET environment variable is required for authentication");
    }
    // For build/dev time, use placeholder to allow build to complete
    // Note: Authentication will not work without proper JWT_SECRET
    return new TextEncoder().encode("build-time-placeholder-secret-must-be-set-in-production");
  }
  return new TextEncoder().encode(SECRET_KEY);
}

export async function signToken(payload: any) {
  const key = getSecretKey();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const key = getSecretKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
