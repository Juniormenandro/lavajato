import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handle(req, res) {
  const { tipo, nome,image, descricao, categoriaId } = req.body;

  try {
    if (tipo === 'categoria') {
      const categoria = await prisma.categoria.create({
        data: {
          nome,
          image,
        },
      });
      res.json(categoria);
    } else if (tipo === 'servico' && categoriaId) {
      const servico = await prisma.servico.create({
        data: {
          nome,
          descricao,
          categoriaId,
        },
      });
      res.json(servico);
    } else {
      res.status(400).json({ error: 'Requisição inválida' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
