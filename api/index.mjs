import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  readRecords,
  insertRecord,
  deleteRecord,
} from './src/utils/records.mjs'

const PORT = 5000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Вітання від сервісу збереження часу! Слава Україні!!!')
})

app.get('/times', async (_, res) => {
  res.send(await readRecords())
})

app.post('/times', async (req, res) => {
  res.send(await insertRecord(req.body.time))
})

app.delete('/time/:id', async (req, res) => {
  res.send(await deleteRecord(req.params.id))
})

app.get('/analyze', async (_, res) => {
  const records = await readRecords()
  const chartData = generateChartData(records)
  res.json(chartData)
})

app.listen(PORT, () => {
  console.log(`Express web server is running at http://localhost:${PORT}`)
})
