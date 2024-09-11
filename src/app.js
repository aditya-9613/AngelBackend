import cors from "cors";
import express from "express";


const app = express();

app.use(cors({
    origin:'*',
    credentials:true
}));

app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/user", userRouter)

export { app }