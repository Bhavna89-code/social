import express from "express"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/users.js"
import postRouter from "./routes/posts.js"
import likeRouter from "./routes/likes.js"
import commentRouter from "./routes/comments.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express(); 

// Middleware
app.use(express.json()); // Corrected to use lowercase 'express'
app.use(cors()); 
app.use(cookieParser()); 
// Route handlers
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);

app.listen(8800, () => {
    console.log("API Working");
});
