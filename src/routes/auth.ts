import { Router } from "express"

const routes = Router()

import { compareHash } from "../lib/bcrypt/bcrypt"
import { createAccessToken } from "../lib/jwt/jwt"
import { prisma } from "../lib/prisma/prisma"

//Login user with username and password, return JWT
routes.post("/login", async (req, res) => {
  const { username, password } = req.body
  const dbPassword = "$2b$10$pLFxYM64JsyBb07wwqznReNUbOmTci37JnYA/hZKw2DOqQPl.5imO"
  const isPasswordsMatching = await compareHash(password, dbPassword)
  if (
    req.body.username !== "alessandro_1" ||
    !isPasswordsMatching
  ) {
    res
      .status(404)  //NOT_FOUND
      .send("User not found or wrong password")
  } else {
    const token = createAccessToken(
      JSON.stringify({
        "username": username
      })
    )
    res
      .status(200)  //OK
      .send({
        "token": token
      })
  }
})

export { routes }