const axios = require('axios');

/**
 * Generates AI insights including summary, action items, and suggested title.
 * Uses Google Gemini API with fallback models.
 */
const generateFullAIInsights = async (content) => {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    // Updated model list based on available models in your account (2.0 and 2.5 versions)
    const models = [
        "gemini-2.0-flash", 
        "gemini-2.0-flash-lite", 
        "gemini-2.0-flash-lite-001", 
        "gemini-2.5-flash-lite", 
        "gemini-2.5-pro"
    ];
    
    // Improved prompt for structured JSON response
    const prompt = `
        You are an elite productivity assistant. Analyze the following note content and provide:
        1. summary: A sharp, professional summary (max 150 characters).
        2. action_items: An array of 3-5 clear, actionable next steps.
        3. suggested_title: A compelling, creative title for this note.

        Note Content: "${content}"

        RESPONSE FORMAT:
        Return ONLY a JSON object. No markdown, no preamble.
        {
            "summary": "...",
            "action_items": ["...", "..."],
            "suggested_title": "..."
        }
    `;

    for (const model of models) {
        const URL = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;
        try {
            console.log(`📡 AI Magic: Trying ${model}...`);
            const response = await axios.post(URL, {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            }, {
                timeout: 30000 // 30 second timeout for complex models
            });
            
            if (response.data && response.data.candidates && response.data.candidates[0].content.parts[0].text) {
                const text = response.data.candidates[0].content.parts[0].text;
                
                // Robust JSON extraction (handles markdown blocks if Gemini ignores instructions)
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    try {
                        const parsedData = JSON.parse(jsonMatch[0]);
                        
                        // Basic validation
                        if (parsedData.summary && Array.isArray(parsedData.action_items)) {
                            console.log(`✅ AI Success: Insights generated via ${model}`);
                            return {
                                summary: parsedData.summary,
                                action_items: parsedData.action_items,
                                suggested_title: parsedData.suggested_title || "Untitled Insight"
                            };
                        }
                    } catch (parseError) {
                        console.error(`❌ JSON Parse Error (${model}):`, parseError.message);
                    }
                } else {
                    console.warn(`⚠️ No JSON structure found in ${model} response.`);
                }
            }
        } catch (error) {
            const status = error.response?.status;
            const errorData = error.response?.data;
            
            if (status === 429) {
                console.warn(`🚫 Quota hit for ${model}. Trying next model...`);
            } else if (status === 404) {
                console.warn(`❓ Model ${model} not found or unavailable.`);
            } else {
                console.warn(`⚠️ ${model} Error:`, error.message);
            }
            continue;
        }
    }

    // --- SMART FALLBACK (Mock Mode) ---
    // This ensures the UI doesn't break if API keys are invalid or quota is fully exhausted
    console.log("🛠️ All AI models failed. Using intelligent fallback...");
    return {
        summary: "Your note is safe. We're currently experiencing high demand on our AI servers, but we've captured your thoughts perfectly.",
        action_items: [
            "Review your note for any immediate tasks",
            "Try generating AI insights again in a few minutes",
            "Check your internet connection or API settings"
        ],
        suggested_title: "Thought Captured"
    };
};

module.exports = { generateFullAIInsights };

