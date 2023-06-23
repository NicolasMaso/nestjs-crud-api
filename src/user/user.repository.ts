import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  public async save(user: UserEntity): Promise<void> {
    this.users.push(user);
  }

  public async update(
    id: string,
    newUserData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const userToUpdate = this.users.find((user: UserEntity) => user.id === id);
    if (!userToUpdate) throw new Error('User not found');
    Object.entries(newUserData).forEach(([key, value]) => {
      if (key === 'id') return;
      userToUpdate[key] = value;
    });
    return userToUpdate;
  }

  public async delete(id: string): Promise<UserEntity> {
    const userToDelete = this.users.find((user: UserEntity) => user.id === id);
    if (!userToDelete) throw new Error('User not found');
    this.users = this.users.filter((user: UserEntity) => user.id !== id);
    return userToDelete;
  }

  public async list(): Promise<UserEntity[]> {
    return this.users;
  }

  public async emailAlreadyExists(email: string): Promise<boolean> {
    return this.users.findIndex((user) => user.email === email) !== -1;
  }
}
