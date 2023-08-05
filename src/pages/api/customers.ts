import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';
import prisma from "@/lib/prismaClient";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// garantir que a URL do banco de dados está definida
if (!MONGODB_URI) {
  throw new Error("Por favor, defina a MONGODB_URI no arquivo .env");
}
 
const client = new MongoClient(MONGODB_URI);



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
      
      include: {
        servicos: true,
      },
    });

    // enviar a lista de clientes como resposta
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error. precisar fazer de novo " });
  }
}; 

export default handler;
