/**
 * Script to extract content from PDFs and URLs for RAG
 * 
 * This script:
 * 1. Reads PDFs and extracts text
 * 2. Scrapes content from web URLs
 * 3. Chunks the content appropriately
 * 4. Creates embeddings (using OpenAI or free alternatives)
 * 5. Stores in FAISS index
 * 
 * Install dependencies:
 * npm install pdf-parse axios cheerio
 * 
 * Run: node scripts/extractContent.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const cheerio = require('cheerio');

// Configuration: Add your PDFs and URLs here
const contentSources = {
  // Local PDF files (place in backend-example/documents/)
  pdfs: [
    'Israt_Moyeen_Resume (1).pdf',
  ],
  
  // Web URLs to scrape
  urls: [
   'https://69a18df107aa500bd7e14276--genuine-starship-4f2cdb.netlify.app/'
  ],
  
  // Manual content (for things not in PDFs/URLs)
  manual: [
    {
      id: 'contact-1',
      category: 'contact',
      title: 'Contact Information',
      text: 'Contact details and social media links...'
    }
  ]
};

/**
 * Extract text from PDF
 */
async function extractFromPDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error reading PDF ${pdfPath}:`, error.message);
    return '';
  }
}

/**
 * Extract text from URL
 */
async function extractFromURL(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove script and style elements
    $('script, style, nav, footer, header').remove();
    
    // Get text from main content areas
    const text = $('main, article, .content, body').text()
      .replace(/\s+/g, ' ')
      .trim();
    
    return text;
  } catch (error) {
    console.error(`Error scraping URL ${url}:`, error.message);
    return '';
  }
}

/**
 * Chunk text into smaller pieces for better retrieval
 */
function chunkText(text, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/);
  const chunks = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim().length > 50) { // Only keep meaningful chunks
      chunks.push(chunk);
    }
  }
  
  return chunks;
}

/**
 * Main extraction function
 */
async function extractAllContent() {
  console.log('Starting content extraction...\n');
  
  const extractedContent = [];
  let idCounter = 1;
  
  // 1. Extract from PDFs
  console.log('Extracting from PDFs...');
  const documentsDir = path.join(__dirname, '..', 'documents');
  
  if (fs.existsSync(documentsDir)) {
    for (const pdfFile of contentSources.pdfs) {
      const pdfPath = path.join(documentsDir, pdfFile);
      
      if (fs.existsSync(pdfPath)) {
        console.log(`  Reading ${pdfFile}...`);
        const text = await extractFromPDF(pdfPath);
        const chunks = chunkText(text);
        
        chunks.forEach((chunk, idx) => {
          extractedContent.push({
            id: `pdf-${pdfFile}-${idx}`,
            category: 'pdf',
            title: `${pdfFile} - Part ${idx + 1}`,
            text: chunk,
            source: pdfFile
          });
        });
        
        console.log(`    Extracted ${chunks.length} chunks`);
      } else {
        console.log(`    Skipping ${pdfFile} (not found)`);
      }
    }
  } else {
    console.log('  No documents/ directory found. Create it and add PDFs.');
  }
  
  // 2. Extract from URLs
  console.log('\nExtracting from URLs...');
  for (const url of contentSources.urls) {
    console.log(`  Scraping ${url}...`);
    const text = await extractFromURL(url);
    
    if (text) {
      const chunks = chunkText(text);
      
      chunks.forEach((chunk, idx) => {
        extractedContent.push({
          id: `url-${idCounter++}`,
          category: 'web',
          title: `${url} - Part ${idx + 1}`,
          text: chunk,
          source: url
        });
      });
      
      console.log(`    Extracted ${chunks.length} chunks`);
    }
    
    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 3. Add manual content
  console.log('\nAdding manual content...');
  extractedContent.push(...contentSources.manual);
  console.log(`  Added ${contentSources.manual.length} manual entries`);
  
  // 4. Save extracted content
  const outputPath = path.join(__dirname, '..', 'data', 'extracted_content.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(extractedContent, null, 2));
  
  console.log(`\nExtraction complete!`);
  console.log(`Total content chunks: ${extractedContent.length}`);
  console.log(`Saved to: ${outputPath}`);
  console.log(`\nNext step: Run 'npm run embed' to create embeddings`);
  
  return extractedContent;
}

// Run if called directly
if (require.main === module) {
  extractAllContent();
}

module.exports = { extractAllContent, chunkText };
