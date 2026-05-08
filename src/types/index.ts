import { Request } from "express";
import { JwtPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: JwtPayload;
  body: any;
}

export interface RegisterRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: "customer" | "seller" |"admin";
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UpdateProfileRequestBody {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface CreateCategoryRequestBody {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequestBody {
  name?: string;
  description?: string;
  // data?: T;
}

export interface ApiResponseData<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthResponseData {
  user: Omit<UserData, "password">;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ProfileResponseData {
  user: Omit<UserData, "password">;
}

export interface CategoryData {
  id: number;
  name: string;
  description?: string;
}

export interface ProductData {
  id: number;
  store_id: number;
  name: string;
  price: number;
  categories_id: number;
  stock: number;
  sku?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
