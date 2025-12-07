import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { User } from "../models/user";
import { Task } from "../models/task";

const USERS_FILE = path.join(__dirname, '../data/users.json');
const TASKS_FILE = path.join(__dirname, '../data/tasks.json');


export function readUsers(): User[] {
  const data = readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
}

export function writeUsers(users: User[]) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export function readTasks(): Task[] {
  const data = readFileSync(TASKS_FILE, "utf-8");
  return JSON.parse(data);
}

export function writeTasks(tasks: Task[]) {
  writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}
