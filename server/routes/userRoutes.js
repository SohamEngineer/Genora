import express from 'express';
import { getLike, getPublishData, getuserCreation } from '../controllers/userController/getuserCreation.js';
import { auth } from '../middlewares/auth.js';
const userCreation=express.Router();

userCreation.get('/getuserCreation',auth,getuserCreation);
userCreation.get('/getuserPublication',auth,getPublishData);
userCreation.post('/getuserLike',auth,getLike);
export default userCreation;