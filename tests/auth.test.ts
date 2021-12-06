import * as typeorm from 'typeorm';
import App from "../src/app";
import AuthController from "../src/controllers/auth.controller";
import CreateUserDto from "../src/dtos/user.dto";
import * as request from 'supertest';
// database mock
(typeorm as any).getRepository = jest.fn();
// controller
const authController = new AuthController();
// application
const app = new App([
    authController,
]);

describe('POST /api/auth/signup 은', () => {
    describe('성공시', () => {
        let response;
        const userData: CreateUserDto = {
            email: 'opellong13@gmail.com',
            name: '윤우상',
            password: 'test1234!@',
        };
        (typeorm as any).getRepository.mockReturnValue({
            findOne: () => Promise.resolve(undefined),
            create: () => ({
                ...userData,
                id: 0,
            }),
            save: () => Promise.resolve(),
        });
        beforeAll(async() => {
            response = await request(app.getServer())
            .post(`/api/auth/signup`)
            .send(userData)
        })
        test('201 응답코드로 응답해야 한다.', () => {
            expect(response.status).toBe(201); 
         
        })
    })
})