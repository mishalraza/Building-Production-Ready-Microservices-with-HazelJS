"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const core_1 = require("@hazeljs/core");
let OrderService = class OrderService {
    async createOrder(orderData, trace) {
        trace.setTag('user.id', orderData.userId);
        trace.setTag('order.amount', orderData.amount);
        try {
            const order = await this.processOrder(orderData);
            trace.setTag('order.id', order.id);
            return order;
        }
        catch (error) {
            trace.setTag('error', true);
            trace.log({ error: error instanceof Error ? error.message : 'Unknown error' });
            throw error;
        }
    }
    async processOrder(orderData) {
        const order = {
            id: Math.random().toString(36).substring(7),
            userId: orderData.userId,
            amount: orderData.amount,
            items: orderData.items,
            status: 'created'
        };
        await new Promise(resolve => setTimeout(resolve, 100));
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, core_1.Injectable)()
], OrderService);
