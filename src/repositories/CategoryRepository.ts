import { AppDataSource } from "../config/data-source";
import { Category } from "../entities/Category.entity";

 
export class CategoryRepository {
    private repository = AppDataSource.getRepository(Category);

    // Find category by it's ID

    async findById(id: number): Promise<Category | null> {
        return await this.repository.findOne({ where : {id}});
    }

    // Find a category by it's  name 
  async findByName(name : string) : Promise<Category | null > {
    return await this.repository.findOne({where : {name}});
  }

  // Get all categories

  async findAll(): Promise<Category[] > {
    return await this.repository.find();
  }

  // create a category
  async create(categoryData: {name: string, description?: string}) : Promise<Category> {
     const category = this.repository.create(categoryData);
      return await this.repository.save(category);
  }

  //Update an existing repository
  async update(id : number, categoryData: Partial<Category>): Promise<Category | null> {
  await this.repository.update(id, categoryData);
  return this.findById(id);
  }

  // Delete repository

  async delete(id: number): Promise<boolean> {
const result = await this.repository.delete(id);
return result.affected ? result.affected > 0 : false;
  }

}

export const categoryRepository = new CategoryRepository();