import { FastifyInstance } from "fastify";
import { AuthService } from "../services/authService";
import { HttpStatus } from "../enums/HTTPCodes";
import { ApiMessages } from "../enums/ApiMessages";
import { error } from "console";

export default async function authRoutes(fastify: FastifyInstance) {
  const authService = new AuthService();

  fastify.post("/signup", async (request, reply) => {
    const { username, email, phone, password } = request.body as any;
    try {
      const result = await authService.signup(username, email, phone, password);
      reply.code(HttpStatus.OK).send(result);
    } catch (err: any) {
      reply.code(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });

  
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as any;
    console.log(`routes in backend\n email-->${email}, password-->${password}`);
    try {
      const result = await authService.login(email, password);
      if (!result) {
        return reply.code(HttpStatus.UNAUTHORIZED).send({ error: "Invalid Credentials" });
      }
      return reply.send(result);
    } catch (err: any) {
      reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
  });
}