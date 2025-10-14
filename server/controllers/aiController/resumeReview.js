import sql from "../../config/db.js";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
import AI from "../../config/aiClient.js";

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan=req.plan;
    if (!resume) {
      return res.status(400).json({ success: false, message: "No resume file uploaded." });
    }
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }
    if(plan !='subscription'){
      return res.status(403).json({
        success: false,
        message: "Upgrade to a subscription to use this feature",
      });
    }
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `
      You are an expert career coach and hiring manager. Review the following resume thoroughly and provide structured, detailed feedback. Break your response into clear sections covering:

      1. Overall Impression – Is the resume professional, clear, and easy to read?
      2. Strengths – What stands out as the candidate’s biggest strengths?
      3. Weaknesses / Areas to Improve – Are there issues with formatting, grammar, structure, or content?
      4. Relevance – Does the experience align with typical roles the candidate might target?
      5. ATS (Applicant Tracking System) Compatibility – Is it optimized with keywords, formatting, and structure?
      6. Actionable Suggestions – Specific improvements (phrasing, quantifying achievements, restructuring, etc.).

      Content:\n\n ${pdfData.text}
`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO usercreations (userId, prompt, content, type)
      VALUES (${userId}, 'Review the resume', ${content}, 'review-resume')`;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Error reviewing resume:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
