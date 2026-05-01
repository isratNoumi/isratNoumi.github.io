# Ollama Setup Guide

## What is Ollama?

Ollama lets you run large language models locally on your computer - completely free, private, and offline capable!

## Installation

### Windows

1. Download from https://ollama.ai/download
2. Run the installer
3. Ollama will start automatically

### Mac

```bash
curl https://ollama.ai/install.sh | sh
```

### Linux

```bash
curl https://ollama.ai/install.sh | sh
```

## Download Models

After installing Ollama, download the models you need:

### For Chat/Response Generation

```bash
# Llama 2 (7B) - Good balance of speed and quality
ollama pull llama2

# Or Mistral (7B) - Faster, good quality
ollama pull mistral

# Or Phi-2 (2.7B) - Very fast, lighter model
ollama pull phi
```

### For Embeddings

```bash
# Nomic Embed Text - Best for embeddings
ollama pull nomic-embed-text
```

## Verify Installation

```bash
# Check if Ollama is running
ollama list

# Test a model
ollama run llama2
```

Type "Hello!" and press Enter. If it responds, you're all set!

Press `/bye` to exit.

## Configure Your Backend

Edit `backend-example/.env`:

```env
# Use Ollama for everything
LLM_PROVIDER=ollama
EMBEDDING_PROVIDER=ollama

# Ollama configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

## Setup Your RAG System

Now run:

```bash
cd backend-example

# Install dependencies (if not already done)
npm install

# Extract content from PDFs/URLs (if you have them)
npm run extract

# Create embeddings using Ollama
npm run embed

# Test it
npm run test:faiss

# Start server
npm start
```

## Test Your Chatbot

1. Start the frontend: `npm run dev`
2. Click the chat button
3. Ask: "What are Israt's skills?"

## Model Recommendations

| Model | Size | Speed | Quality | RAM Needed |
|-------|------|-------|---------|------------|
| **phi** | 1.3GB | Very Fast | Good | 4GB |
| **llama2** | 3.8GB | Fast | Very Good | 8GB |
| **mistral** | 4.1GB | Fast | Very Good | 8GB |
| **llama2:13b** | 7.3GB | Medium | Excellent | 16GB |

For embeddings, always use **nomic-embed-text** (274MB).

## Troubleshooting

### "Ollama not running"
```bash
# Check status
ollama list

# If not running, start it
ollama serve
```

### "Model not found"
```bash
# Download the model
ollama pull llama2
ollama pull nomic-embed-text
```

### "Out of memory"
Try a smaller model:
```bash
ollama pull phi
```

Then update `.env`:
```env
OLLAMA_MODEL=phi
```

### Slow responses
- Use a smaller model (phi)
- Close other applications
- Check CPU usage

## Switching Between Providers

Want to try OpenAI for comparison?

Just change `.env`:
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-your-key
```

Restart server. That's it!

## Benefits of Ollama

- **Free** - Zero API costs
- **Private** - Data never leaves your computer
- **Offline** - Works without internet
- **Fast** - No network latency
- **No limits** - Unlimited requests

## Cost Comparison

| Setup | Monthly Cost | Privacy | Speed |
|-------|-------------|---------|-------|
| **Ollama** | $0 | Complete | Very Fast |
| OpenAI | ~$5 | Cloud | Fast |
| Gemini | $0 (free tier) | Cloud | Fast |

## Next Steps

1. Download models (see above)
2. Configure `.env`
3. Run `npm run setup`
4. Start chatting!

For more details, see the main [README.md](README.md).
