import express from  "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express();
const port = process.env.PORT || 4000

connectDB();

// Configure allowed origins for CORS
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://localhost:5173',
    process.env.FRONTEND_URL
];

// Add any additional frontend URLs from environment variables
if (process.env.ADDITIONAL_FRONTEND_URLS) {
    const additionalUrls = process.env.ADDITIONAL_FRONTEND_URLS.split(',');
    allowedOrigins.push(...additionalUrls);
}

// Filter out undefined values and log the final origins
const finalOrigins = allowedOrigins.filter(Boolean);
console.log('Allowed CORS origins:', finalOrigins);

app.use(express.json())
app.use(cookieParser());

// Add CORS debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);

    next();
});

app.use(cors({
    origin: function (origin, callback) {
        console.log('CORS check for origin:', origin);
        
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) {
            console.log('Allowing request with no origin');
            return callback(null, true);
        }
        
        if (finalOrigins.indexOf(origin) !== -1) {
            console.log('Origin allowed:', origin);
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            console.log('Allowed origins:', finalOrigins);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}))


// API endpoints
app.get('/',(req,res)=> res.send('API is working'))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(port, () => console.log(`Server started on PORT : ${port}`));

