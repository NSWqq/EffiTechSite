'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle, FiUsers, FiSettings, FiBriefcase, FiCpu, FiLifeBuoy } from 'react-icons/fi';

const advantagesData = {
  ru: [
    {
      icon: <FiUsers className="w-6 h-6 text-black" />,
      title: 'Индивидуальный подход',
      description: 'Каждое решение адаптируется под конкретные задачи клиента'
    },
    {
      icon: <FiSettings className="w-6 h-6 text-black" />,
      title: 'Гибкость',
      description: 'Используем как готовые платформы, так и разрабатываем системы с нуля'
    },
    {
      icon: <FiCpu className="w-6 h-6 text-black" />,
      title: 'Интеграция ИИ',
      description: 'Внедряем интеллектуальные системы для анализа данных и автоматизации'
    },
    {
      icon: <FiLifeBuoy className="w-6 h-6 text-black" />,
      title: 'Полное сопровождение',
      description: 'Обеспечиваем поддержку на всех этапах внедрения и после'
    },
    {
      icon: <FiBriefcase className="w-6 h-6 text-black" />,
      title: 'Техническая экспертиза',
      description: 'Гарантируем стабильную работу систем и оперативное устранение неполадок'
    },
    {
      icon: <FiCheckCircle className="w-6 h-6 text-black" />,
      title: 'Анализ бизнеса',
      description: 'Проводим глубокий анализ бизнес-процессов для оптимальных решений'
    }
  ],
  en: [
    {
      icon: <FiUsers className="w-6 h-6 text-black" />,
      title: 'Individual Approach',
      description: 'Each solution is adapted to the specific needs of the client'
    },
    {
      icon: <FiSettings className="w-6 h-6 text-black" />,
      title: 'Flexibility',
      description: 'We use both ready-made platforms and develop systems from scratch'
    },
    {
      icon: <FiCpu className="w-6 h-6 text-black" />,
      title: 'AI Integration',
      description: 'We implement intelligent systems for data analysis and automation'
    },
    {
      icon: <FiLifeBuoy className="w-6 h-6 text-black" />,
      title: 'Full Support',
      description: 'We provide support at all stages of implementation and beyond'
    },
    {
      icon: <FiBriefcase className="w-6 h-6 text-black" />,
      title: 'Technical Expertise',
      description: 'We guarantee stable system operation and prompt troubleshooting'
    },
    {
      icon: <FiCheckCircle className="w-6 h-6 text-black" />,
      title: 'Business Analysis',
      description: 'We conduct in-depth analysis of business processes for optimal solutions'
    }
  ]
};

const content = {
  ru: {
    title: 'О компании',
    description: 'Наша компания специализируется на разработке и внедрении систем автоматизации для бизнеса, помогая компаниям оптимизировать процессы и повысить эффективность.'
  },
  en: {
    title: 'About Us',
    description: 'Our company specializes in the development and implementation of automation systems for businesses, helping companies optimize processes and increase efficiency.'
  }
};

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  const handleCardTap = (index: number) => {
    if (isMobile) {
      if (activeCard === index) {
        setActiveCard(null);
      } else {
        setActiveCard(index);
      }
      
      // Автоматически сбрасываем активную карточку через 2 секунды
      if (activeCard !== index) {
        setTimeout(() => {
          setActiveCard(null);
        }, 2000);
      }
    }
  };

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const advantages = advantagesData[language as keyof typeof advantagesData];

  return (
    <section id="about" className="py-20 bg-white" style={{backgroundColor: '#ffffff !important'}}>
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className={`${titleSize} font-bold text-black mb-4`}
            style={{color: '#000000 !important'}}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content[language as keyof typeof content].title}
          </motion.h2>
          <motion.p 
            className="text-lg text-black max-w-2xl mx-auto"
            style={{color: '#000000 !important'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content[language as keyof typeof content].description}
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`grid ${getGridCols()} gap-8`}
        >
          {advantages.map((advantage, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`bg-secondary-50 p-6 rounded-lg transition-all duration-300 ${
                isMobile 
                  ? activeCard === index 
                    ? 'shadow-lg scale-[1.03] bg-secondary-100' 
                    : 'shadow-sm active:shadow-md' 
                  : 'hover:shadow-md'
              }`}
              style={{backgroundColor: '#f8fafc !important'}}
              onClick={() => handleCardTap(index)}
              whileTap={isMobile ? { scale: 1.03 } : {}}
            >
              <div className="flex items-start">
                <div className={`mr-4 mt-1 transition-transform duration-300 ${activeCard === index && isMobile ? 'scale-125' : ''}`}>
                  {advantage.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold text-black mb-2 transition-colors duration-300 ${activeCard === index && isMobile ? 'text-primary-600' : ''}`} style={{color: '#000000 !important'}}>
                    {advantage.title}
                  </h3>
                  <p className="text-black" style={{color: '#000000 !important'}}>{advantage.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 