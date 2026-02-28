import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    minLength: [6, "Username must be at least 6 characters long"],
    maxLength: [50, "Username must be at most 50 characters long"],
  },
  password: {
    type: String,
    select: false,
    required:true,
    minLength: [8, "Password must be at least 8 characters long"],
  },
},{
    timestamps: true
});

userSchema.index({email: 1}, {unique: true});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
