import sql from "../../config/db.js";
import cloudinary from "../../config/cloudInary.js";

export const bgRemover = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan=req.plan;

    if(plan !='subscription'){
      return res.status(403).json({
        success: false,
        message: "Upgrade to a subscription to use this feature",
      });
    }
    //uplode cloudnary
    const{secure_url} = await cloudinary.uploader.upload(image.path,{
        transformation:[
            {
                effect:'background_removal',
                background_removal:'remove_the_background'
            }
        ]
    });

    // Save to database
    await sql`
      INSERT INTO usercreations (userId, prompt, content, type)
      VALUES (${userId},'Remove background from image', ${secure_url}, 'bg-remover')`;
    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
