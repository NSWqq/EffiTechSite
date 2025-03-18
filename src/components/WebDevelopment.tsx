'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiLayout, 
  FiShoppingBag, 
  FiGlobe, 
  FiMonitor, 
  FiSmartphone, 
  FiActivity, 
  FiArrowRight, 
  FiCheckCircle 
} from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';

const websiteTypesData = {
  ru: [
    {
      icon: <FiLayout className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Лендинги',
      description: 'Одностраничные сайты для продвижения продуктов, услуг или мероприятий с высокой конверсией.',
      features: [
        'Эффективный дизайн, ориентированный на конверсию',
        'Адаптивность под все устройства',
        'Быстрая загрузка и оптимизация для SEO',
        'Интеграция с аналитикой и системами сбора лидов'
      ],
      gradient: 'from-blue-50 to-blue-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiShoppingBag className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Интернет-магазины',
      description: 'Функциональные онлайн-магазины с удобным каталогом, корзиной и системой оплаты.',
      features: [
        'Удобный каталог товаров с фильтрацией',
        'Корзина и различные способы оплаты',
        'Личный кабинет покупателя',
        'Интеграция с CRM и системами учета'
      ],
      gradient: 'from-indigo-50 to-indigo-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiGlobe className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Корпоративные сайты',
      description: 'Многостраничные сайты для представления компании, её услуг и продуктов в интернете.',
      features: [
        'Стильный дизайн, отражающий корпоративный стиль',
        'Удобная структура и навигация',
        'Интеграция с корпоративными системами',
        'Административная панель управления'
      ],
      gradient: 'from-purple-50 to-purple-100',
      buttonText: 'Подробнее'
    },
    {
      icon: <FiActivity className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Веб-приложения',
      description: 'Сложные веб-системы с функционалом настольных приложений для бизнес-задач.',
      features: [
        'Разработка под конкретные бизнес-процессы',
        'Интерактивный интерфейс и оперативный отклик',
        'Многопользовательский режим работы',
        'Интеграция с существующей инфраструктурой'
      ],
      gradient: 'from-teal-50 to-teal-100',
      buttonText: 'Подробнее'
    }
  ],
  en: [
    {
      icon: <FiLayout className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Landing Pages',
      description: 'Single-page websites for promoting products, services, or events with high conversion.',
      features: [
        'Effective conversion-oriented design',
        'Responsive design for all devices',
        'Fast loading and SEO optimization',
        'Integration with analytics and lead collection systems'
      ],
      gradient: 'from-blue-50 to-blue-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiShoppingBag className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'E-commerce',
      description: 'Functional online stores with a convenient catalog, shopping cart, and payment system.',
      features: [
        'User-friendly product catalog with filtering',
        'Shopping cart and various payment methods',
        'Customer account area',
        'Integration with CRM and accounting systems'
      ],
      gradient: 'from-indigo-50 to-indigo-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiGlobe className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Corporate Websites',
      description: 'Multi-page websites for representing a company, its services, and products online.',
      features: [
        'Stylish design reflecting corporate identity',
        'Convenient structure and navigation',
        'Integration with corporate systems',
        'Administrative control panel'
      ],
      gradient: 'from-purple-50 to-purple-100',
      buttonText: 'Learn More'
    },
    {
      icon: <FiActivity className="w-16 h-16 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Web Applications',
      description: 'Complex web systems with desktop application functionality for business tasks.',
      features: [
        'Development for specific business processes',
        'Interactive interface and responsive feedback',
        'Multi-user operation mode',
        'Integration with existing infrastructure'
      ],
      gradient: 'from-teal-50 to-teal-100',
      buttonText: 'Learn More'
    }
  ]
};

const advantagesData = {
  ru: [
    {
      icon: <FiSmartphone className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Адаптивный дизайн',
      description: 'Все наши сайты отлично выглядят на любых устройствах'
    },
    {
      icon: <FiActivity className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Высокая производительность',
      description: 'Оптимизированный код для быстрой загрузки и плавной работы'
    },
    {
      icon: <FiMonitor className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Современные технологии',
      description: 'Используем передовые фреймворки и инструменты разработки'
    },
    {
      icon: <FiCheckCircle className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'SEO-оптимизация',
      description: 'Сайты с учетом требований поисковых систем для лучшего ранжирования'
    }
  ],
  en: [
    {
      icon: <FiSmartphone className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Responsive Design',
      description: 'All our websites look great on any device'
    },
    {
      icon: <FiActivity className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'High Performance',
      description: 'Optimized code for fast loading and smooth operation'
    },
    {
      icon: <FiMonitor className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'Modern Technologies',
      description: 'We use advanced frameworks and development tools'
    },
    {
      icon: <FiCheckCircle className="w-8 h-8 text-primary-600" style={{color: '#0284c7 !important'}} />,
      title: 'SEO Optimization',
      description: 'Websites that meet search engine requirements for better ranking'
    }
  ]
};

const content = {
  ru: {
    title: 'Разработка сайтов',
    description: 'Создаем современные, адаптивные и высокопроизводительные сайты любой сложности для вашего бизнеса',
    getConsultation: 'Получить консультацию',
    contactUs: 'Связаться с нами',
    whyChooseUs: 'Наши преимущества',
    whyChooseUsDescription: 'Мы создаем не просто красивые сайты, а эффективные инструменты для развития вашего бизнеса',
    included: 'Что включено:'
  },
  en: {
    title: 'Website Development',
    description: 'We create modern, responsive, and high-performance websites of any complexity for your business',
    getConsultation: 'Get a Consultation',
    contactUs: 'Contact Us',
    whyChooseUs: 'Our Advantages',
    whyChooseUsDescription: 'We create not just beautiful websites, but effective tools for growing your business',
    included: 'What\'s included:'
  }
};

export default function WebDevelopment() {
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
  const websiteTypes = websiteTypesData[language as keyof typeof websiteTypesData];
  const advantages = advantagesData[language as keyof typeof advantagesData];
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="webdevelopment" className="py-20 bg-gradient-to-br from-blue-50 to-sky-50" style={{background: 'linear-gradient(to bottom right, #eff6ff, #f0f9ff) !important'}}>
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
          {websiteTypes.map((type, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`bg-gradient-to-br ${type.gradient} rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              style={{backgroundColor: '#ffffff !important'}}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-8">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="mb-4 p-4 bg-white rounded-full shadow-md inline-flex items-center justify-center">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3" style={{color: '#000000 !important'}}>{type.title}</h3>
                  <p className="text-black mb-6" style={{color: '#000000 !important'}}>{type.description}</p>
                </div>
                
                <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-black mb-3" style={{color: '#000000 !important'}}>{currentContent.included}</h4>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <FiCheckCircle className="text-primary-600 mr-2 mt-1 flex-shrink-0" style={{color: '#0284c7 !important'}} />
                        <span className="text-black" style={{color: '#000000 !important'}}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <a
                    href="mailto:sales@efficore.pro?subject=Запрос информации о веб-разработке"
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary-600 font-medium shadow-sm hover:shadow-md transition-all duration-300 transform ${hoveredCard === index ? 'scale-105' : ''}`}
                    style={{color: '#0284c7 !important', backgroundColor: '#ffffff !important'}}
                  >
                    {type.buttonText} <FiArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
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