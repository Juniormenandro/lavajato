import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = verifyToken(req);

  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const clientes = await prisma.clientes.findMany({
      where: {
        Booking: {
          some: {
            bookConcluido: true,
          },
        },
      },
      include: {
        Booking: {
          where: {
            bookConcluido: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      }
    });
  
    res.status(200).json(clientes);

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}; 
 
export default handler; 
 


