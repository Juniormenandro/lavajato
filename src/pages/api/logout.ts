import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      // Evitar cache para que o browser sempre processe a resposta
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

      // Remover o token e aumentar a segurança do cookie
      res.setHeader('Set-Cookie', ['token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict; Secure']);

      return res.status(200).json({ message: 'Logged out successfully' });
    } else {
      throw new Error('Method not allowed');
    }
  } catch (error) {
    console.error(error);
    return res.status(405).json({ error });
  }
};

export default handler;
