import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
 
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
 


