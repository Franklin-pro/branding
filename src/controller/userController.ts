import { Request, Response } from 'express';
import { USER } from '../model/user';
import { errorMessage } from '../utils/errorMessage';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { successMessage } from '../utils/successMessage';
import { loginMessage } from '../utils/loginSuccess';
import { success } from '../utils/sucess';

class userController {
    public static async userCreate(req : Request,res: Response):Promise<void>{
        const{firstName,lastName,email,passWord,confirmPassword,role} = req.body

        try {
            if(req.body.passWord !== req.body.confirmPassword){
                return errorMessage(res,204,'password and confirmPassword must be match')
            }
            const hashPassword = bcrypt.hashSync(req.body.passWord,10)

            const user = await USER.create({firstName,lastName,email,role,passWord:hashPassword})

            if (user) {
               return success(res,201,`user created`)
           


            } else {
                return errorMessage(res,204,`user not created`)
            }
        } catch (error) {
            console.log(res,204,`error from post`,error)
        }
    }

    public static async getAllUser(req:Request,res:Response):Promise<void>{
    const user = await USER.find();
    if(user){
        return successMessage(res,200,`all ${user.length} user retrived`,user)
    }else if(user===0){
        return errorMessage(res,204,`no user found`)
    }else{
        return errorMessage(res,204,`all user retrived`)
    }
    }

    public static async getOneUser(req:Request,res:Response):Promise<void>{
        const userId = req.params.id
        try {
            const user = await USER.findById(userId)

            if(user){
                return successMessage(res,200,`user retrived`,user)
            }else{
                return errorMessage(res,204,`no user found with ${userId}`)
            }
        } catch (userId) {
            return errorMessage(res,204,'no user ')
        }
    }

    public static async deleteOneUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;

        try {
            const user = await USER.findByIdAndDelete(userId);
            if (user) {
                return successMessage(res, 200, `User deleted`, userId);
            } else {
                return errorMessage(res, 404, `No user found with ID ${userId}`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }

    public static async updateUser(req:Request,res:Response):Promise<void>{
        const userId = req.params.id;

        try {
            const user = await USER.findByIdAndUpdate(userId,req.body,{new:true});
            if (user) {
                return success(res,201,`user updated successfully`)
            } else {
                return errorMessage(res, 404, `No user found with ID ${userId}`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }
    public static async deleteAll(req:Request,res:Response):Promise<void>{
        const user = await USER.deleteMany();
        try {
      
            if (user) {
                return errorMessage(res, 200, `All User Deleted successfully`);
            } else {
                return errorMessage(res, 404, `No user found with ID`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }

    public static async LOGIN(req: Request, res: Response): Promise<void> {
        const { email, passWord } = req.body;
        const secretKey = process.env.SECRET_KEY;

        try {
            if (!secretKey) {
                return errorMessage(res, 500, `Secret key is not defined`);
            }

            const user = await USER.findOne({ email });

            if (!user) {
                return errorMessage(res, 401, `Invalid email or password`);
            }

            const comparePassword = bcrypt.compareSync(passWord, user.passWord);

            if (!comparePassword) {
                return errorMessage(res, 401, `Invalid email or password`);
            }

            const token = jwt.sign({ user: user }, secretKey, { expiresIn: '1d' });

            if (token) {
                return loginMessage(res, 200, `User login successful`, token);
            } else {
                return errorMessage(res, 500, `Failed to generate token`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            return errorMessage(res, 500, `Internal server error`);
        }
    }
}
export { userController }