import { Router } from "express"

const routes = Router()

import { compareHash } from "../lib/bcrypt/bcrypt"
import { createAccessToken } from "../lib/jwt/jwt"
import { prisma } from "../lib/prisma/prisma"

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Verify user credentials
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [ Auth ]
 *     description: Get user credentials, returns an access token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *                 example: "alessandro_1"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: User found on the db, provided password is valid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI..."
 *       404:
 *         description: User not found or wrong password
 */
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