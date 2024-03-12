import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
 
  try {
    const hoje = new Date();
    const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);

    const clientes = await prisma.servicos.findMany({
      where: {
        concluido: false,
        data: { // Aqui você usa o nome correto do campo
          gte: inicioDoDia,
          lt: fimDoDia,
        },
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


