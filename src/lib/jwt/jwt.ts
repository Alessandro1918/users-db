import * as jwt from "jsonwebtoken"

//Signs a JWT access token to be used in further API calls
export function createAccessToken(payload: string) {
  const accessToken = jwt.sign(
    JSON.parse(payload),
    String(process.env.ACCESS_TOKEN_SECRET),
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    },
  );
  return accessToken;
}