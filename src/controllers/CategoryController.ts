import { categoryRepository } from "../repositories/CategoryRepository";
import { ApiError } from "../utils/ApiError";
import { CategoryData } from "../types";

export class CategoryService {
  async createCategory(data: {
    name: string;
    description?: string;
  }): Promise<CategoryData> {
    const existingCategory = await categoryRepository.findByName(data.name);
    if (existingCategory) {
      throw new ApiError(400, "A category with this name already exists");
    }

    const category = await categoryRepository.create(data);
    return category;
  }

  async getAllCategories(): Promise<CategoryData[]> {
    return await categoryRepository.findAll();
  }

  async getCategoryById(id: number): Promise<CategoryData> {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new ApiError(404, "Category not found ");
    }

    return category;
  }

  async updateCategory(
    id: number,
    data: {
      name?: string;
      description?: string;
    }
  ): Promise<CategoryData | null> {
    await this.getCategoryById(id);

    if (data.name) {
      const existingCategory = await categoryRepository.findByName(data.name);
      if (existingCategory && existingCategory.id !== id) {
        throw new ApiError(400, "A category with this name already exists");
      }
    }

    const updated = await categoryRepository.update(id, data);
    return updated;
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const deleted = await categoryRepository.delete(id);
    if (!deleted) {
      throw new ApiError(404, "Category not found");
    }

    return { message: "Category deleted successfully" };
  }
}

export const categoryService = new CategoryService();