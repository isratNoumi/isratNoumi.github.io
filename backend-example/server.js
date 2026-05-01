/**
 * RAG Backend Implementation with FAISS Vector Database
 * 
 * This backend implements RAG functionality using:
 * - FAISS (via hnswlib-node) for local vector storage and similarity search
 * - OpenAI for embeddings and response generation
 * - Express.js for the API server
 * 
 * Installation:
 * npm install express cors dotenv openai hnswlib-node
 * 
 * Setup:
 * 1. Get your OpenAI API key from https://platform.openai.com/
 * 2. Copy .env.example to .env and add your OpenAI key
 * 3. Run: node scripts/embedPortfolio.js (to create embeddings and FAISS index)
 * 4. Run: node server.js (to start the server)
 * 
 * Benefits of FAISS:
 * - Runs locally, no cloud dependencies
 * - No additional API keys needed
 * - Fast similarity search
 * - Free and open-source
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { HierarchicalNSW } = require('hnswlib-node');
const LLMProvider = require('./llm-config');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize LLM Provider (supports OpenAI, Ollama, Gemini, etc.)
const llmProvider = new LLMProvider();

// FAISS index and metadata storage
let faissIndex;
let vectorMetadata = [];
const INDEX_PATH = path.join(__dirname, 'data', 'faiss_index.dat');
const METADATA_PATH = path.join(__dirname, 'data', 'metadata.json');

// Initialize FAISS
async function initializeFAISS() {
  try {
    // Check if index files exist
    if (fs.existsSync(INDEX_PATH) && fs.existsSync(METADATA_PATH)) {
      // Load existing index
      faissIndex = new HierarchicalNSW('cosine', 1536); // OpenAI ada-002 dimension
      faissIndex.readIndex(INDEX_PATH);
      
      // Load metadata
      const metadataContent = fs.readFileSync(METADATA_PATH, 'utf-8');
      vectorMetadata = JSON.parse(metadataContent);
      
      console.log(`FAISS index loaded successfully with ${vectorMetadata.length} vectors`);
    } else {
      console.log('No FAISS index found. Please run: npm run embed');
      console.log('Falling back to mock mode');
    }
  } catch (error) {
    console.error('Failed to initialize FAISS:', error.message);
    console.log('Falling back to mock mode');
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Portfolio Knowledge Base (in a real app, this would be in a vector database)
const portfolioKnowledge = {
  about: `Israt Moyeen Noumi is an AI/ML-Application Developer currently working at Dexian Bangladesh. 
          She specializes in building scalable full stack applications and AI-driven solutions using React, 
          Next.js, Supabase, and cutting-edge GenAI/LLM technologies. She has expertise in delivering 
          intelligent applications powered by RAG and modern AI frameworks.`,
  
  skills: `Israt's technical skills include:
           - Frontend: React, Next.js, TypeScript, TailwindCSS, HTML5, CSS3
           - Backend: Node.js, Supabase, RESTful APIs
           - AI/ML: GenAI, LLM Integration, RAG Systems, Prompt Engineering
           - Tools: Git, VS Code, Vite, Webpack
           - Databases: Supabase, PostgreSQL
/**
 * Create embedding for a query using OpenAI
 */
async function createEmbedding(text) {configured provider
 */
async function createEmbedding(text) {
  try {
    return await llmProvider.createEmbedding(text)edding:', error);
    throw error;
  }
}

/**
 * Search FAISS for relevant context
 */
async function retrieveRelevantContext(query) {
  try {
    if (!faissIndex || vectorMetadata.length === 0) {
      return fallbackKeywordSearch(query);
    }
    
    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query);
    
    // Search FAISS for similar vectors
    const k = 3; // Return top 3 most relevant chunks
    const result = faissIndex.searchKnn(queryEmbedding, k);
    
    // Extract and combine the text from matches
    const contexts = result.neighbors
      .filter((_, idx) => result.distances[idx] < 0.3) // Only use high-confidence matches (lower distance = more similar)
      .map(idx => vectorMetadata[idx].text)
      .join('\n\n');
    
    return contexts || portfolioKnowledge.about; // Fallback to general info
    
  } catch (error) {
    console.error('Error retrieving context from FAISS:', error);
    // Fallback to keyword-based search
    return fallbackKeywordSearch(query);
  }
}

/**
 * Fallback keyword-based search (when FAISS is unavailable)
 */
function fallbackKeywordSearch(query) {
  const lowerQuery = query.toLowerCase();
  let contexts = [];
  
  if (lowerQuery.match(/skill|technology|tech|stack|proficient|know/)) {
    contexts.push(portfolioKnowledge.skills);
  }
  if (lowerQuery.match(/experience|work|job|career|employment/)) {
    contexts.push(portfolioKnowledge.experience);
  }
  if (lowerQuery.match(/project|built|developed|created|portfolio/)) {
    contexts.push(portfolioKnowledge.projects);
  }
  if (lowerQuery.match(/education|study|degree|university|school/)) {
    contexts.push("Please check the Education section for detailed information about Israt's academic background.");
  }
  if (lowerQuery.match(/contact|reach|email|connect|touch/)) {
    contexts.push(portfolioKnowledge.contact);
  }
  if (lowerQuery.match(/who|about|introduce/)) {
    contexts.push(portfolioKnowledge.about);
  }
  
  // If no specific context found, return general info
  if (contexts.length === 0) {
    contexts.push(portfolioKnowledge.about);
  }
  
  return contexts.join('\n\n');
}

/**
 * Simple response generation (fallback when LLM is unavailable)
 */
function generateSimpleResponse(query, context) {
  const lowerQuery = query.toLowerCase();
  
  // Try to provide a natural response based on context
  if (lowerQuery.match(/skill|technology/)) {
    return `Israt has expertise in full-stack development with React, Next.js, TypeScript, and modern AI technologies. She's particularly skilled in building AI-driven solutions using GenAI, LLMs, and RAG systems. Her backend experience includes Node.js and Supabase.`;
  }
  
  if (lowerQuery.match(/experience|work/)) {
    return `Israt currently works at Dexian Bangladesh as an AI/ML-Application Developer. She specializes in delivering intelligent applications powered by RAG and modern AI frameworks, building scalable full-stack applications with cutting-edge GenAI/LLM technologies.`;
  }
  
  if (lowerQuery.match(/project/)) {
    return `Israt has developed various AI-driven applications using GenAI and LLM technologies, along with full-stack web applications using React and Next.js. She has experience building RAG-powered systems for intelligent information retrieval. Check out the Projects section to see her work in detail!`;
  }
  
  if (lowerQuery.match(/contact|reach/)) {
    return `You can reach Israt through the Contact section of this portfolio. She's also available on LinkedIn and GitHub - the links are in the footer and contact page. Feel free to use the contact form to send a message!`;
  }
  
  // Default response with context
  return `Based on what I know: ${context.substring(0, 300)}... Would you like to know more about a specific area?`;
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    let response;
    if (process.env.OPENAI_API_KEY && pineconeIndex) {
      // Use full RAG pipeline with OpenAI
      response = await generateResponseWithOpenAI(message, context);
    } else {
      // Fallback to simple responsespenAI version if available, otherwise use simple version
    let response;
    if (process.env.OPENAI_API_KEY) {
      // response = await generateResponseWithOpenAI(message, context);
      response = generateSimpleResponse(message, context);
    } else {
      response = generateSimpleResponse(message, context);
    }
    
    // Step 3: Return response
    res.json({
      response,
      sources: ['Portfolio Knowledge Base'],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process your request'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'RAG Chat Backend' });
});

// Initialize and start server
async function startServer() {
  await initializeFAISS();
  
  app.listen(PORT, () => {
    console.log(`RAG Backend running on http://localhost:${PORT}`);
    console.log(`Chat endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`LLM Provider: ${llmProvider.provider}`);
    
    if (faissIndex) {
      console.log(`Running in FULL RAG mode with FAISS + ${llmProvider.provider.toUpperCase()}`);
    } else {
      console.log(`Running in MOCK mode (run 'npm run setup' to enable RAG)`);
    }
  });
}

startServer().catch(console.error);

module.exports = app;
