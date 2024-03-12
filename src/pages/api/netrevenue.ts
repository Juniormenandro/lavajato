import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import verifyToken from "@/utils/verifyToken";
import withAdminProtection from "@/utils/withAdminProtection";


async function calculateNetProfit(req: NextApiRequest, res: NextApiResponse) {
  
  const token = verifyToken(req);

  try {
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { startDate, endDate } = req.query;
    const startDateTime = new Date(startDate as string);
    const endDateTime = new Date(endDate as string);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return res.status(400).json({ error: 'Datas inválidas fornecidas' });
    }

    // Obtenção do Faturamento e Despesas
    const revenueData = await getMonthlyRevenue(startDateTime, endDateTime);
    const expenseData = await getWeeklyAndMonthlyExpense(startDateTime, endDateTime);

    // Cálculo do Lucro Líquido
    const netProfit = {
      revenue: revenueData.totalMonthlyRevenue / 100,
      expense: expenseData.totalRevenue.preco!, 
      netProfit: (revenueData.totalMonthlyRevenue / 100 - expenseData.totalRevenue.preco!), 
    };

    
    
    


    res.status(200).json({ netProfit });

  } catch (error) {
    console.error('Erro ao calcular o lucro líquido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}


async function getMonthlyRevenue(startDateTime: Date, endDateTime: Date) {
  const response = await prisma.servicos.groupBy({
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

  const totalMonthlyRevenue = response.reduce((acc, current) => {
    return acc + (current._sum.rawPrice || 0);
  }, 0);

  return { totalMonthlyRevenue };
}



async function getWeeklyAndMonthlyExpense(startDateTime: Date, endDateTime: Date) {
  const response = await prisma.despesas.aggregate({
    _sum: {
      preco: true,
    },
    where: {
      data: {
        gte: startDateTime,
        lte: endDateTime,
      },
    },
  });

  return {
    totalRevenue: response._sum 
  };
}

export default withAdminProtection(calculateNetProfit);
