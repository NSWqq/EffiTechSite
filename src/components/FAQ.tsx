'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi';

const faqsData = {
  ru: [
    {
      question: 'Как долго занимает внедрение системы автоматизации?',
      answer: 'Сроки внедрения зависят от сложности проекта и требований. Простые решения могут быть реализованы за 1-2 недели, в то время как комплексные системы могут занять 1-3 месяца. Мы всегда предоставляем детальный план работ с указанием сроков на этапе обсуждения проекта.'
    },
    {
      question: 'Сколько стоит автоматизация бизнес-процессов?',
      answer: 'Стоимость зависит от объема и сложности работ. Мы предлагаем индивидуальный расчет для каждого проекта после анализа ваших потребностей. Свяжитесь с нами для получения бесплатной консультации и предварительной оценки стоимости.'
    },
    {
      question: 'Какие бизнес-процессы можно автоматизировать?',
      answer: 'Практически любые повторяющиеся процессы могут быть автоматизированы: обработка данных, коммуникация с клиентами, управление задачами, документооборот, маркетинг, продажи, HR-процессы и многое другое. Мы проводим анализ вашего бизнеса и предлагаем оптимальные решения.'
    },
    {
      question: 'Какие услуги по разработке сайтов вы предлагаете?',
      answer: 'Мы предлагаем широкий спектр услуг по разработке веб-сайтов: корпоративные сайты, интернет-магазины, лендинги, порталы и веб-приложения. Все наши сайты адаптивны, оптимизированы для SEO и разрабатываются с учетом современных требований к безопасности и производительности.'
    },
    {
      question: 'Как происходит разработка индивидуальных CRM-систем?',
      answer: 'Процесс разработки CRM включает несколько этапов: анализ бизнес-процессов, проектирование архитектуры, разработка интерфейса, программирование функциональности, тестирование и внедрение. Мы создаем системы с учетом специфики вашего бизнеса, чтобы максимально автоматизировать рабочие процессы и повысить эффективность.'
    },
    {
      question: 'Нужно ли обучение сотрудников для работы с новой системой?',
      answer: 'Да, мы предоставляем полное обучение ваших сотрудников работе с внедренными системами. Наша цель — сделать переход максимально комфортным. Мы также предоставляем документацию и видеоинструкции для самостоятельного изучения.'
    },
    {
      question: 'Как происходит поддержка после внедрения?',
      answer: 'Мы предлагаем различные пакеты технической поддержки, включающие мониторинг работы системы, оперативное устранение неполадок, консультации и обновления. Условия поддержки обсуждаются индивидуально и фиксируются в договоре.'
    },
    {
      question: 'Можно ли интегрировать новую систему с уже используемыми в компании программами?',
      answer: 'Да, мы специализируемся на интеграции различных систем. Наши решения могут быть интегрированы с большинством популярных CRM, ERP, бухгалтерских программ и других систем, которые вы уже используете.'
    },
    {
      question: 'Какие технологии вы используете для разработки?',
      answer: 'Мы используем современный стек технологий: React, Next.js, Node.js, Python, Django, Laravel, PostgreSQL, MongoDB и другие. Выбор технологий зависит от задач проекта и требований к производительности, масштабируемости и безопасности.'
    }
  ],
  en: [
    {
      question: 'How long does it take to implement an automation system?',
      answer: 'Implementation times depend on the complexity of the project and requirements. Simple solutions can be implemented in 1-2 weeks, while complex systems can take 1-3 months. We always provide a detailed work plan with deadlines at the project discussion stage.'
    },
    {
      question: 'How much does business process automation cost?',
      answer: 'The cost depends on the scope and complexity of the work. We offer individual calculations for each project after analyzing your needs. Contact us for a free consultation and preliminary cost estimate.'
    },
    {
      question: 'What business processes can be automated?',
      answer: 'Almost any repetitive processes can be automated: data processing, customer communication, task management, document flow, marketing, sales, HR processes, and much more. We analyze your business and offer optimal solutions.'
    },
    {
      question: 'What website development services do you offer?',
      answer: 'We offer a wide range of website development services: corporate websites, e-commerce stores, landing pages, portals, and web applications. All our websites are responsive, SEO-optimized, and developed with modern security and performance requirements in mind.'
    },
    {
      question: 'How does custom CRM system development work?',
      answer: 'The CRM development process includes several stages: business process analysis, architecture design, interface development, functionality programming, testing, and implementation. We create systems tailored to your business specifics to maximize the automation of work processes and increase efficiency.'
    },
    {
      question: 'Do employees need training to work with the new system?',
      answer: 'Yes, we provide complete training for your employees to work with the implemented systems. Our goal is to make the transition as comfortable as possible. We also provide documentation and video instructions for self-study.'
    },
    {
      question: 'How does support work after implementation?',
      answer: 'We offer various technical support packages, including system monitoring, prompt troubleshooting, consultations, and updates. Support conditions are discussed individually and fixed in the contract.'
    },
    {
      question: 'Can the new system be integrated with programs already used in the company?',
      answer: 'Yes, we specialize in integrating various systems. Our solutions can be integrated with most popular CRM, ERP, accounting programs, and other systems that you already use.'
    },
    {
      question: 'What technologies do you use for development?',
      answer: 'We use a modern technology stack: React, Next.js, Node.js, Python, Django, Laravel, PostgreSQL, MongoDB, and others. The choice of technologies depends on project requirements and needs for performance, scalability, and security.'
    }
  ]
};

const content = {
  ru: {
    title: 'Часто задаваемые вопросы',
    description: 'Ответы на популярные вопросы о наших услугах и процессе работы',
    notFoundQuestion: 'Не нашли ответ на свой вопрос?',
    writeToUs: 'Напишите нам, и мы ответим на все ваши вопросы'
  },
  en: {
    title: 'Frequently Asked Questions',
    description: 'Answers to popular questions about our services and work process',
    notFoundQuestion: 'Didn\'t find the answer to your question?',
    writeToUs: 'Write to us, and we will answer all your questions'
  }
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const faqs = faqsData[language as keyof typeof faqsData];
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="faq" className="py-20 bg-white" style={{backgroundColor: '#ffffff !important'}}>
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

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-secondary-200 rounded-lg overflow-hidden"
                style={{borderColor: '#e2e8f0 !important'}}
              >
                <button
                  className={`w-full flex justify-between items-center p-5 text-left focus:outline-none ${
                    activeIndex === index ? 'bg-primary-50' : 'bg-white'
                  }`}
                  style={activeIndex === index 
                    ? {backgroundColor: '#f0f9ff !important'} 
                    : {backgroundColor: '#ffffff !important'}}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-black" style={{color: '#000000 !important'}}>{faq.question}</span>
                  {activeIndex === index ? (
                    <FiChevronUp className="text-black flex-shrink-0" style={{color: '#000000 !important'}} />
                  ) : (
                    <FiChevronDown className="text-black flex-shrink-0" style={{color: '#000000 !important'}} />
                  )}
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-secondary-200" style={{borderColor: '#e2e8f0 !important'}}>
                        <p className="text-black" style={{color: '#000000 !important'}}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-black mb-4" style={{color: '#000000 !important'}}>{currentContent.notFoundQuestion}</p>
            <a 
              className="text-black font-medium hover:text-primary-700 transition-colors inline-flex items-center"
              href="mailto:sales@efficore.pro?subject=Вопрос о услугах"
              style={{color: '#000000 !important'}}
            >
              {currentContent.writeToUs} <FiArrowRight className="ml-2" style={{color: '#000000 !important'}} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}