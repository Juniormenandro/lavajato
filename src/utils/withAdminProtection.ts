import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import verifyToken from './verifyToken';
import jwt from 'jsonwebtoken';

function withAdminProtection(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      const token = verifyToken(req);
      if (!token) {
        return res.status(401).json({ error: 'Não autorizado' });
      }
  
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string };
      
      if (decodedToken.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso negado' });
      }
  
      return handler(req, res);
    };
  }
  export default withAdminProtection
