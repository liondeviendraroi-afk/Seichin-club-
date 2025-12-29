const express = require('express');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const mkdirp = require('mkdirp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '20mb' }));

// Simple CORS for local testing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

function sanitizeFilename(name) {
  if (!name) return 'inconnu';
  return String(name).replace(/[^a-z0-9_\-\u00C0-\u024F ]/gi, '').replace(/\s+/g, '_');
}

app.post('/api/inscription', async (req, res) => {
  try {
    const { htmlContent, filename: rawFilename } = req.body;
    if (!htmlContent) return res.status(400).json({ error: 'Missing htmlContent' });

    const safeName = sanitizeFilename(rawFilename || `inscription_${Date.now()}`);
    const outDir = path.join(__dirname, 'data', 'inscriptions');
    await mkdirp(outDir);

    const htmlPath = path.join(outDir, `${safeName}.html`);
    const pdfPath = path.join(outDir, `${safeName}.pdf`);

    // Save HTML
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');

    // Render PDF with puppeteer
    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '15mm', bottom: '15mm', left: '10mm', right: '10mm' } });
    await browser.close();

    return res.json({ success: true, htmlPath: `/data/inscriptions/${safeName}.html`, pdfPath: `/data/inscriptions/${safeName}.pdf` });
  } catch (err) {
    console.error('Error saving inscription:', err);
    return res.status(500).json({ error: 'Server error', details: String(err) });
  }
});

// Serve saved files for convenience
app.use('/data', express.static(path.join(__dirname, 'data')));

app.listen(PORT, () => {
  console.log(`Inscription server running on http://localhost:${PORT}`);
});
