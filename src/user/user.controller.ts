import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { uuid } from 'uuidv4';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  public async createUser(
    @Body() userData: CreateUserDTO,
  ): Promise<{ user: ListUserDTO; message: string }> {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    this.userRepository.save(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name, userEntity.email),
      message: 'User created successfully.',
    };
  }

  @Put('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() newUserData: UpdateUserDTO,
  ): Promise<{ user: ListUserDTO; message: string }> {
    const userToUpdate = await this.userRepository.update(id, newUserData);
    return {
      user: new ListUserDTO(
        userToUpdate.id,
        userToUpdate.name,
        userToUpdate.email,
      ),
      message: 'User updated successfully.',
    };
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string): Promise<any> {
    const userToDelete = await this.userRepository.delete(id);
    return {
      user: new ListUserDTO(
        userToDelete.id,
        userToDelete.name,
        userToDelete.email,
      ),
      message: 'User deleted successfully.',
    };
  }

  @Get()
  public async listUsers(): Promise<ListUserDTO[]> {
    const users = await this.userRepository.list();
    return users.map((user) => new ListUserDTO(user.id, user.name, user.email));
  }
}
