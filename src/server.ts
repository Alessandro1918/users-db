import "dotenv/config"
import express from "express"

import { routes as authRoutes } from "./routes/auth"
import { routes as usersRoutes } from "./routes/users"

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))