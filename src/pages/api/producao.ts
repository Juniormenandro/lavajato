import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = verifyToken(req);

  try {

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
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


