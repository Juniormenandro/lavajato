

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { BookingType } from "@/app/page";
import verifyToken from "@/utils/verifyToken";

const prisma = new PrismaClient();

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { booking }: { booking: BookingType } = req.body;
  const token = verifyToken(req);

    const {
      selectedProductId,
      selectedProductNane,
      selectedProdutPrice,
      nome,
      telefone,
      selectedModel,
      selectedColor,
      selectedTime,
      selectedProductDefaultPrice,
      rawPrice,
  
    } = booking;
    const price = parseFloat(selectedProdutPrice.replace('€', '').trim()) * 100;

  try {

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const client = await prisma.clientes.upsert({
        where: { telefone },
        update: { nome },
        create: { nome, telefone },
      });

    const newService = await prisma.clientesServicos.create({
      data: {
        cliente: { connect: { id: client.id } },
        aguardandoPagamento: true,
        carro: selectedModel, 
        concluido: false,
        data: new Date(),
        selectedPayment: booking.selectedPayment,
        selectedProductId: booking.selectedProductId,
        selectedProductNane: booking.selectedProductNane,
        selectedProdutPrice: booking.selectedProdutPrice,
        selectedModel: booking.selectedModel,
        selectedColor: booking.selectedColor,
        selectedTime: booking.selectedTime,
        selectedProductDefaultPrice: booking.selectedProductDefaultPrice,
        rawPrice: booking.rawPrice.toString()
      },
    });
    return res.status(201).json({
      message: 'Reserva criada com sucesso!',
      service: newService
    });
  } catch (error) {
    console.error("Erro ao criar a reserva:", error);
    return res.status(500).json({
      error: 'Erro ao criar a reserva.'
    });
  }
};

export default checkout;
