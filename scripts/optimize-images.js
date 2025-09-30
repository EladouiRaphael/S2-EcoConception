import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const STATIC_DIR = './backend/static';
const OUTPUT_DIR = './backend/static/optimized';

// Configuration pour différents types d'images
const IMAGE_CONFIGS = {
  thumbnail: {
    width: 200,
    height: 200,
    fit: 'cover'
  },
  banner: {
    width: 1200,
    height: 400,
    fit: 'cover'
  },
  background: {
    width: 1920,
    height: 1080,
    fit: 'cover'
  }
};

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputPath, config) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Création des versions WebP et AVIF
    const promises = ['webp', 'avif'].map(async (format) => {
      const outputFile = outputPath.replace(/\.[^.]+$/, `.${format}`);
      
      await image
        .resize(config.width, config.height, {
          fit: config.fit,
          withoutEnlargement: true
        })
        [format]({
          quality: 80, // Bon compromis qualité/taille
          effort: 6    // Niveau de compression (0-6)
        })
        .toFile(outputFile);

      const stats = await fs.stat(outputFile);
      console.log(`✓ ${path.basename(outputFile)} (${(stats.size / 1024).toFixed(1)} KB)`);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error(`Erreur lors de l'optimisation de ${inputPath}:`, error);
  }
}

async function processImages() {
  try {
    // Création du dossier de sortie
    await ensureDirectoryExists(OUTPUT_DIR);

    // Lecture des images dans le dossier static
    const files = await fs.readdir(STATIC_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`🔍 ${imageFiles.length} images trouvées`);
    console.log('🚀 Début de l\'optimisation...\n');

    for (const file of imageFiles) {
      const inputPath = path.join(STATIC_DIR, file);
      const baseName = path.basename(file, path.extname(file));

      // Pour chaque type d'image, créer une version optimisée
      for (const [type, config] of Object.entries(IMAGE_CONFIGS)) {
        const outputPath = path.join(OUTPUT_DIR, `${baseName}-${type}${path.extname(file)}`);
        console.log(`⚙️ Optimisation de ${file} (${type})...`);
        await optimizeImage(inputPath, outputPath, config);
      }
    }

    console.log('\n✨ Optimisation terminée !');
  } catch (error) {
    console.error('Erreur lors du traitement des images:', error);
  }
}

processImages();
