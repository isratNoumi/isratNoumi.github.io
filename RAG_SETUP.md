# RAG Chatbot Implementation Guide

## Overview

This portfolio includes a production-ready AI-powered chatbot using RAG (Retrieval-Augmented Generation) technology with FAISS vector database and OpenAI. The chatbot can answer questions about Israt's experience, skills, projects, and education using semantic search and natural language generation.

## Features

**Floating Chat Interface** - Non-intrusive chat button in the bottom-right corner
**AI-Powered Responses** - Uses RAG with FAISS + OpenAI for context-aware answers
**Vector Search** - Semantic similarity search using embeddings
**Conversation History** - Maintains chat context for natural conversations
**Responsive Design** - Works seamlessly on desktop and mobile devices
**Modern UI** - Beautiful gradient design with smooth animations
**Fallback Mode** - Graceful degradation when APIs are unavailable
**Local & Private** - FAISS runs locally, your data stays on your machine

## Architecture

The implementation uses a modern RAG architecture:

1. **Frontend** - React chatbot component (`src/components/ChatBot.tsx`)
2. **Backend** - Express.js API with FAISS integration (`backend-example/server.js`)
3. **Vector Database** - FAISS for local vector storage and similarity search
4. **LLM** - OpenAI GPT-3.5-turbo for response generation
5. **Embeddings** - OpenAI text-embedding-ada-002

## Current Implementation

### Full RAG Mode with FAISS

The chatbot is configured with:
- **FAISS** - Free, open-source vector database running locally
- **OpenAI** - Embeddings and chat completions (only API key needed)
- **Express.js** backend API
- Fallback to keyword-based responses if APIs are unavailable

### Why FAISS?

- **Free** - No subscription or cloud costs
- **Private** - Complete data privacy, runs locally
- **Fast** - Optimized for similarity search
- **Simple** - Only need one API key (OpenAI)

### Files Created

#### Frontend
1. **`src/components/ChatBot.tsx`** - Main chatbot component with UI
2. **`src/components/ChatBot.css`** - Modern chatbot styling
3. **`src/services/ragService.ts`** - Service for backend communication
4. **`.env.example`** - Frontend environment variables template

#### Backend
5. **`backend-example/server.js`** - Express.js server with FAISS + OpenAI
6. **`backend-example/package.json`** - Backend dependencies
7. **`backend-example/.env.example`** - Backend environment variables template
8. **`backend-example/scripts/embedPortfolio.js`** - Script to create embeddings
9. **`backend-example/scripts/testFAISS.js`** - Test script for FAISS
10. **`backend-example/README.md`** - Detailed backend setup guide

## Quick Start

### 1. Set Up Backend

```bash
cd backend-example
npm install
```

### 2. Get OpenAI API Key

- **OpenAI**: https://platform.openai.com/api-keys

### 3. Configure Environment

```bash
cp .env.example .env
```

Add your key to `.env`:
```env
OPENAI_API_KEY=sk-your-key-here
```

### 4. Create FAISS Index

```bash
npm run embed
```

This creates local vector embeddings (~30 seconds).

### 5. Test

```bash
npm run test:faiss
```

### 6. Start Backend

```bash
npm start
```

### 7. Configure Frontend

In the main project directory, update `.env.local`:
```env
VITE_RAG_API_ENDPOINT=http://localhost:3001/api/chat
```

### 8. Start Frontend

```bash
npm run dev
```

Visit http://localhost:5173 and click the chat button!

## Customizing the Knowledge Base

Edit the `portfolioKnowledgeBase` in `src/services/ragService.ts` to update the chatbot's knowledge about your portfolio.

## Embedding Your Portfolio Content

For true RAG, you'll need to:

1. **Extract content** from all portfolio sections
2. **Create embeddings** using OpenAI, Cohere, or similar
3. **Store in vector database** for efficient retrieval
4. **Query on user input** to get relevant context
5. **Pass to LLM** for natural language generation

## Example: Complete RAG Setup

```bash
# Install dependencies for backend
npm install langchain @langchain/openai @langchain/pinecone

# Create embeddings
node scripts/createEmbeddings.js

# Start backend
npm run backend

# Start frontend
npm run dev
```

## Testing the Chatbot

1. Click the purple chat button in the bottom-right
2. Try these example questions:
   - "What are Israt's main skills?"
   - "Tell me about her work experience"
   - "What projects has she built?"
   - "How can I contact her?"

## Styling Customization

The chatbot colors can be customized in `ChatBot.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Hover gradient */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

## Performance Considerations

- Implement rate limiting to prevent API abuse
- Cache frequently asked questions
- Use streaming responses for longer answers
- Implement error boundaries for graceful failures

## Privacy & Security

**Important**: Never expose API keys in the frontend code
- Use environment variables
- Implement backend proxy for API calls
- Add authentication if storing user conversations
- Comply with data privacy regulations

## Production Deployment

### Backend Deployment

Deploy to Vercel, Railway, Heroku, or AWS:

```bash
# Vercel
cd backend-example
vercel

# Railway
railway up

# Heroku
heroku create portfolio-rag-backend
git push heroku main
```

### Frontend Configuration

Update `VITE_RAG_API_ENDPOINT` in `.env.local` to your deployed backend URL:

```env
VITE_RAG_API_ENDPOINT=https://your-backend.vercel.app/api/chat
```

## Cost Estimates

### OpenAI (per month, 1000 queries)
- Embeddings: ~$0.01
- Chat Completions: ~$3-5
- **Total**: ~$5/month

### Pinecone
- **FAISS
- **Free** - Runs locally, no cloud cos
## Next Steps

- [x] Chatbot UI created
- [x] Backend with Pinecone + OpenAI ready
- [x] Embedding scripts provided
- [ ] Get API keys FAISS + OpenAI ready
- [x] Embedding scripts provided
- [ ] Get OpenAI API key
- [ ] Deploy to production
- [ ] Monitor usage and costs

## Resources

- [LangChain Documentation](https://js.langchain.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [RAG Tutorial](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [Vector Databases Comparison](https://benchmark.vectorview.ai/)

## Need Help?

The chatbot works in mock mode by default. To enable real RAG:
1. Choose a backend approach
2. Set up embeddings
3. Configure API endpoint
4. Test and deploy
