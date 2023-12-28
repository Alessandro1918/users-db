import { Router } from "express"

const routes = Router()

import { validateAccessToken } from "../lib/jwt/jwt"
import { prisma } from "../lib/prisma/prisma"

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Query for users, create or update them
 */

/**
 * @swagger
 * components:
 * 
 *   securitySchemes:
 *     
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * 
 *   schemas:
 * 
 *     UserEdit:
 *       properties:
 *         id:
 *           type: string
 *           example: "1"
 *           readOnly: true              # Property not writen on the user request, but available at the response. Hence, readOnly
 *         name:
 *           type: string
 *           example: "Alessandro"
 *         date_of_birth:
 *           type: string
 *           example: "1970-01-01T00:00:00.000Z"
 *         address_street:
 *           type: string
 *           example: "Rua X"
 *         address_number:
 *           type: integer
 *           example: 1
 *         address_complement:
 *           type: string
 *           example: "-"
 *         address_neighborhood:
 *           type: string
 *           example: "Moema"
 *         address_city:
 *           type: string
 *           example: "São Paulo"
 *         address_state:
 *           type: string
 *           example: "SP"
 *         address_cep:
 *           type: string
 *           example: "01234-000"
 *         status:
 *           type: boolean
 *           example: true
 *           readOnly: true
 *         created_at:
 *           type: string
 *           example: "1970-01-01T00:00:00.000Z"
 *           readOnly: true
 *         created_by:
 *           type: string
 *           example: "admin"
 *           readOnly: true
 *         updated_at:
 *           type: string
 *           example: "1970-01-01T00:00:00.000Z"
 *           readOnly: true
 *         updated_by:
 *           type: string
 *           example: "admin"
 *           readOnly: true
 *         removed_at:
 *           type: string
 *           example: "1970-01-01T00:00:00.000Z"
 *           readOnly: true
 *         removed_by:
 *           type: string
 *           example: "admin"
 *           readOnly: true
 * 
 *     UserCreate:
 *       allOf:
 *         - $ref: "#/components/schemas/UserEdit"
 *         - properties:
 *             cpf:
 *               type: string
 *               example: "123.456.789-00"
 */

 /**
 * @swagger
 * /users:
 *   get:
 *     tags: [ Users ]
 *     description: Returns a list of all the users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users found on the db
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserCreate"
 *       400:
 *          description: User access token missing or invalid
 *       401:
 *          description: User access token expired
 */
routes.get("/", validateAccessToken, async (req, res) => {
  const users = await prisma.user.findMany()
  res.send(users)
})

 /**
 * @swagger
 * /users/{cpf}:
 *   get:
 *     tags: [ Users ]
 *     description: Returns data of a single user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         type: string
 *         description: CPF of the user to be returned
 *         required: true
 *     responses:
 *       200:
 *         description: User found on the db
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserCreate"
 *       400:
 *          description: User access token missing or invalid
 *       401:
 *          description: User access token expired
 */
routes.get("/:cpf", validateAccessToken, async (req, res) => {
  const cpf = req.params.cpf
  const user = await prisma.user.findUnique({
    where: {
      cpf: cpf
    }
  })
  res.send(user)
})

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [ Users ]
 *     description: Saves a new user in the db
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserCreate"
 *     responses:
 *       201:
 *         description: User created on the db
 *       400:
 *          description: User access token missing or invalid
 *       401:
 *          description: User access token expired
 */
routes.post("/", validateAccessToken, async (req, res) => {
  const newUser = {
    cpf: req.body.cpf,
    name: req.body.name,
    date_of_birth: req.body.date_of_birth,
    address_street: req.body.address_street,
    address_number: parseInt(req.body.address_number),
    address_complement: req.body.address_complement,
    address_neighborhood: req.body.address_neighborhood,
    address_city: req.body.address_city,
    address_state: req.body.address_state,
    address_cep: req.body.address_cep,
    created_by: "admin",
  }
  await prisma.user.create({
    data: newUser
  })
  res
    .status(201)
    .send("User created!")
})

/**
 * @swagger
 * /users:
 *   put:
 *     tags: [ Users ]
 *     description: Edit data of an user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         type: string
 *         description: CPF of the user to be edited
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserEdit"
 *     responses:
 *       200:
 *         description: User updated on the db
 *       400:
 *          description: User access token missing or invalid
 *       401:
 *          description: User access token expired
 */
routes.put("/:cpf", validateAccessToken, async (req, res) => {
  const cpf = req.params.cpf
  const updatedUser = {
    name: req.body.name,
    date_of_birth: req.body.date_of_birth,
    address_street: req.body.address_street,
    address_number: parseInt(req.body.address_number),
    address_complement: req.body.address_complement,
    address_neighborhood: req.body.address_neighborhood,
    address_city: req.body.address_city,
    address_state: req.body.address_state,
    address_cep: req.body.address_cep,
    updated_at: new Date(),
    updated_by: "admin"
  }
  await prisma.user.update({
    where: {
      cpf: cpf
    },
    data: updatedUser
  })
  res.send("User updated!")
})

/**
 * @swagger
 * /users:
 *   delete:
 *     tags: [ Users ]
 *     description: De-activate existing user, by changing "status" to "false" (don't really delete it, because it will record when and who removed this user).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cpf
 *         type: string
 *         description: CPF of the user to be deactivated
 *         required: true
 *     responses:
 *       204:
 *         description: User status changed to "deactivated"
 *       400:
 *          description: User access token missing or invalid
 *       401:
 *          description: User access token expired
 */
routes.delete("/:cpf", validateAccessToken, async (req, res) => {
  const cpf = req.params.cpf
  const updatedUser = {
    status: false,
    removed_at: new Date(),
    removed_by: "admin"
  }
  await prisma.user.update({
    where: {
      cpf: cpf
    },
    data: updatedUser
  })
  res
    .status(204)
    .send("User deactivated!")
})

export { routes }