import "dotenv/config"
import express from "express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { routes as authRoutes } from "./routes/auth"
import { routes as usersRoutes } from "./routes/users"

const PORT = process.env.PORT || 4000

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Users-db API",
      version: "1.0.0",
      servers: ["http://localhost:4000"]  //path of the server available to test the requests
    },
  },
  apis: ["./src/routes/*.ts"],                //files with Swagger annotations
};
const swaggerDocs = swaggerJsdoc(swaggerOptions)

const app = express()

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
if (process.env.SWAGGER_ENV === "DEV") {
  app.use(
    "/api-docs",        //route to serve the documentation (localhost:4000/api-docs)
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
  )
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))