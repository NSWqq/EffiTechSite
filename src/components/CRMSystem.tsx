'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiGrid, 
  FiUsers, 
  FiTrendingUp, 
  FiSettings, 
  FiDatabase, 
  FiLayers, 
  FiArrowRight, 
  FiCheckCircle,
  FiPieChart
} from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';

const crmFeaturesData = {
  ru: [
    {
      icon: <FiUsers className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Управление клиентами',
      description: 'Централизованная база данных клиентов с полной историей взаимодействия и профилями.',
      features: [
        'Карточки клиентов с полной информацией',
        'История взаимодействий и коммуникаций',
        'Сегментация клиентов по категориям',
        'Автоматические напоминания о важных событиях'
      ],
      gradient: 'from-blue-50 to-blue-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiTrendingUp className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Управление продажами',
      description: 'Полный цикл продаж от лида до закрытия сделки с аналитикой и прогнозированием.',
      features: [
        'Воронка продаж с визуализацией',
        'Управление сделками и этапами',
        'Автоматизация процесса продаж',
        'Аналитика эффективности менеджеров'
      ],
      gradient: 'from-indigo-50 to-indigo-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiGrid className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Управление задачами',
      description: 'Система управления задачами и проектами для эффективной организации работы команды.',
      features: [
        'Распределение задач между сотрудниками',
        'Календарь и планирование',
        'Контроль сроков и прогресса',
        'Уведомления и напоминания'
      ],
      gradient: 'from-purple-50 to-purple-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiPieChart className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Аналитика и отчеты',
      description: 'Подробная аналитика бизнес-процессов с настраиваемыми отчетами и дашбордами.',
      features: [
        'Настраиваемые дашборды и виджеты',
        'Отчеты по различным показателям',
        'Экспорт данных в различных форматах',
        'Прогнозирование на основе исторических данных'
      ],
      gradient: 'from-teal-50 to-teal-100',
      buttonText: 'Подробнее'
    }
  ],
  en: [
    {
      icon: <FiUsers className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Customer Management',
      description: 'Centralized customer database with complete interaction history and profiles.',
      features: [
        'Customer cards with complete information',
        'History of interactions and communications',
        'Customer segmentation by categories',
        'Automatic reminders of important events'
      ],
      gradient: 'from-blue-50 to-blue-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiTrendingUp className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Sales Management',
      description: 'Complete sales cycle from lead to deal closure with analytics and forecasting.',
      features: [
        'Sales funnel with visualization',
        'Deal and stage management',
        'Sales process automation',
        'Manager efficiency analytics'
      ],
      gradient: 'from-indigo-50 to-indigo-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiGrid className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Task Management',
      description: 'Task and project management system for efficient team organization.',
      features: [
        'Task assignment between employees',
        'Calendar and planning',
        'Deadline and progress tracking',
        'Notifications and reminders'
      ],
      gradient: 'from-purple-50 to-purple-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiPieChart className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Analytics and Reports',
      description: 'Detailed analytics of business processes with customizable reports and dashboards.',
      features: [
        'Customizable dashboards and widgets',
        'Reports on various indicators',
        'Data export in various formats',
        'Forecasting based on historical data'
      ],
      gradient: 'from-teal-50 to-teal-100',
      buttonText: 'Learn More'
    }
  ]
};

const advantagesData = {
  ru: [
    {
      icon: <FiLayers className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Индивидуальная адаптация',
      description: 'Настройка под конкретные задачи и процессы вашего бизнеса'
    },
    {
      icon: <FiSettings className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Гибкая интеграция',
      description: 'Возможность интеграции с другими сервисами и системами'
    },
    {
      icon: <FiDatabase className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Масштабируемость',
      description: 'Система растет вместе с вашим бизнесом без потери производительности'
    },
    {
      icon: <FiUsers className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Удобство использования',
      description: 'Интуитивно понятный интерфейс и минимальное время на обучение'
    }
  ],
  en: [
    {
      icon: <FiLayers className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Custom Adaptation',
      description: 'Configuration for specific tasks and processes of your business'
    },
    {
      icon: <FiSettings className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Flexible Integration',
      description: 'Ability to integrate with other services and systems'
    },
    {
      icon: <FiDatabase className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Scalability',
      description: 'The system grows with your business without loss of performance'
    },
    {
      icon: <FiUsers className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'User-Friendliness',
      description: 'Intuitive interface and minimal training time'
    }
  ]
};

const content = {
  ru: {
    title: 'CRM-система',
    description: 'Наша собственная CRM-система с гибкой адаптацией под конкретную сферу бизнеса для эффективного управления взаимоотношениями с клиентами',
    getConsultation: 'Получить консультацию',
    contactUs: 'Связаться с нами',
    whyChooseUs: 'Преимущества нашей CRM',
    whyChooseUsDescription: 'Мы предлагаем не просто стандартную CRM, а полностью адаптированное под ваш бизнес решение с возможностью глубокой кастомизации',
    included: 'Возможности:',
    adaptationTitle: 'Индивидуальная адаптация для вашего бизнеса',
    adaptationDescription: 'Мы не просто внедряем стандартную CRM-систему, а полностью перестраиваем и адаптируем её под специфику вашего бизнеса. Наши специалисты анализируют ваши бизнес-процессы и настраивают систему таким образом, чтобы она максимально соответствовала вашим потребностям и помогала решать конкретные задачи вашей компании.'
  },
  en: {
    title: 'CRM System',
    description: 'Our proprietary CRM system with flexible adaptation for specific business areas for effective customer relationship management',
    getConsultation: 'Get a Consultation',
    contactUs: 'Contact Us',
    whyChooseUs: 'Advantages of Our CRM',
    whyChooseUsDescription: 'We offer not just a standard CRM, but a fully customized solution for your business with the possibility of deep customization',
    included: 'Features:',
    adaptationTitle: 'Individual Adaptation for Your Business',
    adaptationDescription: 'We don\'t just implement a standard CRM system, but completely restructure and adapt it to the specifics of your business. Our specialists analyze your business processes and configure the system in such a way that it best meets your needs and helps solve the specific tasks of your company.'
  }
};

export default function CRMSystem() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: advantagesRef, inView: advantagesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: adaptationRef, inView: adaptationInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      transition: { duration: 0.5 }
    }
  };

  const advantagesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const advantageItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const gridCols = isLargeScreen ? 'grid-cols-4' : isMobile ? 'grid-cols-1' : 'grid-cols-2';
  const advantagesGridCols = isLargeScreen ? 'grid-cols-4' : isMobile ? 'grid-cols-1' : 'grid-cols-2';
  const crmFeatures = crmFeaturesData[language as keyof typeof crmFeaturesData];
  const advantages = advantagesData[language as keyof typeof advantagesData];
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="crmsystem" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50" style={{background: 'linear-gradient(to bottom right, #faf5ff, #eef2ff) !important'}}>
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

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`grid ${gridCols} gap-8`}
        >
          {crmFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              style={{backgroundColor: '#ffffff !important'}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4 p-4 bg-white rounded-full shadow-md inline-flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3" style={{color: '#000000 !important'}}>{feature.title}</h3>
                  <p className="text-black mb-6" style={{color: '#000000 !important'}}>{feature.description}</p>
                </div>
                
                <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-black mb-3" style={{color: '#000000 !important'}}>{currentContent.included}</h4>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheckCircle className="text-primary-600 mr-2 mt-1 flex-shrink-0" style={{color: '#0284c7 !important'}} />
                        <span className="text-black" style={{color: '#000000 !important'}}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <a
                    href="mailto:effitechh@gmail.com?subject=Запрос информации о CRM-системе"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary-600 font-medium shadow-sm hover:shadow-md transition-all duration-300 transform ${hoveredCard === index ? 'scale-105' : ''}`}
                    style={{color: '#0284c7 !important', backgroundColor: '#ffffff !important'}}
                  >
                    {feature.buttonText} <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          ref={adaptationRef}
          className="bg-white rounded-xl shadow-lg p-8 mt-16"
          style={{backgroundColor: '#ffffff !important'}}
          initial={{ opacity: 0, y: 40 }}
          animate={adaptationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/3 mb-6 lg:mb-0 flex justify-center">
              <div className="p-4 bg-primary-50 rounded-full inline-flex items-center justify-center" style={{backgroundColor: '#f0f9ff !important'}}>
                <FiSettings className="w-24 h-24 text-primary-600" style={{color: '#0284c7 !important'}} />
              </div>
            </div>
            <div className="lg:w-2/3 lg:pl-8">
              <h3 className="text-2xl font-bold text-black mb-4" style={{color: '#000000 !important'}}>{currentContent.adaptationTitle}</h3>
              <p className="text-black text-lg" style={{color: '#000000 !important'}}>{currentContent.adaptationDescription}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <motion.h3 
              className="text-3xl font-bold text-black mb-4"
              style={{color: '#000000 !important'}}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              ref={advantagesRef}
            >
              {currentContent.whyChooseUs}
            </motion.h3>
            <motion.p 
              className="text-lg text-black max-w-2xl mx-auto"
              style={{color: '#000000 !important'}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentContent.whyChooseUsDescription}
            </motion.p>
          </div>

          <motion.div 
            variants={advantagesVariants}
            initial="hidden"
            animate={advantagesInView ? "visible" : "hidden"}
            className={`grid ${advantagesGridCols} gap-6`}
          >
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index} 
                variants={advantageItemVariants}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                style={{backgroundColor: '#ffffff !important'}}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary-50 rounded-full inline-flex items-center justify-center" style={{backgroundColor: '#f0f9ff !important'}}>
                    {advantage.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-black mb-2" style={{color: '#000000 !important'}}>{advantage.title}</h4>
                  <p className="text-black" style={{color: '#000000 !important'}}>{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <ScrollLink
            to="contacts"
            smooth={true}
            duration={500}
            offset={-70}
            className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #0284c7, #0369a1)',
              color: '#ffffff !important'
            }}
          >
            {currentContent.contactUs} <FiArrowRight className="ml-2" />
          </ScrollLink>
        </div>
      </div>
    </section>
  );
} 