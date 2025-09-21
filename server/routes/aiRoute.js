
import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArtical } from "../controllers/aiController/generateArticle.js";
import { generateBlog } from "../controllers/aiController/generateBlog.js";
import { generateImage } from "../controllers/aiController/generateImage.js";

const article=express.Router();
article.post('/generate-article',auth,generateArtical);
article.post('/generate-blog',auth,generateBlog);
article.post('/generate-image',auth,generateImage);
 
export default article;