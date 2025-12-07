import { FastifyInstance } from "fastify";
import { TaskService } from "../services/taskService";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { HttpStatus } from "../enums/HTTPCodes";
import { ApiMessages } from "../enums/ApiMessages";

const taskService = new TaskService();

export async function taskRoutes(fastify: FastifyInstance) {
  
  fastify.addHook('preHandler', authMiddleware);

  fastify.get("/", async (request: AuthRequest, reply) => {
    try {
      const tasks = await taskService.getTasks(request.userId!);
      reply.send(tasks.map(task => ({
        ...task.toObject(),
        taskId: (task._id as any).toString(),
        createdBy: task.createdBy.toString()
      })));
    } catch (err: any) {
      reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
  });

  fastify.get("/:taskId", async (request: AuthRequest, reply) => {
    const { taskId } = request.params as any;
    
    try {
      const task: any = await taskService.getTaskById(taskId, request.userId!);
      if (!task) {
        reply.code(HttpStatus.NOT_FOUND).send({ error: ApiMessages.TASK_NOT_FOUND });
        return;
      }
      reply.send({
        ...task.toObject(),
        taskId: task._id.toString(),
      });
    } catch (err: any) {
      reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
  });

  fastify.post("/", async (request: AuthRequest, reply) => {
    const taskData = request.body as any;
    
    try {
      const task = await taskService.addTask(request.userId!, taskData);
      reply.code(HttpStatus.CREATED).send({ task });
    } catch (err: any) {
      reply.code(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });

  fastify.put("/:taskId", async (request: AuthRequest, reply) => {
    const { taskId } = request.params as any;
    const updates = request.body as any;
    
    try {
      const updatedTask: any = await taskService.updateTask(taskId, request.userId!, updates);
      if (!updatedTask) {
        reply.code(HttpStatus.NOT_FOUND).send({ error: ApiMessages.TASK_NOT_FOUND });
        return;
      }
      reply.send({
        ...updatedTask,
        taskId: updatedTask._id.toString(),
        createdBy: updatedTask.createdBy.toString()
      });
    } catch (err: any) {
      reply.code(HttpStatus.BAD_REQUEST).send({ error: err.message });
    }
  });

  fastify.patch("/:taskId/delete", async (request: AuthRequest, reply) => {
    const { taskId } = request.params as any;
    
    try {
      const deletedTask = await taskService.deleteTask(taskId, request.userId!);
      if (!deletedTask) {
        reply.code(HttpStatus.NOT_FOUND).send({ error: ApiMessages.TASK_NOT_FOUND });
        return;
      }
      reply.send({ message: "Task deleted successfully" });
    } catch (err: any) {
      reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
  });

  fastify.patch("/:taskId/complete", async (request: AuthRequest, reply) => {
    const { taskId } = request.params as any;
    
    try {
      const completedTask: any = await taskService.markCompleted(taskId, request.userId!);
      if (!completedTask) {
        reply.code(HttpStatus.NOT_FOUND).send({ error: ApiMessages.TASK_NOT_FOUND });
        return;
      }
      reply.send({
        ...completedTask,
        taskId: completedTask._id.toString(),
        createdBy: completedTask.createdBy.toString()
      });
    } catch (err: any) {
      reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
  });
}