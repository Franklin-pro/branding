import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  email: string;
  password?: string;
  role?:string | undefined
}

const userSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
});

const USER= mongoose.model<IUser>('USER', userSchema);

export { userSchema, USER };
