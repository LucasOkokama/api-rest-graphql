import colors from 'colors'

const logger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red"
  }

  const ativatedColor = methodColors[req.method] || "white"

  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[ativatedColor])
  next()
}

export default logger