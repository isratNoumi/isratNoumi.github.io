/**
 * RAG Backend Implementation with Vectra Vector Database
 * 
 * This backend implements RAG functionality using:
 * - Vectra for local vector storage (pure JavaScript, no build tools needed)
 * - Gemini/OpenAI for embeddings and response generation
 * - Express.js for the API server
 * 
 * Benefits of Vectra:
 * - Pure JavaScript, no native compilation required
 * - Works on Windows without Visual Studio Build Tools
 * - Local storage, no cloud dependencies
 * - Free and open-source
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { LocalIndex } = require('vectra');
const LLMProvider = require('./llm-config');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize LLM Provider (supports OpenAI, Ollama, Gemini, etc.)
const llmProvider = new LLMProvider();

// Vectra index storage
let vectraIndex;
const INDEX_PATH = path.join(__dirname, 'data', 'vectra_index');

// Initialize Vectra
async function initializeVectra() {
  try {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(INDEX_PATH)) {
      fs.mkdirSync(INDEX_PATH, { recursive: true });
    }

    // Initialize Vectra index
    vectraIndex = new LocalIndex(INDEX_PATH);
    
    // Check if index exists and has items
    if (await vectraIndex.isIndexCreated()) {
      const itemCount = await vectraIndex.listItems();
      console.log(`✅ Vectra index loaded with ${itemCount.length} items`);
    } else {
      console.log('⚠️  No Vectra index found. Please run: npm run embed');
      console.log('   The chatbot will use fallback keyword search until embeddings are created.');
    }
  } catch (error) {
    console.error('Error initializing Vectra:', error);
    console.log('⚠️  Chatbot will use fallback keyword search mode.');
  }
}

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Create embeddings for text
 */
async function createEmbedding(text) {
  try {
    return await llmProvider.createEmbedding(text);
  } catch (error) {
    console.error('Error creating embedding:', error.message);
    throw error;
  }
}

/**
 * Retrieve relevant context from Vectra
 */
async function retrieveRelevantContext(query, topK = 3) {
  try {
    if (!vectraIndex || !(await vectraIndex.isIndexCreated())) {
      return null;
    }

    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query);

    // Search for similar vectors
    const results = await vectraIndex.queryItems(queryEmbedding, topK);

    if (results.length === 0) {
      return null;
    }

    // Combine the retrieved texts  
    const context = results
      .map((item, index) => {
        const score = (item.score * 100).toFixed(1);
        // Vectra nests data in item.item.metadata
        const text = item.item?.metadata?.text || 'No text found';
        return `[Context ${index + 1}, relevance: ${score}%]\n${text}`;
      })
      .join('\n\n');

    console.log('✅ Retrieved context successfully');
    return context;
  } catch (error) {
    console.error('Error retrieving context:', error.message);
    console.error('Error details:', error);
    return null;
  }
}

/**
 * Fallback keyword search when Vectra is not available
 */
function fallbackKeywordSearch(query) {
  const portfolioContent = {
    about: "I am Israt Moyeen Noumi, a passionate software developer with expertise in full-stack development.",
    skills: "JavaScript, TypeScript, React, Node.js, Python, Machine Learning, Cloud Computing",
    projects: "I have built various projects including web applications, mobile apps, and AI-powered solutions.",
    contact: "Feel free to reach out to me through the contact form on this website."
  };

  const lowerQuery = query.toLowerCase();
  let relevantInfo = [];

  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('know')) {
    relevantInfo.push(portfolioContent.skills);
  }
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('built')) {
    relevantInfo.push(portfolioContent.projects);
  }
  if (lowerQuery.includes('about') || lowerQuery.includes('who') || lowerQuery.includes('background')) {
    relevantInfo.push(portfolioContent.about);
  }
  if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
    relevantInfo.push(portfolioContent.contact);
  }

  return relevantInfo.length > 0 
    ? relevantInfo.join('\n\n') 
    : portfolioContent.about;
}

/**
 * Generate response using LLM
 */
async function generateResponseWithLLM(messages, context) {
  try {
    return await llmProvider.generateResponse(messages, context);
  } catch (error) {
    console.error('Error generating response:', error.message);
    throw error;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    provider: process.env.LLM_PROVIDER || 'openai',
    vectraReady: vectraIndex && vectraIndex.isIndexCreated ? true : false
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('\n📩 Received query:', message);

    // Try to retrieve relevant context from Vectra
    let context = await retrieveRelevantContext(message);
    
    // Fallback to keyword search if Vectra isn't working
    if (!context) {
      console.log('⚠️  Using fallback keyword search');
      context = fallbackKeywordSearch(message);
    } else {
      console.log('✅ Retrieved context from Vectra');
    }

    // Prepare messages for LLM
    const messages = [
      {
        role: 'user',
        content: message
      }
    ];

    // Generate response
    console.log('🤖 Generating response with', process.env.LLM_PROVIDER || 'openai');
    const response = await generateResponseWithLLM(messages, context);
    
    console.log('✅ Response generated');

    res.json({
      response,
      context: context ? context.substring(0, 200) + '...' : 'Using general knowledge'
    });

  } catch (error) {
    console.error('❌ Chat endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

// Start server and initialize Vectra
async function startServer() {
  await initializeVectra();
  
  app.listen(PORT, () => {
    console.log(`\n🚀 RAG Backend Server Running`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🤖 LLM Provider: ${process.env.LLM_PROVIDER || 'openai'}`);
    console.log(`💾 Vector DB: Vectra (JavaScript)`);
    console.log(`\n✨ Server ready at http://localhost:${PORT}`);
  });
}

startServer();
