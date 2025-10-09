import sql from "../../config/db.js";

export const getuserCreation = async (req, res) => {
  try {
    const userId =  req.auth?.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }  
    
    const creations = await sql`
      SELECT * FROM usercreations WHERE userid = ${userId} ORDER BY created_at DESC
    `;
    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPublishData = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM usercreations WHERE publish = true ORDER BY created_at DESC
    `;
    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getLike = async (req, res) => {
  try {
    const {userId}=req.auth();
    const {id}=req.body;
    const [creation]=await sql `SELECT *FROM usercreations WHERE id=${id}`
    if(!creation){
      return res.json({success:false, message:"Creation not found"})
    }
    const currentLikes=creation.likes;
    const userIdStr=userId.toString();
    let updateLikes;
    let message;
    if(currentLikes.includes(userIdStr)){
      updateLikes=currentLikes.filter((user)=>user !==userIdStr);
      message='Creation Unliked'
    }
    else{
      updateLikes=[...currentLikes,userIdStr]
      message='Creation Liked'
    }

    const formattedArray=`{${updateLikes.json(',')}}`;
    await sql `UPDATE usercreation SET likes=${formattedArray}::text[] WHERE id=${id}`

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



