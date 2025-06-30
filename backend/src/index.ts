import cors from 'cors'
import express, { Request, Response } from 'express'
import { pool } from './db'
import { notesController } from './controllers/notesController'

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

// Notes API routes
app.get('/api/notes/search', (req: Request, res: Response) => notesController.searchNotes(req, res))
app.get('/api/notes/export/csv', (req: Request, res: Response) => notesController.exportCsv(req, res))
app.get('/api/notes', (req: Request, res: Response) => notesController.getAllNotes(req, res))
app.post('/api/notes', (req: Request, res: Response) => notesController.createNote(req, res))
app.put('/api/notes/:id', (req: Request, res: Response) => notesController.updateNote(req, res))

app.listen(port, (): void => {
  console.log(`Backend listening on port ${port}`)
})
