

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()


interface UpdateData {
  rawPrice?: number;
  selectedPayment?: string;
  selectedColor?: string;
  selectedModel?: string;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const servicoId = req.query.id;

  if (req.method === 'GET') {
    const servicos = await prisma.servicos.findMany();
    res.json(servicos);
  } else if (req.method === 'POST') {
    try {
      const { rawPrice, selectedPayment, selectedColor, selectedModel } = req.body;

      // Criando um objeto com os campos que deseja atualizar
      let updateData: UpdateData = {};

      // Verificando se o campo rawPrice está presente e adicionando ao objeto de atualização
      if (rawPrice !== undefined) {
        updateData.rawPrice = parseInt(rawPrice);
      }

      // Verificando se os outros campos estão presentes e adicionando ao objeto de atualização
      if (selectedPayment !== undefined) {
        updateData.selectedPayment = selectedPayment;
      }

      if (selectedColor !== undefined) {
        updateData.selectedColor = selectedColor;
      }

      if (selectedModel !== undefined) {
        updateData.selectedModel = selectedModel;
      }

      // Realizando a atualização com os campos que foram fornecidos
      const updatedService = await prisma.servicos.update({
        where: { id: String(servicoId) },
        data: updateData,
      });

      res.json(updatedService);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to update the record." });
    }
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
