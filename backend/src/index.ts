import cors from 'cors'
import express, { Request, Response } from 'express'
import { pool } from './db'
import { peopleController } from './controllers/peopleController'

const app = express()
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const port: number = Number(process.env.PORT) || 3001

app.get('/health', async (_req: Request, res: Response): Promise<void> => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'ok' })
  } catch (e: unknown) {
    console.error('Health check failed:', e)
    res.status(500).json({ status: 'error', db: 'unreachable' })
  }
})

// People API routes
app.get('/api/people/search', (req: Request, res: Response) => peopleController.searchPeople(req, res))
app.get('/api/people/export/csv', (req: Request, res: Response) => peopleController.exportCsv(req, res))
app.get('/api/people', (req: Request, res: Response) => peopleController.getAllPeople(req, res))
app.post('/api/people', (req: Request, res: Response) => peopleController.createPerson(req, res))
app.put('/api/people/:id', (req: Request, res: Response) => peopleController.updatePerson(req, res))

app.listen(port, (): void => {
  console.log(`Backend listening on port ${port}`)
})
