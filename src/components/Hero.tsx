'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [illustrationSrc, setIllustrationSrc] = useState('/images/automation-illustration-ru.svg');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Слушаем событие изменения языка
    const handleLanguageChange = (e: CustomEvent) => {
      const newLanguage = e.detail.language;
      setLanguage(newLanguage);
      // Обновляем источник иллюстрации в зависимости от языка
      setIllustrationSrc(`/images/automation-illustration-${newLanguage}.svg`);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  const paddingClasses = isMobile 
    ? "pt-28 pb-20" 
    : "pt-32 pb-24";

  const flexDirection = isMobile || isTablet
    ? "flex-col"
    : "flex-row";

  const textClasses = isMobile
    ? "text-4xl"
    : isTablet
      ? "text-5xl"
      : "text-6xl";

  const buttonLayout = isMobile
    ? "flex-col"
    : "flex-row";

  const content = {
    ru: {
      title: <><span className="text-primary-600" style={{color: '#0284c7 !important'}}>EffiTech</span> - автоматизация, умножающая эффективность</>,
      description: 'Мы создаем индивидуальные системы автоматизации, которые экономят ваше время и увеличивают прибыль',
      learnMore: 'Узнать больше',
      contactUs: 'Связаться с нами',
      altText: 'Автоматизация бизнес-процессов',
      placeholderText: 'Автоматизация+бизнес-процессов'
    },
    en: {
      title: <><span className="text-primary-600" style={{color: '#0284c7 !important'}}>EffiTech</span> - automation that multiplies efficiency</>,
      description: 'We create custom automation systems that save your time and increase profits',
      learnMore: 'Learn more',
      contactUs: 'Contact us',
      altText: 'Business process automation',
      placeholderText: 'Business+process+automation'
    }
  };

  return (
    <section id="hero" className={`${paddingClasses} bg-gradient-to-br from-primary-50 to-secondary-50`}>
      <div className="container">
        <div className={`flex ${flexDirection} items-center`}>
          <motion.div 
            className={`${!isMobile && !isTablet ? 'w-1/2' : 'w-full'} ${isMobile || isTablet ? 'mb-10' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`${textClasses} font-bold text-secondary-900 leading-tight mb-4 text-black`} style={{color: '#000000 !important'}}>
              {content[language as keyof typeof content].title}
            </h1>
            <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-secondary-700 mb-8 max-w-xl text-black`} style={{color: '#000000 !important'}}>
              {content[language as keyof typeof content].description}
            </p>
            <div className={`flex ${buttonLayout} gap-4`}>
              <ScrollLink
                to="services"
                smooth={true}
                duration={500}
                offset={-70}
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors inline-flex items-center justify-center cursor-pointer"
                style={{color: '#ffffff !important'}}
              >
                {content[language as keyof typeof content].learnMore} <FiArrowRight className="ml-2" />
              </ScrollLink>
              <a
                href="mailto:effitechh@gmail.com"
                className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
                style={{color: '#0284c7 !important'}}
              >
                {content[language as keyof typeof content].contactUs}
              </a>
            </div>
          </motion.div>
          <motion.div 
            className={!isMobile && !isTablet ? 'w-1/2' : 'w-full'}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-full opacity-70"></div>
              <div className="relative bg-white p-6 rounded-xl shadow-xl">
                <img 
                  src={illustrationSrc} 
                  alt={content[language as keyof typeof content].altText} 
                  className="w-full h-auto"
                  style={{color: '#000000'}}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/600x400?text=${content[language as keyof typeof content].placeholderText}`;
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 