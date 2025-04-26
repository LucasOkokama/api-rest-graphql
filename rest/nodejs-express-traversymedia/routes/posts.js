import express from "express"
const router = express.Router()

// InMemory db
let posts = [
  { "id": 1, "title": "Post one" },
  { "id": 2, "title": "Post two" },
  { "id": 3, "title": "Post three" }
]

// Endpoints
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit)

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit))
  }

  res.status(200).json(posts)
})

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`)
    error.status = 404
    return next(error)
  }

  res.status(200).json(post)
})

router.post("/", (req, res, next) => {
  const { body } = req

  const newPost = {
    "id": posts.length + 1,
    "title": body.title
  }

  if (!newPost.title) {
    const error = new Error(`Please include a title`)
    error.status = 404
    return next(error)
  }

  posts.push(newPost)

  res.status(201).json(newPost)
})

router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`)
    error.status = 404
    return next(error)
  }

  post.title = req.body.title

  res.status(200).json(posts)
})

router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id)
  const post = posts.find((post) => post.id === id)

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`)
    error.status = 404
    return next(error)
  }

  posts = posts.filter((post) => post.id !== id)

  res.status(200).json(posts)
})

export default router
