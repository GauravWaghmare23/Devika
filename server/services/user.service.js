import UserModel from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
    
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
