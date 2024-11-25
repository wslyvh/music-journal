import { jwtVerify, SignJWT } from "jose";
import { CONFIG } from "./config";
import dayjs from "dayjs";

interface JWTPayload {
  sub: string;
  aud?: string;
  [key: string]: string | number | undefined;
}

export async function generateToken(payload: JWTPayload) {
  const secret = new TextEncoder().encode(CONFIG.JWT_SECRET);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(dayjs().add(CONFIG.JWT_EXPIRATION, "seconds").unix())
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(CONFIG.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload as JWTPayload;
  } catch (err) {
    return null;
  }
}
