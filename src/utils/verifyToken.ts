import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

function verifyToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return token;
} catch (error) {
    console.error("Erro ao verificar o token:");
    return null;
}

}

export default verifyToken;
