import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));


app.use("/users",userRoutes);
app.use("/",(req,res)=>{
    res.send("hello world");
})

export default app;