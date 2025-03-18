'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiMessageSquare, FiMail, FiSearch, FiUsers, FiDatabase, FiGrid } from 'react-icons/fi';

const examplesData = {
  ru: [
    {
      icon: <FiMessageSquare className="w-10 h-10 text-black" />,
      title: 'Автоуправление Telegram-каналом',
      description: 'Бот с ИИ анализирует RSS-ленту, создает уникальные посты и публикует их без участия человека.',
      results: [
        'Экономия 20+ часов работы администратора в неделю',
        'Увеличение охвата аудитории на 35%',
        'Стабильный контент-план без перебоев'
      ],
      image: '/images/telegram-automation.svg'
    },
    {
      icon: <FiDatabase className="w-10 h-10 text-black" />,
      title: 'Внедрение CRM системы для автотехцентра',
      description: 'Разработали и внедрили персонализированную CRM-систему для сети автосервисов с функциями учета клиентов, автомобилей и истории обслуживания.',
      results: [
        'Сокращение времени на оформление и обслуживание клиентов на 60%',
        'Интеграция с диагностическим оборудованием и базами данных запчастей',
        'Автоматические напоминания клиентам снизили количество пропущенных ТО на 70%',
        'Полная цифровизация истории обслуживания автомобилей'
      ],
      image: '/images/crm-system.svg'
    },
    {
      icon: <FiGrid className="w-10 h-10 text-black" />,
      title: 'Автоматизация B2B-процессов',
      description: 'Создали комплексную систему, которая собирает и анализирует данные заказов со всех сетей и сайтов партнеров, интегрирует их в CRM и автоматически ведет клиентов.',
      results: [
        'Агрегация данных из 15+ различных источников в единую систему',
        'Автоматизация 90% рутинных операций по обработке заказов',
        'Интеллектуальная система рассылок увеличила повторные продажи на 45%',
        'Автоматические напоминания о датах записи и купленных услугах'
      ],
      image: '/images/b2b-automation.svg'
    },
    {
      icon: <FiMessageSquare className="w-10 h-10 text-black" />,
      title: 'Автоматизированная реклама в Telegram',
      description: 'Бот обрабатывает запросы рекламодателей, создает рекламные посты и публикует их после одобрения.',
      results: [
        'Увеличение количества рекламных размещений на 40%',
        'Сокращение времени на обработку заявок на 70%',
        'Автоматическая отчетность по эффективности рекламы'
      ],
      image: '/images/telegram-ads.svg'
    },
    {
      icon: <FiMail className="w-10 h-10 text-black" />,
      title: 'Умная обработка почты',
      description: 'ИИ-приложение анализирует входящие письма, извлекает ключевые данные и структурирует информацию.',
      results: [
        'Сокращение времени обработки писем на 85%',
        'Автоматическая категоризация и приоритизация',
        'Интеграция с CRM и системами управления задачами'
      ],
      image: '/images/email-processing.svg'
    },
    {
      icon: <FiSearch className="w-10 h-10 text-black" />,
      title: 'Автоматический поиск поставщиков',
      description: 'Наша система находит подходящих поставщиков и отправляет им персонализированные предложения.',
      results: [
        'Расширение базы поставщиков на 200+ компаний',
        'Снижение закупочных цен на 15-20%',
        'Автоматизация переговоров по стандартным условиям'
      ],
      image: '/images/supplier-search.svg'
    }
  ],
  en: [
    {
      icon: <FiMessageSquare className="w-10 h-10 text-black" />,
      title: 'Telegram Channel Auto-Management',
      description: 'AI bot analyzes RSS feeds, creates unique posts, and publishes them without human intervention.',
      results: [
        'Saves 20+ hours of admin work per week',
        'Increases audience reach by 35%',
        'Provides stable content plan without interruptions'
      ],
      image: '/images/telegram-automation-en.svg'
    },
    {
      icon: <FiDatabase className="w-10 h-10 text-black" />,
      title: 'CRM System Implementation for Auto Service Center',
      description: 'Developed and implemented a personalized CRM system for a chain of auto service centers with customer management, vehicle tracking, and service history features.',
      results: [
        'Reduced customer registration and service time by 60%',
        'Integration with diagnostic equipment and spare parts databases',
        'Automatic reminders reduced missed maintenance appointments by 70%',
        'Complete digitization of vehicle service history'
      ],
      image: '/images/crm-system-en.svg'
    },
    {
      icon: <FiGrid className="w-10 h-10 text-black" />,
      title: 'B2B Process Automation',
      description: 'Created a comprehensive system that collects and analyzes order data from all partner networks and websites, integrates them into CRM, and automatically manages customers.',
      results: [
        'Aggregation of data from 15+ different sources into a single system',
        'Automation of 90% of routine order processing operations',
        'Intelligent mailing system increased repeat sales by 45%',
        'Automatic reminders about registration dates and purchased services'
      ],
      image: '/images/b2b-automation-en.svg'
    },
    {
      icon: <FiMessageSquare className="w-10 h-10 text-black" />,
      title: 'Automated Advertising in Telegram',
      description: 'Bot processes advertiser requests, creates ad posts, and publishes them after approval.',
      results: [
        'Increases ad placements by 40%',
        'Reduces request processing time by 70%',
        'Provides automatic reporting on ad effectiveness'
      ],
      image: '/images/telegram-ads-en.svg'
    },
    {
      icon: <FiMail className="w-10 h-10 text-black" />,
      title: 'Smart Email Processing',
      description: 'AI application analyzes incoming emails, extracts key data, and structures information.',
      results: [
        'Reduces email processing time by 85%',
        'Provides automatic categorization and prioritization',
        'Integrates with CRM and task management systems'
      ],
      image: '/images/email-processing-en.svg'
    },
    {
      icon: <FiSearch className="w-10 h-10 text-black" />,
      title: 'Automatic Supplier Search',
      description: 'Our system finds suitable suppliers and sends them personalized offers.',
      results: [
        'Expands supplier base by 200+ companies',
        'Reduces purchase prices by 15-20%',
        'Automates negotiations on standard terms'
      ],
      image: '/images/supplier-search-en.svg'
    }
  ]
};

const content = {
  ru: {
    title: 'Примеры внедрений',
    description: 'Реальные кейсы автоматизации, которые помогли нашим клиентам повысить эффективность и сократить расходы',
    ourProjects: 'Наши проекты',
    results: 'Результаты:',
    learnMore: 'Узнать подробнее'
  },
  en: {
    title: 'Implementation Examples',
    description: 'Real automation cases that helped our clients increase efficiency and reduce costs',
    ourProjects: 'Our Projects',
    results: 'Results:',
    learnMore: 'Learn more'
  }
};

export default function Examples() {
  const [activeExample, setActiveExample] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Слушаем событие изменения языка
    const handleLanguageChange = (e: CustomEvent) => {
      const newLanguage = e.detail.language;
      setLanguage(newLanguage);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const gridCols = isLargeScreen ? 'grid-cols-3' : 'grid-cols-1';
  const colSpan = isLargeScreen ? 'col-span-2' : 'col-span-1';
  const examples = examplesData[language as keyof typeof examplesData];
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="examples" className="py-20 bg-white" style={{backgroundColor: '#ffffff !important'}}>
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className={`${titleSize} font-bold text-black mb-4`}
            style={{color: '#000000 !important'}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentContent.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-black max-w-2xl mx-auto"
            style={{color: '#000000 !important'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentContent.description}
          </motion.p>
        </div>

        <div className={`grid ${gridCols} gap-8`}>
          <div className={isLargeScreen ? 'col-span-1' : ''}>
            <div className="bg-secondary-50 rounded-xl p-6" style={{backgroundColor: '#f8fafc !important'}}>
              <h3 className="text-xl font-semibold text-black mb-4" style={{color: '#000000 !important'}}>{currentContent.ourProjects}</h3>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                      activeExample === index 
                        ? 'bg-primary-50 border-l-4 border-primary-600' 
                        : 'hover:bg-secondary-100'
                    }`}
                    style={activeExample === index 
                      ? {backgroundColor: '#f0f9ff !important', borderLeftColor: '#0284c7 !important'} 
                      : {}}
                    onClick={() => setActiveExample(index)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">{example.icon}</div>
                      <h4 className="font-medium text-black" style={{color: '#000000 !important'}}>{example.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            className={colSpan}
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{backgroundColor: '#ffffff !important'}}>
              <div className="h-64 bg-secondary-50 relative" style={{backgroundColor: '#f8fafc !important'}}>
                <motion.img 
                  src={examples[activeExample].image} 
                  alt={examples[activeExample].title}
                  className="w-full h-full object-contain p-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={activeExample}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/800x400?text=${encodeURIComponent(examples[activeExample].title)}`;
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-4" style={{color: '#000000 !important'}}>{examples[activeExample].title}</h3>
                <p className="text-black mb-6" style={{color: '#000000 !important'}}>{examples[activeExample].description}</p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-black mb-3" style={{color: '#000000 !important'}}>{currentContent.results}</h4>
                  <ul className="space-y-2">
                    {examples[activeExample].results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiArrowRight className="text-primary-600 mr-2 mt-1 flex-shrink-0" style={{color: '#0284c7 !important'}} />
                        <span className="text-black" style={{color: '#000000 !important'}}>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-right">
                  <a
                    href="mailto:sales@efficore.pro?subject=Запрос информации о проекте"
                    className="text-black font-medium hover:text-primary-700 transition-colors inline-flex items-center"
                    style={{color: '#000000 !important'}}
                  >
                    {currentContent.learnMore} <FiArrowRight className="ml-1" style={{color: '#000000 !important'}} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 