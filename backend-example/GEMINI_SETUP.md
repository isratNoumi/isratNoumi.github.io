# Google Gemini Setup Guide

## Why Gemini?

- **Free tier** - 60 requests/minute
- **Excellent quality** - Competitive with GPT-4
- **Fast** - Quick response times
- **Easy setup** - Just one API key
- **No installation** - Cloud-based

## Setup Steps

### 1. Get API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy your key (starts with `AI...`)

### 2. Configure Backend

Edit `backend-example/.env`:

```env
# Set Gemini as provider
LLM_PROVIDER=gemini
EMBEDDING_PROVIDER=gemini

# Add your API key
GOOGLE_API_KEY=AIza...your_key_here
GEMINI_MODEL=gemini-pro
```

That's it! Just 2 lines.

### 3. Setup Your RAG System

```bash
cd backend-example

# Install dependencies (if not done)
npm install

# Extract content (if using PDFs/URLs)
npm run extract

# Create embeddings with Gemini
npm run embed

# Test
npm run test:faiss

# Start server
npm start
```

### 4. Test Your Chatbot

```bash
# In main directory
npm run dev
```

Click the chat button and ask questions!

## Features

### What You Get:

- **60 requests/minute** free
- **100,000 requests/day** free (way more than you need)
- **Embeddings included** - Use Gemini for both chat and embeddings
- **Long context** - Up to 30,720 tokens
- **Multimodal** - Can handle text and images (future feature)

### Response Quality:

Gemini Pro is excellent for:
- Conversational responses
- Technical questions
- Professional tone
- Accurate information retrieval

## Cost Comparison

| Provider | Free Tier | Cost After |
|----------|-----------|------------|
| **Gemini** | 60/min | $0.50/1M tokens |
| Ollama | Unlimited | $0 (local) |
| OpenAI | None | $0.50/1M tokens |
| Groq | 30/min | Pay as you go |

## Models Available

```env
# Standard (recommended)
GEMINI_MODEL=gemini-pro

# Latest experimental
GEMINI_MODEL=gemini-1.5-pro-latest

# Fast version
GEMINI_MODEL=gemini-1.5-flash
```

## Switching Between Providers

Want to switch back to Ollama or try OpenAI?

Just change one line in `.env`:

```env
# Use Gemini
LLM_PROVIDER=gemini

# Or use Ollama
LLM_PROVIDER=ollama

# Or use OpenAI
LLM_PROVIDER=openai
```

Re-run `npm run embed` if you change the embedding provider.

## Troubleshooting

### "API key not valid"
- Check you copied the full key
- Make sure no extra spaces
- Key should start with `AIza`

### "Quota exceeded"
- Free tier: 60 requests/minute
- Wait a minute and try again
- Or upgrade to paid tier (very cheap)

### "Model not found"
- Use `gemini-pro` (most reliable)
- Check model name spelling

## Example Usage

Your chatbot will now:
1. Use Gemini for chat responses
2. Use Gemini for embeddings (if configured)
3. Work with FAISS for local vector search
4. Cost you $0/month (within free tier)

## Performance

- **Response time**: ~1-2 seconds
- **Quality**: Excellent
- **Reliability**: Very high
- **Rate limits**: 60/min (plenty for portfolio)

## Privacy Note

Gemini is cloud-based, so your queries are sent to Google. For complete privacy, use Ollama instead.

For a portfolio chatbot, Gemini's free tier is perfect!

## Next Steps

1. Get API key from Google
2. Update `.env` file
3. Run `npm run setup`
4. Start chatting!

Need help? Check the main [README.md](README.md) or [FREE_LLM_OPTIONS.md](FREE_LLM_OPTIONS.md).
