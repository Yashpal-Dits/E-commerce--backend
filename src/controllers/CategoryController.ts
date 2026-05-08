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
import {Messages} from "../constants/messages";

export class CategoryController {
  create = asyncHandler(async (req: AuthRequest, res: Response) => {
    const body = req.body as CreateCategoryRequestBody;

    if (!body.name) {
      throw new ApiError(400, Messages.VALIDATION.REQUIRED_FIELD);
    }

    const category = await categoryService.createCategory({
      name: body.name,
      description: body.description,
    });

    return sendResponse<CategoryData>(
      res,
      201,
      Messages.CATEGORY.CREATED,
      category
    );
  });

  getAll = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const categories = await categoryService.getAllCategories();

    return sendResponse<CategoryData[]>(
      res,
      200,
      Messages.CATEGORY.RETRIEVED_ALL,
      categories
    );
  });

  getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = (req as any).numericId;

    const category = await categoryService.getCategoryById(id);

    return sendResponse<CategoryData>(
      res,
      200,
      Messages.CATEGORY.RETRIEVED,
      category
    );
  });

  update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = (req as any).numericId;
    const body = req.body as UpdateCategoryRequestBody;

    if (!body.name && !body.description) {
      throw new ApiError(400, Messages.CATEGORY.AT_LEAST_ONE_FIELD);
    }

    const updatedCategory = await categoryService.updateCategory(id, {
      name: body.name,
      description: body.description,
    });

    if (!updatedCategory) {
      throw new ApiError(404, Messages.CATEGORY.NOT_FOUND);
    }

    return sendResponse<CategoryData>(
      res,
      200,
      Messages.CATEGORY.UPDATED,
      updatedCategory
    );
  });

  delete = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = (req as any).numericId;

    const result = await categoryService.deleteCategory(id);

    return sendResponse(
      res,
      200,
      Messages.CATEGORY.DELETED,
      result
    );
  });
}

export const categoryController = new CategoryController();