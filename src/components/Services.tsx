'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMessageSquare, FiServer, FiGlobe, FiCpu, FiActivity, FiArrowRight } from 'react-icons/fi';

const servicesData = {
  ru: [
    {
      icon: <FiServer className="w-12 h-12 text-black" />,
      title: 'Индивидуальные системы автоматизации',
      description: 'Разрабатываем уникальные решения под ваши бизнес-процессы, учитывая все особенности вашей компании.',
      features: [
        'Анализ текущих процессов',
        'Разработка оптимальной архитектуры',
        'Интеграция с существующими системами',
        'Масштабируемость и гибкость'
      ]
    },
    {
      icon: <FiMessageSquare className="w-12 h-12 text-black" />,
      title: 'Автоматизация Telegram',
      description: 'Создаем ботов и системы управления для эффективной работы с Telegram-каналами и рекламой.',
      features: [
        'Боты с искусственным интеллектом',
        'Автоматическое управление каналами',
        'Системы для размещения рекламы',
        'Аналитика и отчетность'
      ]
    },
    {
      icon: <FiCpu className="w-12 h-12 text-black" />,
      title: 'Интеграция искусственного интеллекта',
      description: 'Внедряем ИИ-решения для оптимизации бизнес-процессов и повышения эффективности.',
      features: [
        'Анализ данных и прогнозирование',
        'Автоматическая обработка документов',
        'Чат-боты и виртуальные ассистенты',
        'Системы принятия решений'
      ]
    },
    {
      icon: <FiActivity className="w-12 h-12 text-black" />,
      title: 'Полный цикл разработки',
      description: 'Сопровождаем проект от анализа бизнеса до внедрения и поддержки готового решения.',
      features: [
        'Бизнес-анализ и консультации',
        'Проектирование и разработка',
        'Тестирование и внедрение',
        'Техническая поддержка и обновления'
      ]
    }
  ],
  en: [
    {
      icon: <FiServer className="w-12 h-12 text-black" />,
      title: 'Custom Automation Systems',
      description: 'We develop unique solutions for your business processes, taking into account all the features of your company.',
      features: [
        'Analysis of current processes',
        'Development of optimal architecture',
        'Integration with existing systems',
        'Scalability and flexibility'
      ]
    },
    {
      icon: <FiMessageSquare className="w-12 h-12 text-black" />,
      title: 'Telegram Automation',
      description: 'We create bots and management systems for efficient work with Telegram channels and advertising.',
      features: [
        'AI-powered bots',
        'Automatic channel management',
        'Advertising placement systems',
        'Analytics and reporting'
      ]
    },
    {
      icon: <FiCpu className="w-12 h-12 text-black" />,
      title: 'AI Integration',
      description: 'We implement AI solutions to optimize business processes and increase efficiency.',
      features: [
        'Data analysis and forecasting',
        'Automatic document processing',
        'Chatbots and virtual assistants',
        'Decision-making systems'
      ]
    },
    {
      icon: <FiActivity className="w-12 h-12 text-black" />,
      title: 'Full Development Cycle',
      description: 'We accompany the project from business analysis to implementation and support of the finished solution.',
      features: [
        'Business analysis and consulting',
        'Design and development',
        'Testing and implementation',
        'Technical support and updates'
      ]
    }
  ]
};

const content = {
  ru: {
    title: 'Наши услуги',
    description: 'Мы предлагаем комплексные решения для автоматизации бизнес-процессов, которые помогут вашей компании работать эффективнее',
    getConsultation: 'Получить консультацию',
    contactUs: 'Связаться с нами'
  },
  en: {
    title: 'Our Services',
    description: 'We offer comprehensive solutions for business process automation that will help your company work more efficiently',
    getConsultation: 'Get a Consultation',
    contactUs: 'Contact Us'
  }
};

export default function Services() {
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
      setLanguage(e.detail.language);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const textSize = isMobile ? 'text-lg' : 'text-xl';
  const gridCols = isLargeScreen ? 'grid-cols-2' : 'grid-cols-1';
  const flexDirection = isMobile ? 'flex-col' : 'flex-row';
  const services = servicesData[language as keyof typeof servicesData];
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="services" className="py-20 bg-secondary-50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className={`${titleSize} font-bold text-black mb-4`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentContent.title}
          </motion.h2>
          <motion.p 
            className={`${textSize} text-black max-w-2xl mx-auto`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentContent.description}
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`grid ${gridCols} gap-8`}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`flex ${flexDirection} ${!isMobile ? 'items-start' : ''}`}>
                <div className={`${isMobile ? 'mb-4' : 'mr-6'}`}>{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-3">{service.title}</h3>
                  <p className="text-black mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a
            href="mailto:effitechh@gmail.com"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            {currentContent.contactUs} <FiArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
} 