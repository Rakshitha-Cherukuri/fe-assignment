import { readUsers, writeUsers } from "../db/fileDB";
import { User } from "../models/user";
import { TaskService } from "./taskService";

export class UserService {
  // /**
  //  * to create new user profile in the db
  //  * @param userName 
  //  * @param email 
  //  * @param phoneNumber 
  //  * @param password 
  //  * @returns 
  //  */
  // async createUser (userName : string, email : string, phoneNumber : string, password : string){
  //     const users = readUsers();

  //     if (!userName || userName.trim() === "") {
  //       throw new Error("User Name is required");
  //     }

  //     if (!email || email.trim() === "" || !email.includes("@")) {
  //       throw new Error("email is required");
  //     }

  //     if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
  //       throw new Error("Phone number is not valid");
  //     }

  //     const exists = users.find( (u: User) => u.email === email || u.phoneNumber === phoneNumber);
  //     if (exists) {
  //       throw new Error("User already exists with this email or phone number");
  //     }
        
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     const newUser: User = {
  //       userId: users[users.length - 1].userId + 1,
  //       username : userName,
  //       email : email,
  //       phoneNumber : phoneNumber,
  //       passwordHash : hashedPassword 
  //     };

  //     users.push(newUser);
  //     writeUsers(users);

  //     return newUser;
  // }

  /**
   * to get user details based on user name
   */
  getUserByName(userName: string): User | null{
    const users = readUsers();
    return users.find((u: User) => u.username === userName) || null;
  }

  /**
   * to get user details based on user email
   */
  getUserByEmail (email: string): User | null{
    const users = readUsers();
    return users.find((u: User) => u.email=== email) || null;
  }

  /**
   * to update user details
   */
  updateUser (userId: number, updated: Partial<Omit <User, "userId">>): User | null{
    const users = readUsers();
    const index = users.findIndex((u: User) => u.userId === userId);

    if (index === -1) {
      return null;
    }
    // validating the updated values
    if (updated.username !== undefined && updated.username.trim() === "") {
      throw new Error("Title cannot be empty");
    }

    if (updated.email !== undefined && updated.email.trim() === "") {
      throw new Error("Title cannot be empty");
    }

    if (updated.phoneNumber !== undefined && updated.phoneNumber.trim() === "") {
      throw new Error("Title cannot be empty");
    }

    users[index] = { ...users[index], ...updated };
    writeUsers(users);
    return users[index];
  }

  // /**
  //  * Delete a user by ID
  //  */
  // deleteUser (userId: number): boolean {
  //   const users = readUsers();
  //   const userIndex = users.findIndex((u: User) => u.userId === userId) || -1;
  //   if (userIndex === -1) {
  //     return false;
  //   }
  //   else {
  //     const service = new TaskService();
  //     service.deleteTasks(userId);
  //     users.splice(userIndex, 1);
  //   }
  //   return true;
  // }
}