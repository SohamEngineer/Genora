import sql from "../../config/db.js";
import axios from "axios";
import FormData from "form-data";
import cloudinary from "../../config/cloudInary.js";

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
        const plan=req.plan;
    if (plan != 'subscription') {
      return res.status(403).json({
        success: false,
        message: "Upgrade to a subscription to use this feature",
      });
    }
    // ClipDrop API request
    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert binary → base64 Data URI
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const dataUri = `data:image/png;base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: publish ? "ai-images/public" : "ai-images/private",
      resource_type: "image",
    });

    const imageUrl = uploadResponse.secure_url;

    // Save to database
    await sql`
      INSERT INTO usercreations (userId, prompt, content, type,publish)
      VALUES (${userId}, ${prompt}, ${imageUrl}, 'ai-image',${publish ?? false})
    `;

    res.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
