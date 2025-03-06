// Скрипт для настройки развертывания на Netlify
const fs = require('fs');
const path = require('path');

// Создаем файл _redirects, если он не существует
const redirectsPath = path.join(__dirname, 'out', '_redirects');
const redirectsContent = `
# Перенаправления для Next.js статического сайта
/*    /index.html   200
`;

// Убедимся, что папка out существует
if (!fs.existsSync(path.join(__dirname, 'out'))) {
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
}

// Записываем файл _redirects
fs.writeFileSync(redirectsPath, redirectsContent.trim());
console.log('Файл _redirects создан успешно');

// Проверяем наличие файла index.html
const indexPath = path.join(__dirname, 'out', 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('Файл index.html существует');
} else {
  console.log('ВНИМАНИЕ: Файл index.html не найден!');
} 