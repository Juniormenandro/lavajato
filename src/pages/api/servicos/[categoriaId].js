import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handle(req, res) {
  const { categoriaId } = req.query;
  const servicos = await prisma.servico.findMany({
    where: {
      categoriaId: categoriaId,
    },
  });
  res.json(servicos);
}
