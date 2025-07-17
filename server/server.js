import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import issueRouter from "./routes/issueRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();






app.use(cors({
      origin: "https://mern-auth-app-roan.vercel.app",
    //   origin: FRONTEND_URL,
   
      optionsSuccessStatus: 200,
      credentials: true 
    }));

// ✅ Other middleware comes AFTER CORS
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Debugging CORS
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
    next();
});

// Routes
app.get('/', (req, res) => res.send('API is working'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/issue', issueRouter);

app.listen(port, () => console.log(`Server started on PORT : ${port}`));
