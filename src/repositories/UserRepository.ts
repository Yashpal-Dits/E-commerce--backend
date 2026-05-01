import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";

export class UserRepository {
  private repository = AppDataSource.getRepository(User);


  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  
  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

 
  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }


  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return await this.findById(id);
  }

  
  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find({
      select: ["id", "first_name", "last_name", "email", "role", "created_at"],
    });
  }

  async emailExists(email: string): Promise<boolean> {
    const count = await this.repository.count({ where: { email } });
    return count > 0;
  }
}

export const userRepository = new UserRepository();