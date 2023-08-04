/*
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query // accessing the 'id' in the route

 
  if (req.method === 'DELETE') {
    await prisma.clientesServicos.deleteMany({
      where: { clienteId: String(req.query.id) },
    })
  
    const cliente = await prisma.clientes.delete({
      where: { id: String(req.query.id) },
    })
    
    res.json(cliente)
  } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

*/


import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient()


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const servicoId = req.query.id

  if (req.method === 'GET') {
    const servicos = await prisma.clientesServicos.findMany();
    res.json(servicos);
  } else if (req.method === 'DELETE') {
    try {
      const post = await prisma.clientesServicos.delete({
        where: { id: String(servicoId) },
      })
      res.json(post)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        res.status(404).json({ error: "Record to delete does not exist." })
      } else {
        throw error
      }
    }
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}
