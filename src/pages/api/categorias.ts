import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Categoria = {
  id: string;
  nome: string;
  Description: string;
  imageUrl: string;
};

type ApiResponse = Categoria[] | { error: string; detail?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    try {
      const categorias = await prisma.categoria.findMany();
      const categoriasNormalizadas: Categoria[] = categorias.map(({ id, nome, image, Description }) => ({
        id,
        nome,
        Description,
        imageUrl: image,
      }));
      res.status(200).json(categoriasNormalizadas);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Trata erros conhecidos do Prisma aqui
        console.error("Erro do Prisma:", error);
        res.status(500).json({ error: "Erro de banco de dados", detail: error.message });
      } else if (error instanceof Error) {
        // Trata erros genéricos de JavaScript/TypeScript
        console.error("Erro genérico:", error.message);
        res.status(500).json({ error: "Erro interno do servidor", detail: error.message });
      } else {
        // Para qualquer outro tipo de erro não identificado explicitamente
        console.error("Erro desconhecido:", error);
        res.status(500).json({ error: "Erro desconhecido" });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
