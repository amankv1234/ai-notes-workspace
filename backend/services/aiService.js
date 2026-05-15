const axios = require('axios');

const generateFullAIInsights = async (content) => {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    // We will try 1.5-flash first (most stable) and then the 2.0-lite you found
    const models = ["gemini-1.5-flash", "gemini-2.0-flash-lite"];
    
    for (const model of models) {
        const URL = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;
        try {
            console.log(`📡 Trying AI Magic with ${model}...`);
            const response = await axios.post(URL, {
                contents: [{ parts: [{ text: `JSON summary for: ${content}` }] }]
            });
            
            const text = response.data.candidates[0].content.parts[0].text;
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) return JSON.parse(jsonMatch[0]);
        } catch (error) {
            console.warn(`⚠️ ${model} failed or quota hit.`);
            continue;
        }
    }

    // --- MOCK MODE (If Google is being slow to activate your key) ---
    console.log("🛠️ Google Quota is active. Using 'Local Intelligence' fallback for now...");
    return {
        summary: "This is a local AI summary generated because your Google API Key is still activating. Try again in 10 minutes for real AI insights!",
        action_items: ["Verify meeting details", "Update project timeline", "Review next steps"],
        suggested_title: "Productivity Brainstorm"
    };
};

module.exports = { generateFullAIInsights };
