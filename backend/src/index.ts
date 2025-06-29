import express from 'express'

const app = express()
const port = process.env.PORT || 3001

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
