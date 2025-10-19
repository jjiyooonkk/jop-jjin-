# Bible Data Directory

This directory contains Bible translation data in JSON format.

## How to Add Complete Bible Data

### Option 1: Use Open-Source Bible JSON Data (Recommended)

1. **English Translations (ESV, NIV, NKJV):**
   - Visit: https://github.com/aruljohn/Bible-kjv (for KJV, similar structure)
   - Or: https://github.com/scrollmapper/bible_databases
   - Or: API at https://bible-api.com/ (you can fetch and save locally)

2. **Korean Translations (KRV, RNKSV):**
   - Visit: https://github.com/ozzysChurch/bible-kr
   - Or: http://ibibles.net (has Korean Bible downloads)

### Option 2: Use Bible APIs

Free Bible APIs you can use to fetch and cache data:
- **ESV API**: https://api.esv.org/ (requires free API key)
- **Bible.org API**: https://labs.bible.org/api_web_service
- **Bible API**: https://bible-api.com/ (free, no key needed)

### Data Format

Each Bible translation should be a JSON file following this structure:

```json
{
  "version": "ESV",
  "language": "en",
  "books": [
    {
      "name": "Genesis",
      "abbrev": "GEN",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            {
              "book": "Genesis",
              "chapter": 1,
              "verse": 1,
              "text": "In the beginning, God created the heavens and the earth."
            }
          ]
        }
      ]
    }
  ]
}
```

### File Naming Convention

- `bible-esv.json` - English Standard Version
- `bible-niv.json` - New International Version
- `bible-nkjv.json` - New King James Version
- `bible-krv.json` - Korean Revised Version (개역한글)
- `bible-rnksv.json` - Revised New Korean Standard Version (개역개정)

### Quick Start: Fetch from API

You can use this Node.js script to fetch Bible data:

```javascript
// fetch-bible.js
const fs = require('fs');

async function fetchBible() {
  // Example using bible-api.com
  const books = ['John', 'Matthew', 'Psalms']; // Add all books
  
  for (const book of books) {
    const response = await fetch(`https://bible-api.com/${book}+1`);
    const data = await response.json();
    // Process and save...
  }
}
```

### Copyright Notice

**Important**: Ensure you have the rights to use any Bible translation. Many modern translations (ESV, NIV, etc.) are copyrighted. 

- Free/Public Domain: KJV, ASV, WEB
- Requires Permission/License: ESV, NIV, NKJV, NLT
- For commercial/public apps, use public domain translations or obtain proper licenses

### Current Status

- `bible-sample-esv.json` - Sample data showing the structure (John 3 only)
- The app currently falls back to the hardcoded inspirational verses if full Bible data is not available
