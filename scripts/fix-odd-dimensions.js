#!/usr/bin/env node

/**
 * Script para corrigir vídeos com dimensões ímpares
 * O FFmpeg requer dimensões pares para H.264
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VIDEOS_DIR = path.join(__dirname, '../public/videos');
const OUTPUT_DIR = path.join(__dirname, '../public/videos/optimized');

// Detectar sistema operacional e caminho do FFmpeg
const isWindows = process.platform === 'win32';
const ffmpegPath = isWindows 
  ? 'C:/Program Files/ffmpeg/bin/ffmpeg.exe'
  : 'ffmpeg';

function fixOddDimensions(inputPath, outputPath) {
  const inputFileName = path.basename(inputPath, path.extname(inputPath));
  const outputFileName = `${inputFileName}_fixed.mp4`;
  const fullOutputPath = path.join(outputPath, outputFileName);

  try {
    // Comando para corrigir dimensões ímpares e otimizar
    const ffmpegCommand = `"${ffmpegPath}" -i "${inputPath}" \
      -c:v libx264 \
      -crf 28 \
      -preset fast \
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
      -r 24 \
      -c:a aac \
      -b:a 128k \
      -movflags +faststart \
      -y "${fullOutputPath}"`;

    console.log(`Corrigindo: ${path.basename(inputPath)}`);
    execSync(ffmpegCommand, { stdio: 'inherit' });
    
    // Verificar tamanho do arquivo
    const originalSize = fs.statSync(inputPath).size;
    const fixedSize = fs.statSync(fullOutputPath).size;
    const reduction = ((originalSize - fixedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} corrigido!`);
    console.log(`   Tamanho original: ${(originalSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`   Tamanho corrigido: ${(fixedSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`   Redução: ${reduction}%\n`);
    
    return fullOutputPath;
  } catch (error) {
    console.error(`❌ Erro ao corrigir ${inputPath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🔧 Corrigindo vídeos com dimensões ímpares...\n');
  
  // Lista de vídeos que falharam na otimização
  const failedVideos = [
    'rat_meme2.mp4',
    'rat_meme3.mp4', 
    'rat_meme5.mp4',
    'rat_meme7.mp4',
    'rat_meme8.mp4',
    'rat_meme11.mp4'
  ];

  let successCount = 0;
  let totalOriginalSize = 0;
  let totalFixedSize = 0;

  for (const videoName of failedVideos) {
    const videoPath = path.join(VIDEOS_DIR, videoName);
    
    if (!fs.existsSync(videoPath)) {
      console.log(`⚠️  Vídeo não encontrado: ${videoName}`);
      continue;
    }

    const originalSize = fs.statSync(videoPath).size;
    totalOriginalSize += originalSize;

    const fixedPath = fixOddDimensions(videoPath, OUTPUT_DIR);
    if (fixedPath) {
      successCount++;
      totalFixedSize += fs.statSync(fixedPath).size;
    }
  }

  // Resumo final
  console.log('📊 Resumo da correção:');
  console.log(`   Vídeos corrigidos: ${successCount}/${failedVideos.length}`);
  console.log(`   Tamanho total original: ${(totalOriginalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Tamanho total corrigido: ${(totalFixedSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Redução total: ${((totalOriginalSize - totalFixedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`\n🎯 Vídeos corrigidos salvos em: ${OUTPUT_DIR}`);
}

if (require.main === module) {
  main();
}

module.exports = { fixOddDimensions }; 