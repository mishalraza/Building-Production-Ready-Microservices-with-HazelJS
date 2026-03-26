"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../../user.service");
describe('UserService', () => {
    let userService;
    beforeEach(() => {
        userService = new user_service_1.UserService();
    });
    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto = {
                name: 'John Doe',
                email: 'john@example.com'
            };
            const user = await userService.create(createUserDto);
            expect(user).toBeDefined();
            expect(user.id).toBeDefined();
            expect(user.name).toBe(createUserDto.name);
            expect(user.email).toBe(createUserDto.email);
            expect(user.createdAt).toBeInstanceOf(Date);
        });
        it('should create users with unique IDs', async () => {
            const createUserDto = {
                name: 'Jane Doe',
                email: 'jane@example.com'
            };
            const user1 = await userService.create(createUserDto);
            const user2 = await userService.create({
                ...createUserDto,
                email: 'jane2@example.com'
            });
            expect(user1.id).not.toBe(user2.id);
        });
    });
    describe('findAll', () => {
        it('should return empty array when no users exist', async () => {
            const users = await userService.findAll();
            expect(users).toEqual([]);
        });
        it('should return all users', async () => {
            await userService.create({ name: 'User 1', email: 'user1@example.com' });
            await userService.create({ name: 'User 2', email: 'user2@example.com' });
            const users = await userService.findAll();
            expect(users).toHaveLength(2);
        });
    });
    describe('findOne', () => {
        it('should return user when found', async () => {
            const createUserDto = { name: 'John Doe', email: 'john@example.com' };
            const createdUser = await userService.create(createUserDto);
            const user = await userService.findOne(createdUser.id);
            expect(user).toEqual(createdUser);
        });
        it('should throw error when user not found', async () => {
            await expect(userService.findOne('non-existent-id')).rejects.toThrow('User not found');
        });
    });
});
