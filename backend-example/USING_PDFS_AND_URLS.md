# Using PDFs and URLs for RAG

## Quick Start

### 1. Prepare Your Content

Create a `documents/` folder in `backend-example`:

```bash
mkdir backend-example/documents
```

Add your PDFs:
- Resume/CV
- Certificates
- Project documentation
- Any other relevant PDFs

### 2. Configure Sources

Edit `scripts/extractContent.js`:

```javascript
const contentSources = {
  // Your PDF files (place in documents/ folder)
  pdfs: [
    'resume.pdf',
    'portfolio.pdf',
    'certifications.pdf'
  ],
  
  // Your web URLs
  urls: [
    'https://your-portfolio.com/about',
    'https://your-blog.com',
    'https://github.com/your-username'
  ],
  
  // Manual content (optional)
  manual: [
    {
      id: 'contact-1',
      category: 'contact',
      title: 'Contact Info',
      text: 'Contact details...'
    }
  ]
};
```

### 3. Extract Content

```bash
npm run extract
```

This will:
- Read all PDFs from `documents/` folder
- Scrape content from specified URLs
- Chunk text into appropriate sizes
- Save to `data/extracted_content.json`

### 4. Create Embeddings

```bash
npm run embed
```

This reads the extracted content and creates the FAISS index.

### 5. Start Server

```bash
npm start
```

Done! Your chatbot now uses content from your PDFs and URLs.

## One-Command Setup

```bash
npm run setup
```

This runs extraction and embedding in one go.

## What Gets Extracted?

### From PDFs:
- All text content
- Maintains paragraph structure
- Automatically chunked for optimal retrieval

### From URLs:
- Main content (articles, text)
- Automatically removes navigation, ads, etc.
- Respects robots.txt

### Chunking:
- Splits into ~500-word chunks
- 50-word overlap between chunks
- Preserves context

## Examples

### Portfolio Website
```javascript
urls: [
  'https://your-name.com/about',
  'https://your-name.com/projects',
  'https://your-name.com/experience'
]
```

### GitHub Profile
```javascript
urls: [
  'https://github.com/your-username'
]
```

### LinkedIn (public profile)
```javascript
urls: [
  'https://linkedin.com/in/your-username'
]
```

### Blog Posts
```javascript
urls: [
  'https://your-blog.com/post-1',
  'https://your-blog.com/post-2'
]
```

## Tips

1. **Add diverse content** - More sources = better answers
2. **Keep PDFs text-based** - Scanned images won't work (unless you use OCR)
3. **Public URLs only** - Can't scrape password-protected pages
4. **Re-run extraction** - When you update PDFs or URLs, run `npm run extract` again

## Troubleshooting

**PDF not extracted?**
- Check PDF is text-based (not scanned image)
- Verify file is in `documents/` folder
- Check file name matches config

**URL scraping failed?**
- Check URL is accessible
- Some sites block scrapers
- Try adding delay between requests

**Poor quality answers?**
- Add more content sources
- Use longer chunk sizes
- Add manual content for key facts

## Advanced: Custom Chunking

Edit `extractContent.js`:

```javascript
// Larger chunks for technical content
const chunks = chunkText(text, 800, 100);

// Smaller chunks for Q&A style
const chunks = chunkText(text, 300, 30);
```

## Cost Still Zero!

Using PDFs and URLs with FAISS is still completely free. You only pay for:
- OpenAI embeddings: ~$0.01 per PDF
- OR use Ollama embeddings: $0 (completely free!)

Recommend: Use Ollama for completely free setup.
