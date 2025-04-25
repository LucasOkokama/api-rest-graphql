const express = require("express")
const path = require("path")

const app = express();

let posts = [
  { "id": 1, "title": "Post one" },
  { "id": 2, "title": "Post two" },
  { "id": 3, "title": "Post three" }
]

app.use(express.static(path.join(__dirname, "public")))

app.get("/api/posts", (req, res) => {
  res.json(posts)
})

app.listen(8000, () => console.log(`Server is running on port 8000`))