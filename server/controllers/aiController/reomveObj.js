import cloudinary from "../../config/cloudInary.js";
import sql from "../../config/db.js";
// import axios from "axios";
// import FormData from "form-data";

export const objectRemover = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const  image = req.file;
        const plan=req.plan;
     if (!image) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }  

     if (!object) {
      return res.status(400).json({ success: false, message: "Object description required" });
    }
    if(plan !='subscription'){
      return res.status(403).json({
        success: false,
        message: "Upgrade to a subscription to use this feature",
      });
    }

    // Upload to Cloudinary
    const{public_id} = await cloudinary.uploader.upload(image.path);
    const imageUrl=cloudinary.url(public_id,{
        transformation:[{effect:`gen_remove:${object}`}],
        resource_type:'image'
    })

    // Save to database
    await sql`
      INSERT INTO usercreations (userId, prompt, content, type)
      VALUES (${userId},${`Removed ${object} from image`}, ${imageUrl}, 'remove_obj')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
