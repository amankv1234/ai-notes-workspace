require('dotenv').config();
const axios = require('axios');

const listModels = async () => {
    const API_KEY = process.env.GEMINI_API_KEY;
    const URL = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

    try {
        console.log("🔍 Fetching available models for your API key...");
        const response = await axios.get(URL);
        
        if (response.data.models && response.data.models.length > 0) {
            console.log("✅ Models found! You can use these:");
            response.data.models.forEach(m => {
                console.log(` - ${m.name.replace('models/', '')} (${m.supportedGenerationMethods.join(', ')})`);
            });
        } else {
            console.log("❌ No models found. This key might not have Generative AI enabled.");
        }
    } catch (error) {
        console.error("❌ Error fetching models:", error.response?.data?.error?.message || error.message);
        console.log("\n💡 Solution: Go to https://aistudio.google.com/ and create a 'Google AI Studio' key, not a 'Google Cloud' key.");
    }
};

listModels();
