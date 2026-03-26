import { Controller } from '@hazeljs/core';
import { UserService } from './user.service';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface CreateUserResponse {
  user: User;
}

interface GetUserRequest {
  id: string;
}

interface GetUserResponse {
  user: User;
}

interface ListUsersRequest {
  page?: number;
  limit?: number;
}

interface ListUsersResponse {
  users: User[];
  total: number;
}

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

interface UpdateUserResponse {
  user: User;
}

interface DeleteUserRequest {
  id: string;
}

interface DeleteUserResponse {
  success: boolean;
}

@Controller('grpc')
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userService.create(request);
    return { user };
  }

  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userService.findOne(request.id);
    return { user };
  }

  async listUsers(request: ListUsersRequest): Promise<ListUsersResponse> {
    const users = await this.userService.findAll();
    return { 
      users, 
      total: users.length 
    };
  }

  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.userService.findOne(request.id);
    
    if (request.name) {
      user.name = request.name;
    }
    
    if (request.email) {
      user.email = request.email;
    }
    
    return { user };
  }

  async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    try {
      await this.userService.findOne(request.id);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}