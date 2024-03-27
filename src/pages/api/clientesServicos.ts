import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { BookingType } from "@/app/form/page";

const prisma = new PrismaClient();

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { booking }: { booking: BookingType } = req.body;
  const {
    name,
    telefone,
    iercode,
    endereco,
    rawPrice,
    categoriaId,
    selectedProductId,
    selectedProductName,
    selectedPayment,
    selectedTime,
    formattedDate,
    selectedDayOfWeek,
    selectedDate,
    selectedMonth,
    selectedYear,
  } = booking;

  try {
   // console.log(booking, "dados");

    let client = await prisma.clientes.findUnique({
      where: { telefone }
    });

    // Se cliente encontrado pelo telefone, atualizar a iercode
    if (client) {
      client = await prisma.clientes.update({
        where: { id: client.id },
        data: { iercode },
      });
    } 
    else {
      // Se ainda não encontrou, criar um novo cliente
      if (!client) {
        client = await prisma.clientes.create({
          data: { name, telefone, iercode, endereco },
        });
      }
    }

    // Criar um novo serviço
    const newService = await prisma.booking.create({
      data: {
        cliente: { connect: { id: client.id } },
        categoriaId,
        selectedProductId,
        selectedProductName,
        selectedPayment,
        selectedTime,
        formattedDate,
        selectedDayOfWeek,
        selectedDate,
        selectedMonth,
        selectedYear,
        rawPrice,
        bookConcluido: true,
      },
    });
    //console.log(newService,'book realizado com sucesso')
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
