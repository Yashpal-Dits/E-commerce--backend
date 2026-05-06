import { categoryRepository } from "../repositories/CategoryRepository";
import { ApiError } from "../utils/ApiError";

export class CategoryService {
    // Create a new category
    async createCategory(data: { name: string; description?: string }) {
       
        const existingCategory = await categoryRepository.findByName(data.name);
        if (existingCategory) {
            throw new ApiError(400, "A category with this name already exists");
        }
        return await categoryRepository.create(data);
    }

    // Get all categories
    async getAllCategories() {
        return await categoryRepository.findAll();
    }

    // Get a single category by ID
    async getCategoryById(id: number) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
        return category;
    }

    // Update a category
    async updateCategory(id: number, data: { name?: string; description?: string }) {
       
        await this.getCategoryById(id);

  
        if (data.name) {
            const existingCategory = await categoryRepository.findByName(data.name);
            if (existingCategory && existingCategory.id !== id) {
                throw new ApiError(400, "A category with this name already exists");
            }
        }

        return await categoryRepository.update(id, data);
    }

    // Delete a category
    async deleteCategory(id: number) {
        const deleted = await categoryRepository.delete(id);
        if (!deleted) {
            throw new ApiError(404, "Category not found");
        }
        return { message: "Category deleted successfully" };
    }
}


export const categoryService = new CategoryService();