'use client';

import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiArrowUp, FiGlobe, FiMail } from 'react-icons/fi';

const navItems = [
  { name: 'О компании', nameEn: 'About', target: 'about' },
  { name: 'Услуги', nameEn: 'Services', target: 'services' },
  { name: 'Примеры внедрений', nameEn: 'Examples', target: 'examples' },
  { name: 'Контакты', nameEn: 'Contacts', target: 'contacts' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Показываем кнопку "наверх" только когда пользователь прокрутил ниже hero-секции
      if (window.scrollY > window.innerHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsTablet(window.innerWidth >= 1024 && window.innerWidth < 1280);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLanguage);
    
    // Отправляем событие изменения языка
    const event = new CustomEvent('languageChange', { 
      detail: { language: newLanguage } 
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container flex justify-between items-center">
          <div className={`text-2xl font-bold ${scrolled ? 'text-black' : 'text-primary-700'}`}>
            <ScrollLink to="hero" smooth={true} duration={500} className="cursor-pointer">
              EffiTech
            </ScrollLink>
          </div>

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.target}
                  to={item.target}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className={`${scrolled ? 'text-black' : 'text-secondary-700'} hover:text-primary-600 hover:font-medium transition-all cursor-pointer relative group px-2 py-1 whitespace-nowrap`}
                  activeClass="text-primary-600 font-medium"
                  spy={true}
                >
                  {language === 'ru' ? item.name : item.nameEn}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
                </ScrollLink>
              ))}
              <button
                onClick={toggleLanguage}
                className={`${scrolled ? 'text-black' : 'text-secondary-700'} hover:text-primary-600 transition-colors flex items-center px-2 py-1 whitespace-nowrap`}
                aria-label="Переключить язык"
              >
                <FiGlobe className="mr-1" /> {language === 'ru' ? 'EN' : 'RU'}
              </button>
              <a
                href="mailto:effitechh@gmail.com"
                className={`hidden md:inline-flex items-center text-black hover:text-primary-600 transition-colors`}
                style={{color: '#000000 !important'}}
              >
                <FiMail className="mr-2" />
                {language === 'ru' ? 'Связаться' : 'Contact us'}
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center">
              <button
                onClick={toggleLanguage}
                className={`${scrolled ? 'text-black' : 'text-secondary-700'} hover:text-primary-600 transition-colors flex items-center mr-4`}
                aria-label="Переключить язык"
              >
                <FiGlobe className="mr-1" /> {language === 'ru' ? 'EN' : 'RU'}
              </button>
              <a
                href="mailto:effitechh@gmail.com"
                className={`hidden md:inline-flex items-center text-black hover:text-primary-600 transition-colors`}
                style={{color: '#000000 !important'}}
              >
                <FiMail className="mr-2" />
                {language === 'ru' ? 'Связаться' : 'Contact us'}
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${scrolled ? 'text-black' : 'text-secondary-700'} hover:text-primary-600 transition-colors`}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white shadow-lg absolute top-full left-0 w-full"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.target}
                  to={item.target}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-black hover:text-primary-600 transition-colors cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {language === 'ru' ? item.name : item.nameEn}
                </ScrollLink>
              ))}
              <a
                href="mailto:effitechh@gmail.com"
                className={`flex items-center text-black hover:text-primary-600 transition-colors py-2`}
                style={{color: '#000000 !important'}}
                onClick={() => setIsOpen(false)}
              >
                <FiMail className="mr-2" />
                {language === 'ru' ? 'Связаться' : 'Contact us'}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Кнопка возврата наверх */}
      <button 
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
        className={`back-to-top bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors ${showBackToTop ? 'visible' : ''}`}
        aria-label="Вернуться наверх"
      >
        <FiArrowUp size={24} />
      </button>
    </>
  );
} 