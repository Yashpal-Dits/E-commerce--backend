import { userRepository } from "../repositories/UserRepository";
import {  UserRole } from "../entities/User.entity";
import { hashPassword, comparePassword, generateTokens } from "../utils";
import { ApiError } from "../utils/ApiError";
import { UserData, AuthResponseData } from "../types";
import {Messages} from "../constants/messages";

export class UserService {
  async register(data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<AuthResponseData> {
    const emailExists = await userRepository.emailExists(data.email);
    if (emailExists) {
      throw new ApiError(400, Messages.AUTH.EMAIL_ALREADY_REGISTERED);
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

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword as any,
      tokens,
    };
  }

  async login(email: string, password: string): Promise<AuthResponseData> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, Messages.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, Messages.AUTH.INVALID_CREDENTIALS);
    }

    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword as any,
      tokens,
    };
  }

  async getUserById(id: number): Promise<UserData> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new ApiError(404, Messages.AUTH.USER_NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as any;
  }

  async getProfile(userId: number): Promise<UserData> {
    return await this.getUserById(userId);
  }

  async updateProfile(
    userId: number,
    data: {
      first_name?: string;
      last_name?: string;
      email?: string;
    }
  ): Promise<UserData> {
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ApiError(400, Messages.AUTH.EMAIL_ALREADY_IN_USE);
      }
    }

    const updatedUser = await userRepository.update(userId, data);
    if (!updatedUser) {
      throw new ApiError(404, Messages.AUTH.USER_NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as any;
  }

  async getAllUsers(): Promise<UserData[]> {
    const users = await userRepository.findAll();
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as any;
    });
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    const deleted = await userRepository.delete(userId);
    if (!deleted) {
      throw new ApiError(404, Messages.AUTH.USER_NOT_FOUND);
    }
    return { message: "User deleted successfully" };
  }
}

export const userService = new UserService();