import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express" 

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

//Acts as a middleware on protected routes.
//Check accessToken existence, expiration, content
export function validateAccessToken(req: Request, res: Response, next: NextFunction) {                                                        //JS
  try {
    const token = req.headers["authorization"]?.split("Bearer ")[1]
    if (!token) {
      res
        .status(400)  //BAD_REQUEST
        .send("No token")
    } else {
      const decoded = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
      // console.log({decoded})
      next()          //I can't just "return" like a function call. This is a middleware; I have to "continue"
    }
    
  } catch (error: any) {
    // console.log(error.name)
    if (error.name === "TokenExpiredError") {
      res
        .status(401)  //UNAUTHORIZED
        .send("Expired token")
    } else {
      res
        .status(400)  //BAD_REQUEST
        .send("Invalid token")
    }
  }
}