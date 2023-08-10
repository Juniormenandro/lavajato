import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    let id: string | undefined;

    if (typeof req.query.id === 'string') {
      id = req.query.id;
    } else if (Array.isArray(req.query.id)) {
      id = req.query.id[0]; // pega o primeiro valor se for um array
    } else {
      return res.status(400).json({ error: 'ID inválido.' });
    }

    if (!id) {
      return res.status(400).json({ error: 'ID é obrigatório.' });
    }

    try {
      const tarefa = await prisma.clientesServicos.update({
        where: {
          id: id
        },
        data: {
          concluido: true,
        },
      });

      res.json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    } 
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
