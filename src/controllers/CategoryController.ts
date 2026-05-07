import { Response } from "express";
import { categoryService } from "../services/CategoryService";
import { asyncHandler } from "../utils/asyncHandler";
import { sendResponse } from "../utils/response";
import {
  AuthRequest,
  CategoryData,
  CreateCategoryRequestBody,
  UpdateCategoryRequestBody,
} from "../types";
import { ApiError } from "../utils/ApiError";

export class CategoryController {
  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const body = req.body as CreateCategoryRequestBody;

    if (!body.name) {
      throw new ApiError(400, "Category name is required");
    }

    const category = await categoryService.createCategory({
      name: body.name,
      description: body.description,
    });

    return sendResponse<CategoryData>(
      res,
      201,
      "Category created successfully",
      category
    );
  });

  getAll = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const categories = await categoryService.getAllCategories();

    return sendResponse<CategoryData[]>(
      res,
      200,
      "Categories retrieved successfully",
      categories
    );
  });

  getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = (req as any).numericId;

    const category = await categoryService.getCategoryById(id);

    return sendResponse<CategoryData>(
      res,
      200,
      "Category retrieved successfully",
      category
    );
  });

  update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = (req as any).numericId;
    const body = req.body as UpdateCategoryRequestBody;

    if (!body.name && !body.description) {
      throw new ApiError(400, "At least one field is required");
    }

    const updatedCategory = await categoryService.updateCategory(id, {
      name: body.name,
      description: body.description,
    });

    if (!updatedCategory) {
      throw new ApiError(404, "Category not found");
    }

    return sendResponse<CategoryData>(
      res,
      200,
      "Category updated successfully",
      updatedCategory
    );
  });

  delete = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = (req as any).numericId;

    const result = await categoryService.deleteCategory(id);

    return sendResponse(
      res,
      200,
      result.message
    );
  });
}

export const categoryController = new CategoryController();