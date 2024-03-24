import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CategoriaBody {
  tipo: 'categoria';
  nome: string;
  image: string;
  Description: string;
  areaId: string;
}

interface ServicoBody {
  tipo: 'servico';
  nome: string;
  rawPrice: number;
  Description: string;
  categoriaId: string;
}

type RequestBody = CategoriaBody | ServicoBody;

type ResponseData = 
  | { error: string }
  | { nome: string; image?: string; Description: string | null; areaId?: string | null; categoriaId?: string; rawPrice?: number | null; };


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const body: RequestBody = req.body;

  try {
    if (body.tipo === 'categoria') {
      const categoria = await prisma.categoria.create({
        data: {
          areaId: body.areaId,
          nome: body.nome,
          image: body.image,
          Description: body.Description,
        },
      });
      res.json(categoria);
    } else if (body.tipo === 'servico') {
      // Agora TypeScript sabe que body é do tipo ServicoBody dentro deste bloco
      const servico = await prisma.servico.create({
        data: {
          nome: body.nome,
          rawPrice: body.rawPrice,
          Description: body.Description,
          categoriaId: body.categoriaId,
        },
      });
      res.json(servico);
    } else {
      res.status(400).json({ error: 'Requisição inválida' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
