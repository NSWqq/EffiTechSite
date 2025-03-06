/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Отключаем проверку ESLint при сборке
    ignoreDuringBuilds: true,
  },
  // Добавляем настройки для лучшей совместимости с Netlify
  output: 'export', // Экспортируем как статический сайт
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений для статического экспорта
  },
  // Настройка для корректной загрузки ресурсов
  assetPrefix: '/', // Используем абсолютный путь для ассетов
  // Настройка для корректной обработки CSS
  trailingSlash: true,
  // Добавляем настройку для правильной обработки путей к статическим файлам
  basePath: '',
};

export default nextConfig; 