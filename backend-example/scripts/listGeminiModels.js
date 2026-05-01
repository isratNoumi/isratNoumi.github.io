/**
 * List all available Gemini models including embeddings
 */

require('dotenv').config();
const axios = require('axios');

async function listGeminiModels() {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  console.log('\n🔍 Fetching available Gemini models...\n');

  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY not found in .env file');
    process.exit(1);
  }

  try {
    // List all models
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const models = response.data.models;
    
    // Filter embedding models
    const embeddingModels = models.filter(model => 
      model.name.toLowerCase().includes('embedding')
    );

    console.log('📊 ALL EMBEDDING MODELS:\n');
    embeddingModels.forEach(model => {
      console.log(`✅ ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log(`   Description: ${model.description || 'N/A'}`);
      console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
      console.log('');
    });

    console.log('\n📝 GENERATION MODELS (for chat):\n');
    const genModels = models.filter(model => 
      model.name.toLowerCase().includes('gemini') && 
      !model.name.toLowerCase().includes('embedding')
    );
    
    genModels.slice(0, 5).forEach(model => {
      console.log(`✅ ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log('');
    });

    console.log('\n💡 To use a model, extract the name after "models/"');
    console.log('   Example: "models/embedding-001" → use "embedding-001"\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

listGeminiModels();
