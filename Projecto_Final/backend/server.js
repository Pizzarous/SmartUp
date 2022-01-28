// import "module-alias/register.js";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import { router } from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
const port = process.env.PORT ?? 3021
const app = express();
app.use(express.json());
dotenv.config();

const connect = async () => {
    await connectDB();
}
connect();

app.use('/api/users', router)


app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started in http://localhost:${port}`))