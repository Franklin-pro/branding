import request from 'supertest';
import app from '../index'; // Assuming your Express app is exported from index.ts
import { userController } from '../controller/product.userController';
import VerifyAccess from '../middleware/verifyAccess';
import express,{ Router } from 'express';
import { dataChecker } from '../middleware/dataCheker';
import { validator } from '../middleware/validator';
const router :Router = express.Router()
// describe('User Routes', () => {
//     it('should create a new user', async () => {
//         // Mock request body
//         const requestBody = {
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john@example.com',
//             passWord: 'password',
//             confirmPassword: 'password',
//             role: 'user'
//         };

//         // Mock dataChecker and validator middleware functions
//         const dataChecker = {
//             inputIsEmpty: jest.fn(),
//             EmailExist: jest.fn()
//         };
//         const validator = {
//             userAccount: jest.fn(),
//             InputValidator: jest.fn()
//         };

//         // Mock userController.userCreate function
//         userController.userCreate = jest.fn().mockResolvedValueOnce({});

//         // Send POST request to create a new user
//         const response = await request(app)
//             .post('/api/users')
//             .send(requestBody);

//         // Expect userController.userCreate to be called with correct arguments
//         expect(userController.userCreate).toHaveBeenCalledWith(expect.anything(), expect.anything());

//         // Expect response status to be 201 (created)
//         expect(response.status).toBe(201);
//     });

// });
// export default router
router.post("/",dataChecker.inputIsEmpty,dataChecker.EmailExist,validator.userAccount(),validator.InputValidator,userController.userCreate)
router.get("/",VerifyAccess("admin"), userController.getAllUser);
router.get("/:id", userController.getOneUser);
router.delete("/:id",userController.deleteOneUser)
router.patch("/:id",userController.updateUser)
router.delete("/",VerifyAccess("admin"),userController.deleteAll)
router.post("/login",userController.LOGIN)

 export default router