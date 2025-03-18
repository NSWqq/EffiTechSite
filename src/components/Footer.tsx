'use client';

import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FiMail } from 'react-icons/fi';

const content = {
  ru: {
    companyDescription: 'Мы специализируемся на разработке и внедрении систем автоматизации для бизнеса, создании сайтов и CRM-систем, создавая решения, умножающие эффективность вашей компании.',
    navigation: 'Навигация',
    about: 'О компании',
    services: 'Системы Автоматизации',
    examples: 'Примеры внедрений',
    contacts: 'Контакты',
    servicesList: {
      title: 'Услуги',
      items: [
        'Индивидуальные системы автоматизации',
        'Автоматизация Telegram',
        'Интеграция искусственного интеллекта',
        'Разработка сайтов любой сложности',
        'Индивидуальные CRM-системы',
        'Полный цикл разработки'
      ]
    },
    rights: 'Все права защищены.',
    contactUs: 'Свяжитесь с нами'
  },
  en: {
    companyDescription: 'We specialize in the development and implementation of automation systems for businesses, website development and CRM systems, creating solutions that multiply the efficiency of your company.',
    navigation: 'Navigation',
    about: 'About Us',
    services: 'Automation Systems',
    examples: 'Examples',
    contacts: 'Contacts',
    servicesList: {
      title: 'Services',
      items: [
        'Custom Automation Systems',
        'Telegram Automation',
        'AI Integration',
        'Website Development of Any Complexity',
        'Custom CRM Systems',
        'Full Development Cycle'
      ]
    },
    rights: 'All rights reserved.',
    contactUs: 'Contact Us'
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
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

  const gridCols = isMobile ? 'grid-cols-1' : 'grid-cols-4';
  const colSpan = isMobile ? '' : 'col-span-2';
  const flexDirection = isMobile ? 'flex-col' : 'flex-row';
  const marginBottom = isMobile ? 'mb-4' : 'mb-0';
  const currentContent = content[language as keyof typeof content];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container py-12">
        <div className={`grid ${gridCols} gap-8`}>
          <div className={colSpan}>
            <h3 className="text-2xl font-bold mb-4" style={{color: '#ffffff !important'}}>EffiCore</h3>
            <p className="text-secondary-300 mb-6 max-w-md" style={{color: '#cbd5e1 !important'}}>
              {currentContent.companyDescription}
            </p>
            <div className="flex items-center">
              <a 
                href="mailto:sales@efficore.pro" 
                className="flex items-center text-secondary-300 hover:text-white transition-colors"
                style={{color: '#cbd5e1 !important'}}
              >
                <FiMail className="mr-2" /> sales@efficore.pro
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: '#ffffff !important'}}>{currentContent.navigation}</h4>
            <ul className="space-y-2">
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-secondary-300 hover:text-white transition-colors cursor-pointer"
                  style={{color: '#cbd5e1 !important'}}
                >
                  {currentContent.about}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="services"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-secondary-300 hover:text-white transition-colors cursor-pointer"
                  style={{color: '#cbd5e1 !important'}}
                >
                  {currentContent.services}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="examples"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-secondary-300 hover:text-white transition-colors cursor-pointer"
                  style={{color: '#cbd5e1 !important'}}
                >
                  {currentContent.examples}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contacts"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-secondary-300 hover:text-white transition-colors cursor-pointer"
                  style={{color: '#cbd5e1 !important'}}
                >
                  {currentContent.contacts}
                </ScrollLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: '#ffffff !important'}}>{currentContent.servicesList.title}</h4>
            <ul className="space-y-2">
              {currentContent.servicesList.items.map((service, index) => (
                <li key={index} className="text-secondary-300" style={{color: '#cbd5e1 !important'}}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={`mt-12 pt-8 border-t border-secondary-800 flex ${flexDirection} justify-between items-center`}>
          <p className={`text-secondary-400 text-sm ${marginBottom}`} style={{color: '#94a3b8 !important'}}>
            © {currentYear} EffiCore. {currentContent.rights}
          </p>
        </div>
      </div>
    </footer>
  );
} 