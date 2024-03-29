
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";



const adminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = verifyToken(req);

  
  try {

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let clientes = await prisma.clientes.findMany({
      
      include: {
        servicos: true,
        Booking: true,
      },
      orderBy: {
        updatedAt: "desc",
      }
    });


    // If the "returned" parameter is present and is "true", apply the filter.
    if (req.query.returned && req.query.returned === 'true') {
      clientes = clientes.filter(cliente => 
        cliente.Booking.length > 1
      );
    }

    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export default (adminHandler);
