import { PrismaClient } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export default async function handler(req: { method: string; query: { id: any; }; }, res: { json: (arg0: GetResult<{ id: string; carro: string | null; concluido: boolean; aguardandoPagamento: boolean; data: Date; selectedPayment: string | null; selectedProductId: string | null; selectedProductNane: string | null; selectedProdutPrice: string | null; selectedModel: string | null; selectedColor: string | null; selectedTime: string | null; selectedProductDefaultPrice: string | null; rawPrice: string | null; clienteId: string; },  never> & {}) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    
    try {
      const tarefa = await prisma.clientesServicos.update({
        where: {
          id: id
        },
        data: {
          concluido: true,
        },
      });

      res.json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
