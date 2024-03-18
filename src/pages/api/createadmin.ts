import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismaClient';
import bcrypt from 'bcryptjs';

const createAdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password, name } = req.body;

      // Certifique-se de que todos os campos necessários estão presentes
      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Criptografe a senha antes de armazená-la
      const hashedPassword = await bcrypt.hash(password, 10); 

      // Crie um novo usuário com a role "ADMIN"
      const newAdminUser = await prisma.user.create({
        data: {
          email, 
          name,
          password: hashedPassword,
          role: 'ADMIN',
          active: true, 
        },
      });

      return res.status(201).json(newAdminUser);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
};

export default createAdminHandler;
