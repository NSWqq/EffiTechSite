'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiMessageSquare, 
  FiServer, 
  FiCpu, 
  FiActivity, 
  FiArrowRight, 
  FiCheckCircle, 
  FiUsers, 
  FiSettings, 
  FiLifeBuoy 
} from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';

const servicesData = {
  ru: [
    {
      icon: <FiServer className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Индивидуальные системы автоматизации',
      description: 'Разрабатываем уникальные решения под ваши бизнес-процессы, учитывая все особенности вашей компании.',
      features: [
        'Анализ текущих процессов',
        'Разработка оптимальной архитектуры',
        'Интеграция с существующими системами',
        'Масштабируемость и гибкость'
      ],
      gradient: 'from-blue-50 to-blue-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiMessageSquare className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Автоматизация Telegram',
      description: 'Создаем ботов и системы управления для эффективной работы с Telegram-каналами и рекламой.',
      features: [
        'Боты с искусственным интеллектом',
        'Автоматическое управление каналами',
        'Системы для размещения рекламы',
        'Аналитика и отчетность'
      ],
      gradient: 'from-indigo-50 to-indigo-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiCpu className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Интеграция искусственного интеллекта',
      description: 'Внедряем ИИ-решения для оптимизации бизнес-процессов и повышения эффективности.',
      features: [
        'Анализ данных и прогнозирование',
        'Автоматическая обработка документов',
        'Чат-боты и виртуальные ассистенты',
        'Системы принятия решений'
      ],
      gradient: 'from-purple-50 to-purple-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiActivity className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Полный цикл разработки',
      description: 'Сопровождаем проект от анализа бизнеса до внедрения и поддержки готового решения.',
      features: [
        'Бизнес-анализ и консультации',
        'Проектирование и разработка',
        'Тестирование и внедрение',
        'Техническая поддержка и обновления'
      ],
      gradient: 'from-teal-50 to-teal-100',
      buttonText: 'Подробнее'
    }
  ],
  en: [
    {
      icon: <FiServer className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Custom Automation Systems',
      description: 'We develop unique solutions for your business processes, taking into account all the features of your company.',
      features: [
        'Analysis of current processes',
        'Development of optimal architecture',
        'Integration with existing systems',
        'Scalability and flexibility'
      ],
      gradient: 'from-blue-50 to-blue-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiMessageSquare className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Telegram Automation',
      description: 'We create bots and management systems for efficient work with Telegram channels and advertising.',
      features: [
        'AI-powered bots',
        'Automatic channel management',
        'Advertising placement systems',
        'Analytics and reporting'
      ],
      gradient: 'from-indigo-50 to-indigo-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiCpu className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'AI Integration',
      description: 'We implement AI solutions to optimize business processes and increase efficiency.',
      features: [
        'Data analysis and forecasting',
        'Automatic document processing',
        'Chatbots and virtual assistants',
        'Decision-making systems'
      ],
      gradient: 'from-purple-50 to-purple-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiActivity className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Full Development Cycle',
      description: 'We accompany the project from business analysis to implementation and support of the finished solution.',
      features: [
        'Business analysis and consulting',
        'Design and development',
        'Testing and implementation',
        'Technical support and updates'
      ],
      gradient: 'from-teal-50 to-teal-100',
      buttonText: 'Learn More'
    }
  ]
};

const advantagesData = {
  ru: [
    {
      icon: <FiUsers className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Индивидуальный подход',
      description: 'Каждое решение адаптируется под конкретные задачи клиента'
    },
    {
      icon: <FiSettings className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Гибкость',
      description: 'Используем как готовые платформы, так и разрабатываем системы с нуля'
    },
    {
      icon: <FiCpu className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Интеграция ИИ',
      description: 'Внедряем интеллектуальные системы для анализа данных и автоматизации'
    },
    {
      icon: <FiLifeBuoy className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Полное сопровождение',
      description: 'Обеспечиваем поддержку на всех этапах внедрения и после'
    }
  ],
  en: [
    {
      icon: <FiUsers className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Individual Approach',
      description: 'Each solution is adapted to the specific needs of the client'
    },
    {
      icon: <FiSettings className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Flexibility',
      description: 'We use both ready-made platforms and develop systems from scratch'
    },
    {
      icon: <FiCpu className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'AI Integration',
      description: 'We implement intelligent systems for data analysis and automation'
    },
    {
      icon: <FiLifeBuoy className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Full Support',
      description: 'We provide support at all stages of implementation and beyond'
    }
  ]
};

const content = {
  ru: {
    title: 'Системы Автоматизации',
    description: 'Мы предлагаем комплексные решения для автоматизации бизнес-процессов, разработки веб-сайтов и CRM-систем, которые помогут вашей компании работать эффективнее',
    getConsultation: 'Получить консультацию',
    contactUs: 'Связаться с нами',
    whyChooseUs: 'Почему выбирают нас',
    whyChooseUsDescription: 'Наш подход к разработке основан на глубоком понимании потребностей клиентов и использовании современных технологий',
    included: 'Что включено:'
  },
  en: {
    title: 'Automation Systems',
    description: 'We offer comprehensive solutions for business process automation, website development and CRM systems that will help your company work more efficiently',
    getConsultation: 'Get a Consultation',
    contactUs: 'Contact Us',
    whyChooseUs: 'Why Choose Us',
    whyChooseUsDescription: 'Our approach to development is based on a deep understanding of client needs and the use of modern technologies',
    included: 'What\'s included:'
  }
};

export default function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: advantagesRef, inView: advantagesInView } = useInView({
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
      transition: { duration: 0.6 }
    }
  };

  const advantagesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
  const textSize = isMobile ? 'text-lg' : 'text-xl';
  const gridCols = isLargeScreen ? 'grid-cols-2' : 'grid-cols-1';
  const advantagesGridCols = isLargeScreen ? 'grid-cols-4' : isMobile ? 'grid-cols-1' : 'grid-cols-2';
  const services = servicesData[language as keyof typeof servicesData];
  const advantages = advantagesData[language as keyof typeof advantagesData];
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="services" className="py-20 bg-secondary-50" style={{backgroundColor: '#f8fafc !important'}}>
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
            className={`${textSize} text-black max-w-2xl mx-auto`}
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
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`bg-gradient-to-br ${service.gradient} rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              style={{backgroundColor: '#ffffff !important'}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4 p-4 bg-white rounded-full shadow-md inline-flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3" style={{color: '#000000 !important'}}>{service.title}</h3>
                  <p className="text-black mb-6" style={{color: '#000000 !important'}}>{service.description}</p>
                </div>
                
                <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-black mb-3" style={{color: '#000000 !important'}}>{currentContent.included}</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheckCircle className="text-primary-600 mr-2 mt-1 flex-shrink-0" style={{color: '#0284c7 !important'}} />
                        <span className="text-black" style={{color: '#000000 !important'}}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <a
                    href="mailto:sales@efficore.pro?subject=Запрос информации о услуге"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary-600 font-medium shadow-sm hover:shadow-md transition-all duration-300 transform ${hoveredCard === index ? 'scale-105' : ''}`}
                    style={{color: '#0284c7 !important', backgroundColor: '#ffffff !important'}}
                  >
                    {service.buttonText} <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <motion.h3 
              className="text-3xl font-bold text-black mb-4"
              style={{color: '#000000 !important'}}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
            ref={advantagesRef}
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