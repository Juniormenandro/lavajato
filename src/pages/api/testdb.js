// pages/api/testdb.js
// pages/api/testprisma.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const categorias = await prisma.categoria.findMany(); // ou outra collection
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
