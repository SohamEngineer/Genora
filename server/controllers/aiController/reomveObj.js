import cloudinary from "../../config/cloudInary.js";
import sql from "../../config/db.js";
// import axios from "axios";
// import FormData from "form-data";

export const objectRemover = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const { image} = req.file;
    

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
