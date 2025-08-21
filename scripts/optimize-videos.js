#!/usr/bin/env node

/**
 * Script para otimizar vídeos do projeto
 * Reduz o tamanho dos arquivos MP4 para melhorar a performance
 * 
 * Requisitos:
 * - FFmpeg instalado no sistema
 * - Node.js
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
const ffprobePath = isWindows 
  ? 'C:/Program Files/ffmpeg/bin/ffprobe.exe'
  : 'ffprobe';

// Configurações de otimização
const OPTIMIZATION_CONFIGS = {
  // Para vídeos de fundo (menor qualidade, menor tamanho)
  background: {
    crf: 28, // Qualidade mais baixa
    preset: 'fast',
    maxWidth: 640,
    maxHeight: 480,
    fps: 24,
  },
  // Para vídeos principais (qualidade média)
  main: {
    crf: 23, // Qualidade média
    preset: 'medium',
    maxWidth: 1280,
    maxHeight: 720,
    fps: 30,
  }
};

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function getVideoInfo(videoPath) {
  try {
    const output = execSync(`"${ffprobePath}" -v quiet -print_format json -show_format -show_streams "${videoPath}"`, { encoding: 'utf8' });
    return JSON.parse(output);
  } catch (error) {
    console.error(`Erro ao obter informações do vídeo ${videoPath}:`, error.message);
    return null;
  }
}

function optimizeVideo(inputPath, outputPath, config) {
  const inputFileName = path.basename(inputPath, path.extname(inputPath));
  const outputFileName = `${inputFileName}_optimized.mp4`;
  const fullOutputPath = path.join(outputPath, outputFileName);

  try {
    const ffmpegCommand = `"${ffmpegPath}" -i "${inputPath}" \
      -c:v libx264 \
      -crf ${config.crf} \
      -preset ${config.preset} \
      -vf "scale=w='min(${config.maxWidth},iw)':h='min(${config.maxHeight},ih)':force_original_aspect_ratio=decrease" \
      -r ${config.fps} \
      -c:a aac \
      -b:a 128k \
      -movflags +faststart \
      -y "${fullOutputPath}"`;

    console.log(`Otimizando: ${path.basename(inputPath)}`);
    execSync(ffmpegCommand, { stdio: 'inherit' });
    
    // Verificar tamanho do arquivo
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(fullOutputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} otimizado!`);
    console.log(`   Tamanho original: ${(originalSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`   Tamanho otimizado: ${(optimizedSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`   Redução: ${reduction}%\n`);
    
    return fullOutputPath;
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${inputPath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🎬 Iniciando otimização de vídeos...\n');
  
  // Verificar se FFmpeg está disponível
  try {
    execSync(`"${ffmpegPath}" -version`, { stdio: 'ignore' });
    console.log(`✅ FFmpeg encontrado em: ${ffmpegPath}\n`);
  } catch (error) {
    console.error('❌ FFmpeg não encontrado! Por favor, instale o FFmpeg primeiro.');
    console.error('   Windows: https://ffmpeg.org/download.html');
    console.error('   macOS: brew install ffmpeg');
    console.error('   Linux: sudo apt install ffmpeg');
    process.exit(1);
  }

  ensureOutputDir();

  // Listar todos os vídeos MP4
  const videoFiles = fs.readdirSync(VIDEOS_DIR)
    .filter(file => file.endsWith('.mp4'))
    .map(file => path.join(VIDEOS_DIR, file));

  if (videoFiles.length === 0) {
    console.log('Nenhum vídeo MP4 encontrado para otimizar.');
    return;
  }

  console.log(`Encontrados ${videoFiles.length} vídeos para otimizar:\n`);

  let successCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // Otimizar cada vídeo
  for (const videoFile of videoFiles) {
    const videoInfo = getVideoInfo(videoFile);
    if (!videoInfo) continue;

    // Determinar configuração baseada no nome do arquivo
    const config = videoFile.includes('meme1') || videoFile.includes('meme2') 
      ? OPTIMIZATION_CONFIGS.main 
      : OPTIMIZATION_CONFIGS.background;

    const originalSize = fs.statSync(videoFile).size;
    totalOriginalSize += originalSize;

    const optimizedPath = optimizeVideo(videoFile, OUTPUT_DIR, config);
    if (optimizedPath) {
      successCount++;
      totalOptimizedSize += fs.statSync(optimizedPath).size;
    }
  }

  // Resumo final
  console.log('📊 Resumo da otimização:');
  console.log(`   Vídeos processados: ${successCount}/${videoFiles.length}`);
  console.log(`   Tamanho total original: ${(totalOriginalSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Tamanho total otimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   Redução total: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`\n🎯 Vídeos otimizados salvos em: ${OUTPUT_DIR}`);
  console.log('\n💡 Dica: Substitua os vídeos originais pelos otimizados para melhorar a performance do site!');
}

if (require.main === module) {
  main();
}

module.exports = { optimizeVideo, getVideoInfo }; 