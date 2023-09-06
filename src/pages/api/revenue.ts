import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

async function calculateWeeklyAndMonthlyRevenue(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { startDate, endDate } = req.query;

    const startDateTime = new Date(startDate as string);
    const endDateTime = new Date(endDate as string);

    const weeklyRevenue = await prisma.servicos.groupBy({
      by: ['selectedProductNane', 'selectedProductId', 'selectedPayment'],
      _sum: {
        rawPrice: true,
      },
      where: {
        data: {
          gte: startDateTime,
          lte: endDateTime,
        },
      },
    });

    const monthlyRevenue = await prisma.servicos.groupBy({
      by: ['selectedProductNane', 'selectedProductId', 'selectedPayment'],
      _sum: {
        rawPrice: true,
      },
      where: {
        data: {
          gte: startDateTime,
          lte: endDateTime,
        },
      },
    });

    const totalWeeklyRevenue = await prisma.servicos.groupBy({
      by: ['selectedPayment'],
      _sum: {
        rawPrice: true,
      },
      where: {
        data: {
          gte: startDateTime,
          lte: endDateTime,
        },
      },
    });

    const totalMonthlyRevenue = await prisma.servicos.groupBy({
      by: ['selectedPayment'],
      _sum: {
        rawPrice: true,
      },
      where: {
        data: {
          gte: startDateTime,
          lte: endDateTime,
        },
      },
    });
    res.status(200).json({ weeklyRevenue, monthlyRevenue, totalWeeklyRevenue, totalMonthlyRevenue });
  } catch (error) {
    console.error('Erro ao calcular o faturamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export default calculateWeeklyAndMonthlyRevenue;

 