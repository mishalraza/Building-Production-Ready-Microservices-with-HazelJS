"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = require("../../order.service");
describe('OrderService', () => {
    let orderService;
    beforeEach(() => {
        orderService = new order_service_1.OrderService();
    });
    describe('findAll', () => {
        it('should return empty array when no orders exist', async () => {
            const orders = await orderService.findAll();
            expect(orders).toEqual([]);
        });
    });
    describe('findOne', () => {
        it('should throw error when order not found', async () => {
            await expect(orderService.findOne('non-existent-id')).rejects.toThrow('Order not found');
        });
    });
    describe('getOrdersByUserId', () => {
        it('should return empty array for user with no orders', async () => {
            const userOrders = await orderService.getOrdersByUserId('non-existent-user');
            expect(userOrders).toEqual([]);
        });
    });
    describe('updateStatus', () => {
        it('should throw error for non-existent order', async () => {
            await expect(orderService.updateStatus('non-existent-id', 'confirmed'))
                .rejects.toThrow('Order not found');
        });
    });
    describe('deleteOrder', () => {
        it('should throw error for non-existent order', async () => {
            await expect(orderService.deleteOrder('non-existent-id'))
                .rejects.toThrow('Order not found');
        });
    });
    describe('getTotalRevenue', () => {
        it('should return 0 when no completed orders exist', async () => {
            const revenue = await orderService.getTotalRevenue();
            expect(revenue).toBe(0);
        });
    });
});
