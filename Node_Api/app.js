import express from "express";
import userRouter from "./routes/user.routes.js"
import { config } from "dotenv";

export const app = express();

config({
    path: './data/config.env'
})

//middlewares
app.use(express.json());

//routes
app.use('/users',userRouter)

app.get("/", (req, res) => {
  res.send("Welcome");
});


