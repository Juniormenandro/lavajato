// pages/api/servicos/[servicoId].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const servicoId = req.query.servicoId;

  if (req.method === 'DELETE') {
    try {
      const servico = await prisma.servico.delete({
        where: { id: servicoId },
      });
      res.status(200).json({ message: 'Serviço deletado com sucesso', servico });
    } catch (error) {
      console.error('Falha ao deletar serviço:', error);
      res.status(500).json({ error: 'Erro ao deletar serviço' });
    }
  } else {
    // Método não permitido (não é DELETE)
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
