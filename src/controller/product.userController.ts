import { Request, Response } from 'express';
import { USER, IUser } from '../model/product.user';
import { successMessage } from '../utils/successMessage';
import { errorMessage } from '../utils/errorMessage';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { loginMessage } from '../utils/loginSuccess';
class userController{
    public static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email, password, confirmPassword, role } = req.body;
            console.log('Request body:', req.body); // Log the entire request body to inspect the data being received
    
            if (!password) {
                return errorMessage(res, 400, 'Password is required');
            }
    
            if (!userName) {
                return errorMessage(res, 400, 'Username is required');
            }
    
            const existingUserWithEmail = await USER.findOne({ email });
            if (existingUserWithEmail) {
                return errorMessage(res, 400, 'User with this email already exists');
            }
    
            const existingUserWithUsername = await USER.findOne({ userName });
            if (existingUserWithUsername) {
                return errorMessage(res, 400, 'Username is already taken');
            }
    
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = await USER.create({ userName, email, password: hashPassword, role });
    
            if (user) {
                return successMessage(res, 200, 'User created', user);
            } else {
                return errorMessage(res, 404, 'Failed to create user');
            }
        } catch (error) {
            console.error('Error during user creation:', error);
            return errorMessage(res, 500, 'Internal Server Error');
        }
    }
    
    
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
    public static async LOGIN(req: Request, res: Response): Promise<Response> {
        try {
          const { email, password } = req.body;
          const authUser: IUser | null = await USER.findOne({ email });
          if (!authUser) {
            return res.status(404).json({ error: 'User not found' });
          }
          if (authUser.password) {
            const passwordMatch = await compare(password, authUser.password);
            if (!passwordMatch) {
              return res.status(401).json({ error: 'Incorrect password' });
            }
            const token = jwt.sign({ userId: authUser._id, email: authUser.email, role: authUser.role }, 'franklin');
            return res.status(200).json({ status:"success", user: { _id: authUser._id, userName: authUser.userName, email: authUser.email, role:authUser.role}, token });
          }
          else {
              return res.status(500).json({ status:"fail", error: 'User password not available' });
          }
      }
      catch (error) {
          console.error('Error during user login:', error);
          return res.status(500).json({ status:"error", error: 'Internal Server Error' });
      }
      }
};
export default userController;

