import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const PORT = process.env.PORT || 5000
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))


app.listen(PORT, () => { console.log(`Server has stated on port: ${PORT}`) })