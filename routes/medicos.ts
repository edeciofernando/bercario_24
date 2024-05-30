import { PrismaClient } from "@prisma/client"
import { Router } from "express"

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

const router = Router()

router.get("/", async (req, res) => {
  try {
    const medicos = await prisma.medico.findMany({
      include: {
        bebes: true
      }
    })
    res.status(200).json(medicos)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nome, crm, celular, especialidade } = req.body

  if (!nome || !crm || !celular || !especialidade) {
    res.status(400).json({ "erro": "Informe nome, crm, celular e especialidade" })
    return
  }

  try {
    const medico = await prisma.medico.create({
      data: { nome, crm, celular, especialidade }
    })
    res.status(201).json(medico)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const medico = await prisma.medico.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(medico)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nome, crm, celular, especialidade } = req.body

  if (!nome || !crm || !celular || !especialidade) {
    res.status(400).json({ "erro": "Informe nome, crm, celular e especialidade" })
    return
  }

  try {
    const medico = await prisma.medico.update({
      where: { id: Number(id) },
      data: { nome, crm, celular, especialidade }
    })
    res.status(200).json(medico)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router