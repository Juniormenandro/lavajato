import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: { method: string; query: { id: any; }; }, res: { json: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  if (req.method === 'PUT') {
    const id = req.query.id;
    
    try {
      await prisma.booking.update({
        where: {
          id: id
        },
        data: {
          bookConcluido: true,
        },
      });
      res.json({ message: 'Successfully updated!' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
