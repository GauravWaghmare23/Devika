import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connect from "./config/dbConnect.js";

connect();

const server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});