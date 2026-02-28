import UserModel from "../models/user.model.js";

export const createUserService = async ({ email, password }) => {
    
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await UserModel.hashPassword(password);

  const user = await UserModel.create({ email, password: hashedPassword });

  return user;
};

export const loginUserService = async({email, password})=>{
  
    if(!email || !password){
        console.error("Email and password are required");
        throw new Error("Email and password are required");
    }

    const existingUser = await UserModel.findOne({email}).select("+password");

    if(!existingUser){
        console.error("Invalid Credentials");
        throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await existingUser.isPasswordValid(password);

    if(!isPasswordValid){
        console.error("Invalid Credentials");
        throw new Error("Invalid Credentials");
    }

    return existingUser;
}


export const getAllUsersService = async ({userId}) => {
  const users = await UserModel.find({ _id: { $ne: userId } }).select("-password");
  return users;
}