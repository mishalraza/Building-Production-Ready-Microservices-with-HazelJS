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
const adding_spans_1 = require("./adding-spans");
let OrderService = class OrderService extends adding_spans_1.OrderService {
    constructor() {
        super(...arguments);
        this.orders = [];
    }
    async findAll() {
        return this.orders;
    }
    async findOne(id) {
        const order = this.orders.find(o => o.id === id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
    async updateStatus(id, status) {
        const order = await this.findOne(id);
        order.status = status;
        return order;
    }
    async deleteOrder(id) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) {
            throw new Error('Order not found');
        }
        this.orders.splice(index, 1);
    }
    async getOrdersByUserId(userId) {
        return this.orders.filter(order => order.userId === userId);
    }
    async getTotalRevenue() {
        return this.orders
            .filter(order => order.status === 'completed')
            .reduce((total, order) => total + order.amount, 0);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, core_1.Injectable)()
], OrderService);
