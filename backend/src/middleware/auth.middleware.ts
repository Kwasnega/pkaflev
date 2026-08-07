import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    [key: string]: any;
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. Malformed token.' });
    return;
  }

  try {
    const secret = (process.env.JWT_SECRET as string) || 'fallback_secret';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    req.user = { userId: decoded.userId as string };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
    return;
  }
};