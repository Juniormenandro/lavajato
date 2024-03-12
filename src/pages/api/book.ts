import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = verifyToken(req);

  try {

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
 
    const clientes = await prisma.booking.findMany({
      where: {
        bookConcluido: false,
      },
      include: {
        cliente: {
          include: { 
            Booking: true, 
          },
        },
      },
    });

    
    // Mapear os dados para ter as propriedades do cliente no objeto principal
    const clientesBookFormatados = clientes.map(book => ({
      ...book,
      ...book.cliente,
      Booking: book.cliente.Booking,  
    }));

    
  
    res.status(200).json(clientesBookFormatados);

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}; 
 
export default handler; 
 


