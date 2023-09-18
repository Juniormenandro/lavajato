import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
 
  try {
    const clientes = await prisma.servicos.findMany({
      where: {
        concluido: false,
      },
      include: {
        cliente: {
          include: { 
            servicos: true, 
          },
        },
      },
    });
 
    const clientesFormatados = clientes.map(servico => ({
      ...servico,
      ...servico.cliente,
      servicos: servico.cliente.servicos, 
    }));

    res.status(200).json(clientesFormatados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}; 
 
export default handler;


