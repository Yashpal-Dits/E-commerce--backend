import { categoryRepository } from "../repositories/CategoryRepository";
import { ApiError } from "../utils/ApiError";
import { CategoryData } from "../types";
import { Messages } from "../constants/messages";

export class CategoryService {
    // Create a new category
    async createCategory(data: { name: string; description?: string }): Promise<CategoryData>{
       
        const existingCategory = await categoryRepository.findByName(data.name);
        if (existingCategory) {
            throw new ApiError(400, Messages.CATEGORY.ALREADY_EXISTS);
        }
        const category = await categoryRepository.create(data);
        return category;
    }

    // Get all categories
    async getAllCategories() : Promise<CategoryData[]> {
      return  await categoryRepository.findAll();
    }

    // Get a single category by ID
    async getCategoryById(id: number): Promise<CategoryData> {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new ApiError(404, Messages.CATEGORY.NOT_FOUND);
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
        throw new ApiError(400, Messages.CATEGORY.ALREADY_EXISTS);
      }
    }

    const updated = await categoryRepository.update(id, data);
    return updated;
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const deleted = await categoryRepository.delete(id);
    if (!deleted) {
      throw new ApiError(404, Messages.CATEGORY.NOT_FOUND);
    }

    return { message: Messages.CATEGORY.DELETED };
  }
}

export const categoryService = new CategoryService();