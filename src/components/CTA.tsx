'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const content = {
  ru: {
    title: 'Готовы автоматизировать свой бизнес?',
    description: 'Свяжитесь с нами сегодня, чтобы обсудить ваш проект и получить индивидуальное предложение',
    button: 'Получить консультацию'
  },
  en: {
    title: 'Ready to automate your business?',
    description: 'Contact us today to discuss your project and get a personalized offer',
    button: 'Get a Consultation'
  }
};

export default function CTA() {
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Слушаем событие изменения языка
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const currentContent = content[language as keyof typeof content];

  return (
    <section className="py-20 bg-primary-600" style={{backgroundColor: '#0284c7 !important'}}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className={`${titleSize} font-bold text-white mb-6`}
            style={{color: '#ffffff !important'}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentContent.title}
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            style={{color: '#ffffff !important'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentContent.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:effitechh@gmail.com?subject=Запрос консультации"
                className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                style={{color: '#000000 !important', backgroundColor: '#ffffff !important'}}
              >
                {currentContent.button}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 