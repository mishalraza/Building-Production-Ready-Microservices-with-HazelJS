import { Injectable } from '@hazeljs/core';

interface CreateUserDto {
  name: string;
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

@Injectable()
export class UserService {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name: createUserDto.name,
      email: createUserDto.email,
      createdAt: new Date()
    };
    
    this.users.push(user);
    return user;
  }
}
