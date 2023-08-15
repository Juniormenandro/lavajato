
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = verifyToken(req);
  
  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorizedd" });
    }

    const dateFilter: any = {};

    if (req.query.date) {
      const date = new Date(req.query.date as string);
      dateFilter.createdAt = {
        gte: startOfDay(date),
        lte: endOfDay(date)
      };
    } else if (req.query.weekDate) {
      const date = new Date(req.query.weekDate as string);
      dateFilter.createdAt = {
        gte: startOfWeek(date),
        lte: endOfWeek(date)   
      };
    } else if (req.query.monthDate) {
      const date = new Date(req.query.monthDate as string);
      dateFilter.createdAt = {
        gte: startOfMonth(date),
        lte: endOfMonth(date)  
      };
    }

    let clientes = await prisma.clientes.findMany({
      where: dateFilter,
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
        cliente.servicos.length > 1 || cliente.Booking.length > 1
      );
    }

    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;



/**
 import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = verifyToken(req);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { date, weekDate, monthDate, returned } = req.query;

    const dateFilter: any = {};

    if (date) {
      const parsedDate = new Date(date as string);
      dateFilter.createdAt = {
        gte: startOfDay(parsedDate),
        lte: endOfDay(parsedDate)
      };
    } else if (weekDate) {
      const parsedDate = new Date(weekDate as string);
      dateFilter.createdAt = {
        gte: startOfWeek(parsedDate),
        lte: endOfWeek(parsedDate)
      };
    } else if (monthDate) {
      const parsedDate = new Date(monthDate as string);
      dateFilter.createdAt = {
        gte: startOfMonth(parsedDate),
        lte: endOfMonth(parsedDate)
      };
    }

    const clientes = await prisma.clientes.findMany({
      where: dateFilter,
      include: {
        servicos: true,
        Booking: true,
      },
      orderBy: {
        updatedAt: "desc",
      }
    });

    const filteredClientes = (returned === 'true') 
      ? clientes.filter(cliente => cliente.servicos.length > 1 || cliente.Booking.length > 1)
      : clientes;

    res.status(200).json(filteredClientes);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;

 */