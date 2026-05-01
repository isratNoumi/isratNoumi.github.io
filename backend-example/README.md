# RAG Backend with FAISS

## Overview

Local RAG backend using **FAISS** for vector search. Free, fast, and requires only one API key (or none with Ollama!).

## Why FAISS?

- **Free** - No cloud costs
- **Private** - Data stays local
- **Fast** - Optimized search
- **Simple** - Easy setup

## Features

- **PDF Support** - Extract content from PDF files
- **URL Scraping** - Pull content from websites
- **Multiple LLM Providers** - OpenAI, Ollama (free!), Gemini, HuggingFace, Cohere
- **Local Vector Search** - FAISS runs on your machine
- **Zero Cost Option** - Use Ollama for completely free setup

## Quick Start

### Option 1: Free Setup with Ollama (Recommended)

1. **Install Ollama:**
   - Download from https://ollama.ai/download
   - Run: `ollama pull llama2`
   - Run: `ollama pull nomic-embed-text`

2. **Install dependencies:**
   ```bash
   cd backend-example
   npm install
   ```

3. **Configure:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   LLM_PROVIDER=ollama
   EMBEDDING_PROVIDER=ollama
   ```

4. **Add content:**
   - Put PDFs in `documents/` folder
   - Edit `scripts/extractContent.js` to add URLs

5. **Setup:**
   ```bash
   npm run setup
   ```

6. **Start:**
   ```bash
   npm start
   ```

**Total Cost: $0/month**

### Option 2: OpenAI Setup

1-2. Same as above

3. **Get OpenAI key** from https://platform.openai.com/api-keys

4. **Configure `.env`:**
   ```env
   LLM_PROVIDER=openai
   OPENAI_API_KEY=sk-your-key-here
   ```

5-6. Same as above

**Cost: ~$5/month**

## Using PDFs and URLs

See [USING_PDFS_AND_URLS.md](USING_PDFS_AND_URLS.md) for detailed guide.

**Quick version:**

1. Add PDFs to `documents/` folder
2. Edit URLs in `scripts/extractContent.js`
3. Run `npm run extract`
4. Run `npm run embed`

## Free LLM Options

See [FREE_LLM_OPTIONS.md](FREE_LLM_OPTIONS.md) for all free alternatives.

**Best free options:**
- **Ollama** - Completely free, local, private
- **Google Gemini** - Generous free tier
- **HuggingFace** - Free tier available

## Commands

```bash
npm run extract       # Extract from PDFs and URLs
npm run embed         # Create FAISS embeddings
npm run test:faiss    # Test vector search
npm run setup         # Extract + embed in one command
npm start             # Start server
npm run dev           # Start with auto-reload
```

## API

**POST /api/chat**
```json
{
  "message": "What are Israt's skills?"
}
```

**GET /api/health**
```json
{
  "status": "ok"
}
```

## File Structure

```
backend-example/
├── server.js              # API server
├── llm-config.js          # Multi-provider LLM support
├── documents/             # Your PDFs go here
├── data/
│   ├── faiss_index.dat   # Vector index
│   ├── metadata.json     # Content data
│   └── extracted_content.json  # Extracted from PDFs/URLs
└── scripts/
    ├── extractContent.js # PDF/URL extraction
    ├── embedPortfolio.js # Create embeddings
    └── testFAISS.js      # Test search
```

## Troubleshooting

**"No FAISS index found"**
Run `npm run embed`

**"No extracted content"**
Run `npm run extract` or add PDFs to `documents/` folder

**Ollama not working**
Check Ollama is running: `ollama list`

## Documentation

- [FREE_LLM_OPTIONS.md](FREE_LLM_OPTIONS.md) - All free alternatives
- [USING_PDFS_AND_URLS.md](USING_PDFS_AND_URLS.md) - PDF and URL guide
- `../RAG_SETUP.md` - Full project documentation
