import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { nome, preco, recibo } = req.body;

    // Verificações de validação
    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório e deve ser uma string.' });
    }
    if (!preco || isNaN(parseFloat(preco))) {
      return res.status(400).json({ error: 'O campo "preco" é obrigatório e deve ser um número válido.' });
    }

    let data = new Date();
    data.setHours(0, 0, 0, 0);

    

    try {
      const despesa = await prisma.despesas.create({
        data: {
          nome,
          preco: parseFloat(preco),
          recibo,
          data,
          
        },
      });
      return res.json({ despesa });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocorreu um erro ao adicionar a despesa.' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido.' });
  }
};
