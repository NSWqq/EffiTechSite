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
  // Настройка базового пути для корректной загрузки ресурсов
  assetPrefix: './',
  // Отключаем использование серверных компонентов для статического экспорта
  experimental: {
    appDir: true,
  },
  // Настройка для корректной обработки CSS
  trailingSlash: true,
};

export default nextConfig; 