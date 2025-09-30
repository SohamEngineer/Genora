import express from "express";
import cors from "cors"
import 'dotenv/config';
const app=express();
const PORT= 3500;
import { clerkMiddleware ,requireAuth} from '@clerk/express'
import article from "./routes/aiRoute.js";
import userCreation from "./routes/userRoutes.js";
// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())


// Routes
app.get("/", (req, res) => {
  res.send("Server is running  ");
});

app.use(requireAuth())
app.use("/api/ai",article);
app.use("/api/user",userCreation);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}  `);
})

