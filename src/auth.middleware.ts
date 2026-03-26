import { Injectable, Middleware, RequestContext } from '@hazeljs/core';

interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthMiddleware implements Middleware {
  async use(context: RequestContext, next: () => Promise<unknown>): Promise<unknown> {
    const token = context.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('No token provided');
    }
    
    try {
      const decoded = this.verifyToken(token);
      context.user = {
        id: decoded.sub,
        username: decoded.email,
        role: 'user'
      };
      return next();
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private verifyToken(token: string): JwtPayload {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error('Token expired');
    }
    
    return payload as JwtPayload;
  }
}