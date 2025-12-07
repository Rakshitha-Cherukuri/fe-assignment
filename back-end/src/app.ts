import fastify from "fastify";
import cors from "@fastify/cors";
import authRoutes from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { profileRoutes } from "./routes/profileRoutes";
import { connectDB } from "./db/database";

export async function buildApp() {
  const app = fastify({ logger: true });

  // Connect to MongoDB
  await connectDB();

  // Register CORS
  await app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Register routes
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(taskRoutes, { prefix: "/api/tasks" });
  await app.register(profileRoutes, { prefix: "/api/profile" });

  return app;
}