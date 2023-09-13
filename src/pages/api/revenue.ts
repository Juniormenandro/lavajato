import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";

async function calculateMonthlyRevenue(req: NextApiRequest, res: NextApiResponse) {
  
  const token = verifyToken(req);

  try {

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { startDate, endDate } = req.query;

    const startDateTime = new Date(startDate as string);
    const endDateTime = new Date(endDate as string);

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

    res.status(200).json({ monthlyRevenue, totalMonthlyRevenue });
  } catch (error) {
    console.error('Erro ao calcular o faturamento:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export default calculateMonthlyRevenue;

 