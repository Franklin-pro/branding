import { Request,Response } from "express";
import {Comment} from "../model/comment";
import { success } from "../utils/sucess";
import { successMessage } from "../utils/successMessage";


class commentController{
public static async addComment(req:Request,res:Response):Promise<void>{

    const comment = await Comment.create(req.body)
    if(comment){
        return successMessage(res,200,`comment added`,comment)
    }
}

public static async Comments(req:Request,res:Response):Promise<void>{

    const comment = await Comment.find()
    if(comment){
        return successMessage(res,200,`comment added`,comment)
    }
}
}
export default commentController