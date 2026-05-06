import { userRepository } from "../repositories/UserRepository";
import {  UserRole } from "../entities/User.entity";
import { hashPassword, comparePassword, generateTokens } from "../utils";
import { ApiError } from "../utils/ApiError";

export class UserService {

  async register(data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    
    const emailExists = await userRepository.emailExists(data.email);
    if (emailExists) {
      throw new ApiError(400, "Email already registered");
    }

    
    const hashedPassword = await hashPassword(data.password);

    
    const user = await userRepository.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword,
      role: data.role || UserRole.CUSTOMER,
    });

   
    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

   
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  
  async login(email: string, password: string) {
    

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

  
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    
    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  
  async getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  
  async getProfile(userId: number) {
    return await this.getUserById(userId);
  }

  async updateProfile(
    userId: number,
    data: {
      first_name?: string;
      last_name?: string;
      email?: string;
    }
  ) {
    
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ApiError(400, "Email already in use");
      }
    }

  
    const updatedUser = await userRepository.update(userId, data);
    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

   
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async getAllUsers() {
    return await userRepository.findAll();
  }

  
  async deleteUser(userId: number) {
    const deleted = await userRepository.delete(userId);
    if (!deleted) {
      throw new ApiError(404, "User not found");
    }
    return { message: "User deleted successfully" };
  }
}


export const userService = new UserService();