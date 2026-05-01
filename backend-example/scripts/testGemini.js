/**
 * Test Gemini Embedding API
 */

require('dotenv').config();
const axios = require('axios');

async function testGeminiEmbedding() {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  console.log('\n🧪 Testing Gemini Embedding API\n');
  console.log(`API Key: ${apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND'}\n`);

  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY not found in .env file');
    process.exit(1);
  }

  try {
    console.log('📤 Sending test request...');
    
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent',
      {
        model: "models/text-embedding-004",
        content: {
          parts: [{ text: "Hello, this is a test" }]
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        }
      }
    );

    console.log('✅ SUCCESS!');
    console.log(`📊 Embedding dimension: ${response.data.embedding.values.length}`);
    console.log(`📝 First 5 values: [${response.data.embedding.values.slice(0, 5).join(', ')}...]`);
    console.log('\n✨ Gemini embeddings are working! Ready to run: npm run embed\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 404) {
        console.error('\n💡 The embedding model endpoint might not be available.');
        console.error('Trying alternative: embedding-001...\n');
        
        // Try embedding-001
        try {
          const response2 = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent',
            {
              content: {
                parts: [{ text: "Hello, this is a test" }]
              }
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
              }
            }
          );
          
          console.log('✅ SUCCESS with embedding-001!');
          console.log(`📊 Embedding dimension: ${response2.data.embedding.values.length}`);
          console.log('\n⚠️  Update llm-config.js to use embedding-001 instead of text-embedding-004\n');
          
        } catch (error2) {
          console.error('❌ embedding-001 also failed:', error2.message);
          if (error2.response) {
            console.error('Status:', error2.response.status);
            console.error('Data:', JSON.stringify(error2.response.data, null, 2));
          }
        }
      }
    } else {
      console.error('No response from server');
    }
    
    process.exit(1);
  }
}

testGeminiEmbedding();
