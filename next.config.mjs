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
  // Отключаем использование серверных компонентов для статического экспорта
  experimental: {
    appDir: true,
  },
};

export default nextConfig; 