import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';
import prisma from "@/lib/prismaClient";

// carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

// garantir que a URL do banco de dados está definida
if (!DATABASE_URL) {
  throw new Error("Por favor, defina a DATABASE_URL no arquivo .env");
}
 
const client = new MongoClient(DATABASE_URL);

let isConnected = false;

const connectToDb = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // conectar ao cliente, se necessário
    await connectToDb();

    // Buscar clientes com seus respectivos serviços
    const clientes = await prisma.clientes.findMany({
      where: {
        servicos: {
          some: {
            concluido: false,
          },
        },
      },
      include: {
        servicos: true,
      },
    });

    // enviar a lista de clientes como resposta
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}; 
 
export default handler;


