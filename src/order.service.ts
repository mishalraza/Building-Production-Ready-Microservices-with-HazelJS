import { Injectable } from '@hazeljs/core';
import { OrderService as OrderServiceBase } from './adding-spans';

interface CreateOrderDto {
  userId: string;
  amount: number;
  items: any[];
}

interface Order {
  id: string;
  userId: string;
  amount: number;
  items: any[];
  status: string;
}

@Injectable()
export class OrderService extends OrderServiceBase {
  private orders: Order[] = [];

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findOne(id: string): Promise<Order> {
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return order;
  }

  async deleteOrder(id: string): Promise<void> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    this.orders.splice(index, 1);
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter(order => order.userId === userId);
  }

  async getTotalRevenue(): Promise<number> {
    return this.orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.amount, 0);
  }
}