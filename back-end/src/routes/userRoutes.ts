import { FastifyInstance } from "fastify";
import { UserService } from "../services/userService";
import { UserIdParams, UsernameParams, UserResponse, ErrorResponse, EmailParams, UpdateUserBody, SuccessResponse } from "../interfaces/userRouteInterface";
import { HttpStatus } from "../enums/HTTPCodes";
import { ApiMessages } from "../enums/ApiMessages";

export default async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService();

  /**
   * get user by username
   */ 
  fastify.get<{
    Params: UsernameParams;
    Reply: UserResponse | ErrorResponse;
  }>("/name/:username", (req, reply) => {
    const { username } = req.params;
    const user = userService.getUserByName(username);
    if (!user) {
      return reply.status(HttpStatus.NOT_FOUND).send({ error: "User not found" });
    }
    return user;
  });

  /** 
   * get user by email
   */ 
  fastify.get<{
    Params: EmailParams;
    Reply: UserResponse | ErrorResponse;
  }>("/email/:email", (req, reply) => {
    const { email } = req.params;
    const user = userService.getUserByEmail(email);
    if (!user) {
      return reply.status(HttpStatus.NOT_FOUND).send({ error: "User not found" });
    }
    return user;
  });

  /**
   * to update the user
   */
  fastify.put<{
    Params: UserIdParams;
    Body: UpdateUserBody;
    Reply: UserResponse | ErrorResponse;
  }>("/:id", (req, reply) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const updated = userService.updateUser(Number(id), body);
      if (!updated) {
        return reply.status(HttpStatus.NOT_FOUND).send({ error: "User not found" });
      }
      return updated;
    } catch (err: any) {
      return reply.status(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });

  /**
   * to delete the user
   */
  fastify.delete<{
    Params: UserIdParams;
    Reply: SuccessResponse | ErrorResponse;
  }>("/:id", (req, reply) => {
    const { id } = req.params;
    const ok = userService.deleteUser(Number(id));
    if (!ok) {
      return reply.status(HttpStatus.NOT_FOUND).send({ error: "User not found" });
    }
    return { message: "User deleted successfully" };
  });
}