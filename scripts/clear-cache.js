#!/usr/bin/env node

/**
 * Скрипт для очистки кэша и проверки фавикона
 * Запустите: node scripts/clear-cache.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Очистка кэша и проверка фавикона...\n');

// Проверяем наличие всех файлов фавикона
const publicDir = path.join(__dirname, '..', 'public');
const requiredFiles = [
  'favicon.svg',
  'favicon.ico', 
  'favicon-32x32.png',
  'site.webmanifest'
];

console.log('📁 Проверка файлов фавикона:');
requiredFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`❌ ${file} - отсутствует`);
  }
});

console.log('\n🔧 Рекомендации для Vercel:');
console.log('1. Убедитесь, что все файлы загружены в репозиторий');
console.log('2. После деплоя очистите кэш браузера (Ctrl+Shift+R или Cmd+Shift+R)');
console.log('3. Проверьте в DevTools -> Network, что фавикон загружается с правильным Content-Type');
console.log('4. Если проблема остается, попробуйте hard refresh (Ctrl+Shift+Delete)');

console.log('\n🌐 Для проверки в браузере:');
console.log('- Откройте DevTools -> Console');
console.log('- Выполните: document.querySelector("link[rel*=\'icon\']").href');
console.log('- Должен вернуться URL вашего фавикона'); 