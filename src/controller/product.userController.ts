import { Request, Response } from 'express';
import { USER } from '../model/product.user';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginMessage } from '../utils/loginSuccess';
class userController{
    public static async createUser(req: Request, res: Response): Promise<void> {
        const { username, email, password,confirmPassword, role } = req.body;
        if (!password) {
            return errorMessage(res, 400, 'Password is required');
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await  USER.create({ username, email, password: hashPassword, role });
        if (user) {
            return successMessage(res, 200, 'User created', user);
        }else {
            return errorMessage(res, 404, 'Failed to create user');
        };
    };
    public static async  getAllUsers(req:Request, res:Response):Promise<void>{
        const user = await  USER.find();
        if (user){
            return successMessage(res, 200, `all users found ${user.length}`, user);
        }else{
            return errorMessage(res, 401, 'users not found');
        };
    };
    public static async  getUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id;
        const user = await  USER.findById(userId);
        if (user){
            return successMessage(res, 200, 'user found', user);
        }else{
            return errorMessage(res, 401, 'user not found');
        }
    }
    public static async  updateUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id;
        const user = await  USER.findByIdAndUpdate(userId, req.body, {new: true});
        if (user){
            return successMessage(res, 200, 'user updated', user);
        }else{
            return errorMessage(res, 401, 'user not updated');
        };
    };
    public static async  deleteUser(req:Request, res:Response):Promise<void>{
        const userId = req.params.id;
        const user = await  USER.findByIdAndDelete(userId);
        if (user){
            return successMessage(res, 200, 'user deleted successfully', user);
        }else{
            return errorMessage(res, 401, 'user not deleted');
        };
    };
    public static async  deleteAllUser(req:Request, res:Response):Promise<void>{
        const user = await  USER.deleteMany()
        if (user){
            return errorMessage(res, 401, 'all users deleted');
        }else{
            return errorMessage(res, 401, 'users not deleted');
        };
    };
    public static async login(req: Request, res: Response): Promise<void> {
        const { email, passWord } = req.body;
        const secretKey = 'mbabazi';
        try {
            if(!secretKey){
                return errorMessage(res, 404, 'secret key not defined');
            }
            const user = await USER.findOne({email});
            if(!user){
                return errorMessage(res, 401, 'Invalid email ');
            }else{
                const comparePassword = bcrypt.compareSync(passWord, user.passWord);
                if(comparePassword){
                    return successMessage(res, 402, 'invalid password', user);
                }else{
                    const token = jwt.sign({user: user}, secretKey, {expiresIn: '300d'})
                    if(token){
                        return loginMessage(res, 201, 'user login successfully', token)
                    }else{
                        return errorMessage(res, 401, 'token not found');
                    }
                }
            }
        }catch (error) {
            console.log(error);
            return errorMessage(res, 500, 'internal server error');
        };
    };
};
export default userController;

