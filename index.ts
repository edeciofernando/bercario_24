import express from 'express'
const app = express()
// const port = 3000
const port = process.env.PORT ?? 3000

import maesRoutes from './routes/maes'
import medicosRoutes from './routes/medicos'
import bebesRoutes from './routes/bebes'

app.use(express.json())
app.use("/maes", maesRoutes)
app.use("/medicos", medicosRoutes)
app.use("/bebes", bebesRoutes)

app.get('/', (req, res) => {
  res.send('API: Berçário')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})