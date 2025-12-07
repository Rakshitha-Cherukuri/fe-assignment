import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

if (!JWT_SECRET){
  throw new Error("JWT secret not set");
}

export interface AuthRequest extends FastifyRequest {
  userId?: string;
}

export async function authMiddleware(request: AuthRequest, reply: FastifyReply) {
  try {

    
    const authHeader = request.headers.authorization;
    
    // checking if authHeader is existig and valid or not
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ error: "No token provided" });
    }

    // extracting token from the header by removing "Bearer"
    const token = authHeader.substring(7); 

    // verifying token 
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if ( !user ) {
      return reply.code(401).send({ error : "User not found"});
    }
    request.userId = decoded.userId;
    
  } catch (error) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
}