import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors());

const port = process.env.PORT || 3001

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
