import { userRepository } from "../repositories/UserRepository";
import {  UserRole } from "../entities/User.entity";
import { hashPassword, comparePassword, generateTokens } from "../utils";
import { ApiError } from "../utils/ApiError";

export class UserService {
  // Register new user
  async register(data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    // Check if email already exists
    const emailExists = await userRepository.emailExists(data.email);
    if (emailExists) {
      throw new ApiError(400, "Email already registered");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await userRepository.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword,
      role: data.role || UserRole.CUSTOMER,
    });

    // Generate tokens
    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  // Login user
  async login(email: string, password: string) {
    // Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Generate tokens
    const tokens = generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  // Get user by ID
  async getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Get user profile (current user)
  async getProfile(userId: number) {
    return await this.getUserById(userId);
  }

  // Update user profile
  async updateProfile(
    userId: number,
    data: {
      first_name?: string;
      last_name?: string;
      email?: string;
    }
  ) {
    // Check if email is being changed
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ApiError(400, "Email already in use");
      }
    }

    // Update user
    const updatedUser = await userRepository.update(userId, data);
    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  // Get all users (admin only)
  async getAllUsers() {
    return await userRepository.findAll();
  }

  // Delete user (admin only)
  async deleteUser(userId: number) {
    const deleted = await userRepository.delete(userId);
    if (!deleted) {
      throw new ApiError(404, "User not found");
    }
    return { message: "User deleted successfully" };
  }
}

// Export singleton instance
export const userService = new UserService();