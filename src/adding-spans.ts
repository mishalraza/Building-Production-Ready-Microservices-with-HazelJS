import { Injectable } from '@hazeljs/core';

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

interface TraceContext {
  setTag(key: string, value: any): void;
  log(data: any): void;
}

@Injectable()
export class OrderService {
  async createOrder(orderData: CreateOrderDto, trace: TraceContext): Promise<Order> {
    trace.setTag('user.id', orderData.userId);
    trace.setTag('order.amount', orderData.amount);

    try {
      const order = await this.processOrder(orderData);
      trace.setTag('order.id', order.id);
      return order;
    } catch (error) {
      trace.setTag('error', true);
      trace.log({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  private async processOrder(orderData: CreateOrderDto): Promise<Order> {
    const order: Order = {
      id: Math.random().toString(36).substring(7),
      userId: orderData.userId,
      amount: orderData.amount,
      items: orderData.items,
      status: 'created'
    };
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return order;
  }
}