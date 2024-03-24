import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Categoria = {
  id: string;
  nome: string;
  Description: string;
  imageUrl: string;
  areaId: string;
};

type ApiResponse = Categoria[] | { error: string; detail?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    try {
      // Extrai areaId da query string. Assume que areaId é uma string.
      const { areaId } = req.query;

      // Verifica se areaId foi fornecido
      if (!areaId || typeof areaId !== 'string') {
        return res.status(400).json({ error: 'Falta o parâmetro areaId na query string.' });
      }

      const categorias = await prisma.categoria.findMany({
        where: {
          areaId: areaId, // Filtra categorias pelo areaId recebido
        },
      });

      const categoriasNormalizadas: Categoria[] = categorias.map(({ id, nome, image, Description, areaId }) => ({
        id,
        nome,
        Description,
        imageUrl: image,
        areaId,
      }));

      res.status(200).json(categoriasNormalizadas);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Erro do Prisma:", error);
        res.status(500).json({ error: "Erro de banco de dados", detail: error.message });
      } else if (error instanceof Error) {
        console.error("Erro genérico:", error.message);
        res.status(500).json({ error: "Erro interno do servidor", detail: error.message });
      } else {
        console.error("Erro desconhecido:", error);
        res.status(500).json({ error: "Erro desconhecido" });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
