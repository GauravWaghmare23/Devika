import mongoose from "mongoose";


let isConnected = false;

async function connect(){

    const mongoUri = process.env.MONGO_URI;

    if(!mongoUri){
    throw new Error("MONGO_URI is not defined");
    }

    if(isConnected){
        return;
    }

    try {
        await mongoose.connect(mongoUri,{
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            maxPoolSize:10
        });
        isConnected = true;
        console.log("Connected to MongoDB");

        mongoose.connection.on("error",(err)=>{
            console.error(`MongoDB connection error: ${err}`);
        })

        mongoose.connection.on("disconnected",()=>{
            console.error("MongoDB connection lost");
            isConnected = false;
        })

        mongoose.connection.on("reconnected",()=>{
            console.log("MongoDB connection reconnected");
            isConnected = true;
        })
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        throw new Error(`Error connecting to MongoDB: ${error}`);
    }
}

process.on("SIGINT",async()=>{
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    }
})

export default connect;