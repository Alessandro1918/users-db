import { Router } from 'express'

const routes = Router()

import { prisma } from "../lib/prisma/prisma"

//List all users
routes.get("/", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

//Get one user (by CPF)
routes.get("/:cpf", async (req, res) => {
  const cpf = req.params.cpf
  const user = await prisma.user.findUnique({
    where: {
      cpf: cpf
    }
  })
  res.json(user)
})

//Save a new user
routes.post("/", async (req, res) => {
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
  res.json(newUser)
})

//Update an existing user (by CPF)
routes.put("/:cpf", async (req, res) => {
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
  res.json(updatedUser)
})

//De-activate existing user (by CPF)
//(Don't really delete it, because it will record when and who removed this user)
routes.delete("/:cpf", async (req, res) => {
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
  res.json(updatedUser)
})

export { routes }