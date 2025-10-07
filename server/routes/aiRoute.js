
import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArtical } from "../controllers/aiController/generateArticle.js";
import { generateBlog } from "../controllers/aiController/generateBlog.js";
import { generateImage } from "../controllers/aiController/generateImage.js";
import { upload } from "../config/multer.js";
import { bgRemover } from "../controllers/aiController/bgRemover.js";
import { resumeReview } from "../controllers/aiController/resumeReview.js";
import { objectRemover } from "../controllers/aiController/reomveObj.js";

const article=express.Router();
article.post('/generate-article',auth,generateArtical);
article.post('/generate-blog',auth,generateBlog);
article.post('/generate-image',auth,generateImage);
article.post('/remove-image-background',upload.single('image'),auth,bgRemover);
article.post('/remove-image-object',upload.single('image'),auth,objectRemover);
article.post('/resume-review',upload.single('resume'),auth,resumeReview);
 
export default article;