// pages/api/categorias.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categorias = await prisma.categoria.findMany();
      // Note a mudança de {_id, nome, image} para {id, nome, image}
      const categoriasNormalizadas = categorias.map(({ id, nome, image }) => ({
        id,
        nome,
        imageUrl: image, // Sem mudança aqui, já estava correto
      }));
      console.log(categoriasNormalizadas, 'dados da categoria normalizados');
      res.status(200).json(categoriasNormalizadas);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error); // Ajuda no debugging
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
