"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_client_1 = require("../../user.client");
describe('UserClient', () => {
    let userClient;
    let mockFetch;
    beforeEach(() => {
        // Mock fetch globally
        mockFetch = jest.fn();
        global.fetch = mockFetch;
        userClient = new user_client_1.UserClient();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('findAll', () => {
        it('should return array of users', async () => {
            const mockUsers = [
                { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() },
                { id: '2', name: 'Jane', email: 'jane@example.com', createdAt: new Date() }
            ];
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockUsers
            });
            const users = await userClient.findAll();
            expect(users).toEqual(mockUsers);
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users', expect.objectContaining({ method: 'GET' }));
        });
    });
    describe('findOne', () => {
        it('should return a single user', async () => {
            const mockUser = { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() };
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockUser
            });
            const user = await userClient.findOne('1');
            expect(user).toEqual(mockUser);
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users/1', expect.objectContaining({ method: 'GET' }));
        });
    });
    describe('create', () => {
        it('should create a new user', async () => {
            const createUserDto = { name: 'John', email: 'john@example.com' };
            const mockUser = { id: '1', ...createUserDto, createdAt: new Date() };
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockUser
            });
            const user = await userClient.create(createUserDto);
            expect(user).toEqual(mockUser);
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(createUserDto)
            }));
        });
    });
    describe('update', () => {
        it('should update a user', async () => {
            const updateDto = { name: 'John Updated' };
            const mockUser = { id: '1', name: 'John Updated', email: 'john@example.com', createdAt: new Date() };
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockUser
            });
            const user = await userClient.update('1', updateDto);
            expect(user).toEqual(mockUser);
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users/1', expect.objectContaining({
                method: 'PATCH',
                body: JSON.stringify(updateDto)
            }));
        });
    });
    describe('delete', () => {
        it('should delete a user', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => ({})
            });
            await expect(userClient.delete('1')).resolves.not.toThrow();
            expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users/1', expect.objectContaining({ method: 'DELETE' }));
        });
    });
    describe('error handling', () => {
        it('should retry on failure', async () => {
            mockFetch
                .mockRejectedValueOnce(new Error('Network error'))
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({
                ok: true,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => ({ id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() })
            });
            const user = await userClient.findOne('1');
            expect(user).toBeDefined();
            expect(mockFetch).toHaveBeenCalledTimes(3);
        });
        it('should throw error after max retries', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));
            await expect(userClient.findOne('1')).rejects.toThrow('Network error');
            expect(mockFetch).toHaveBeenCalledTimes(3); // Default retries
        });
    });
});
