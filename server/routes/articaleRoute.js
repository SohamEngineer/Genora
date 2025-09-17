
import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArtical } from "../controllers/aiController/generateArticle.js";

const article=express.Router();
article.post('/generate-article',auth,generateArtical);
 
export default article;