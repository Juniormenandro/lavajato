import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';
import prisma from "@/lib/prismaClient";

// carregar as variáveis de ambiente do arquivo .env
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
    // Depois de buscar os dados do Prisma
    const clientes = await prisma.clientesServicos.findMany({
      where: {
        concluido: false,
      },
      include: {
        cliente: {
          include: {
            servicos: true,  // incluir a relação "servicos"
          },
        },
      },
    });
    // Mapear os dados para ter as propriedades do cliente no objeto principal
    const clientesFormatados = clientes.map(servico => ({
      ...servico,
      ...servico.cliente,
      servicos: servico.cliente.servicos,  // adicione esta linha
    }));

    // Enviar os dados formatados
    res.status(200).json(clientesFormatados);

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}; 
 
export default handler;


