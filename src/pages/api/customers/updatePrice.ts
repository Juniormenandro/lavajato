

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const servicoId = req.query.id

  if (req.method === 'GET') {
    const servicos = await prisma.servicos.findMany();
    res.json(servicos);
  } else if (req.method === 'POST') {
    try {
      const updatedService = await prisma.servicos.update({
        where: { id: String(servicoId) },
        data: {
          selectedProdutPrice: req.body.selectedProdutPrice,
        },
      });
      res.json(updatedService);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: "Failed to update the record." });
    }
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}

