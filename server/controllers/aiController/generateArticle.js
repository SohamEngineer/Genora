import sql from "../../config/db.js";
import { clerkClient } from "@clerk/express";
import AI from "../../config/aiClient.js";


export const generateArtical=async (req ,res)=>{
    try {
        const {userId}=req.auth();
        const {prompt,length}=req.body;
        const plan =req.plan;
        const free_usage=req.free_usage;

        if(plan !='premium' && free_usage>=10){
            return res.json({
                success:false,
                message:"You can reach your limit"
            })
        }
        // Gemini response
        const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content:prompt,
        },

    ],
    temperature:0.7,
    max_tokens:length
});
const content=response.choices[0].message.content;

//Database
    await sql`INSERT INTO usercreations (userId , prompt , content ,type)
    VALUES(${userId},${prompt},${content},'article')`;

    if(plan !="premium"){
        await clerkClient.users.updateUserMetadata(userId,{
            privateMetadata:{
                free_usage:free_usage+1
            }
        })
    }
    res.json({success:true ,content})
    
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error
        })
    }
}