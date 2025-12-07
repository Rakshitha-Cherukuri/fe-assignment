import { FastifyInstance } from "fastify";
import { ProfileService } from "../services/profileService";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { HttpStatus } from "../enums/HTTPCodes";
import { ApiMessages } from "../enums/ApiMessages";

const profileService = new ProfileService();

export async function profileRoutes(fastify: FastifyInstance) {
  
  // All profile routes require authentication
  fastify.addHook('preHandler', authMiddleware);
  
  fastify.post("/", async (request: AuthRequest, reply) => {
    const { avatar } = request.body as any;
    
    try {
      const profile = await profileService.createProfile(request.userId!, avatar);
      reply.code(HttpStatus.OK).send(profile);
    } catch (err: any) {
      reply.code(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });

  fastify.get("/", async (request: AuthRequest, reply) => {
    try {
      const profile = await profileService.getProfileByUserId(request.userId!);
      return reply.send(profile);
    } catch (err: any) {
      reply.code(HttpStatus.NOT_FOUND).send({ error: err.message });
    }
  });

  fastify.put("/", async (request: AuthRequest, reply) => {
    const { avatar } = request.body as any;
    
    try {
      const profile = await profileService.updateProfile(request.userId!, avatar);
      return profile;
    } catch (err: any) {
      reply.code(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });

  fastify.delete("/", async (request: AuthRequest, reply) => {
    try {
      await profileService.deleteProfile(request.userId!);
      return { message: "Profile deleted" };
    } catch (err: any) {
      reply.code(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });
}