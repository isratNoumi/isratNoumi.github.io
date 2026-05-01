# Free OpenAI Alternatives for RAG

## 1. Ollama (Recommended - Completely Free)

**Best for:** Complete privacy and zero costs

### Setup

1. **Install Ollama:**
   - Visit https://ollama.ai/download
   - Download for Windows/Mac/Linux
   - Install and run

2. **Download a model:**
   ```bash
   ollama pull llama2
   # or
   ollama pull mistral
   # or  
   ollama pull phi
   ```

3. **Configure your `.env`:**
   ```env
   LLM_PROVIDER=ollama
   OLLAMA_MODEL=llama2
   OLLAMA_BASE_URL=http://localhost:11434
   ```

4. **For embeddings, use:**
   ```bash
   ollama pull nomic-embed-text
   ```
   
   Then set:
   ```env
   EMBEDDING_PROVIDER=ollama
   OLLAMA_EMBEDDING_MODEL=nomic-embed-text
   ```

**Pros:**
- Completely free
- Runs locally (complete privacy)
- No API keys needed
- Works offline
- Fast

**Cons:**
- Requires ~4-8GB RAM
- Quality slightly lower than GPT-4
- Initial download ~4GB per model

---

## 2. HuggingFace Inference API

**Best for:** Free tier with good models

### Setup

1. **Get free API key:**
   - Go to https://huggingface.co/settings/tokens
   - Create a new token

2. **Configure `.env`:**
   ```env
   LLM_PROVIDER=huggingface
   HUGGINGFACE_API_KEY=hf_your_key_here
   HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2
   ```

**Free tier:**
- 1000 requests/day
- Rate limited but sufficient for personal use

---

## 3. Google Gemini

**Best for:** Generous free tier

### Setup

1. **Get free API key:**
   - Go to https://makersuite.google.com/app/apikey
   - Create API key

2. **Configure `.env`:**
   ```env
   LLM_PROVIDER=gemini
   GOOGLE_API_KEY=your_key_here
   GEMINI_MODEL=gemini-pro
   ```

**Free tier:**
- 60 requests/minute
- Very generous limits

---

## 4. Cohere

**Best for:** Free embeddings + chat

### Setup

1. **Get free API key:**
   - Sign up at https://cohere.com/
   - Get API key from dashboard

2. **Configure `.env`:**
   ```env
   LLM_PROVIDER=cohere
   COHERE_API_KEY=your_key_here
   EMBEDDING_PROVIDER=cohere
   ```

**Free tier:**
- 100 requests/minute
- Good for small projects

---

## 5. Together AI

**Best for:** Free credits on signup

### Setup

1. **Sign up:**
   - Go to https://together.ai/
   - Get $25 free credits

2. **Configure `.env`:**
   ```env
   LLM_PROVIDER=together
   TOGETHER_API_KEY=your_key_here
   TOGETHER_MODEL=mistralai/Mistral-7B-Instruct-v0.1
   ```

---

## Comparison Table

| Provider | Cost | Setup | Quality | Privacy | Speed |
|----------|------|-------|---------|---------|-------|
| **Ollama** | Free | Medium | Good | Complete | Fast |
| OpenAI | ~$5/mo | Easy | Excellent | Cloud | Fast |
| HuggingFace | Free tier | Easy | Good | Cloud | Medium |
| Gemini | Free tier | Easy | Very Good | Cloud | Fast |
| Cohere | Free tier | Easy | Good | Cloud | Fast |
| Together AI | $25 credit | Easy | Good | Cloud | Fast |

---

## Recommended Combinations

### Best Free Setup (No costs)
- **LLM**: Ollama (llama2 or mistral)
- **Embeddings**: Ollama (nomic-embed-text)
- **Vector DB**: FAISS (local)
- **Total cost**: $0/month

### Best Quality (Small cost)
- **LLM**: OpenAI (GPT-3.5-turbo)
- **Embeddings**: OpenAI (ada-002)
- **Vector DB**: FAISS (local)
- **Total cost**: ~$5/month

### Best Free Cloud Setup
- **LLM**: Google Gemini
- **Embeddings**: Cohere (free)
- **Vector DB**: FAISS (local)
- **Total cost**: $0/month

---

## Implementation

To use these alternatives, update `server.js` to support multiple providers. See `llm-config.js` for configuration examples.

## Need Help Choosing?

**For personal portfolio:** Use Ollama (completely free, private)
**For demo/testing:** Use Google Gemini (easy, generous free tier)
**For production:** Use OpenAI (best quality, low cost)
