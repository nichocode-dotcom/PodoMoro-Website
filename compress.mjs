import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'src', 'assets');
const SRC_DIR = path.join(__dirname, 'src');
const PUBLIC_DIR = path.join(__dirname, 'public');

async function processDirectory(directory) {
  const files = await fs.readdir(directory);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // Process only jpg, jpeg, png files
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const originalPath = path.join(directory, file);
      const webpFilename = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      const webpPath = path.join(directory, webpFilename);

      console.log(`Processing: ${file}`);
      
      try {
        await sharp(originalPath)
          .resize({ width: 1000, withoutEnlargement: true }) // max width 1000px
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        console.log(`Saved: ${webpFilename}`);
        
        // Delete original file to save space and force code replacement
        await fs.unlink(originalPath);
        console.log(`Deleted original: ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

async function updateSourceCode(directory) {
  const files = await fs.readdir(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);
    
    if (file.isDirectory()) {
      await updateSourceCode(fullPath);
    } else if (file.name.endsWith('.jsx') || file.name.endsWith('.js') || file.name.endsWith('.json') || file.name.endsWith('.css')) {
      let content = await fs.readFile(fullPath, 'utf8');
      
      // Basic string replacement for extensions
      // This is safe since we only replace .png, .jpg, .jpeg in our codebase references
      const originalContent = content;
      content = content.replace(/\.png/gi, '.webp');
      content = content.replace(/\.jpg/gi, '.webp');
      content = content.replace(/\.jpeg/gi, '.webp');

      if (content !== originalContent) {
        await fs.writeFile(fullPath, content, 'utf8');
        console.log(`Updated references in: ${file.name}`);
      }
    }
  }
}

async function main() {
  console.log('--- Starting Image Compression ---');
  await processDirectory(ASSETS_DIR);
  
  // Also check public dir just in case
  await processDirectory(PUBLIC_DIR);

  console.log('\n--- Updating Source Code References ---');
  await updateSourceCode(SRC_DIR);
  
  console.log('\n✅ All done!');
}

main();
