'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';

const content = {
  ru: {
    title: 'Свяжитесь с нами',
    description: 'Оставьте заявку, и мы свяжемся с вами для обсуждения вашего проекта',
    contactInfo: 'Контактная информация',
    email: 'Email',
    phone: 'Телефон',
    phoneValue: 'По запросу',
    promoText: 'Оставьте заявку сегодня и получите бесплатную консультацию по автоматизации вашего бизнеса',
    thankYou: 'Спасибо за заявку!',
    thankYouMessage: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время.',
    yourName: 'Ваше имя',
    message: 'Сообщение',
    sending: 'Отправка...',
    submit: 'Отправить заявку'
  },
  en: {
    title: 'Contact Us',
    description: 'Leave a request, and we will contact you to discuss your project',
    contactInfo: 'Contact Information',
    email: 'Email',
    phone: 'Phone',
    phoneValue: 'On request',
    promoText: 'Submit a request today and get a free consultation on automating your business',
    thankYou: 'Thank you for your request!',
    thankYouMessage: 'We have received your message and will contact you shortly.',
    yourName: 'Your name',
    message: 'Message',
    sending: 'Sending...',
    submit: 'Submit request'
  }
};

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      // В реальном проекте здесь будет отправка данных на сервер
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Открываем почтовый клиент с предзаполненными данными
      const subject = language === 'ru' 
        ? `Запрос от ${formData.name}`
        : `Request from ${formData.name}`;
      const body = language === 'ru'
        ? `Имя: ${formData.name}\nEmail: ${formData.email}\nТелефон: ${formData.phone}\n\nСообщение:\n${formData.message}`
        : `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:effitechh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Сбрасываем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Сбрасываем состояние отправки через 3 секунды
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const titleSize = isMobile ? 'text-3xl' : 'text-4xl';
  const gridCols = isMobile ? 'grid-cols-1' : 'grid-cols-5';
  const colSpan = isMobile ? '' : 'col-span-2';
  const colSpanForm = isMobile ? '' : 'col-span-3';
  const flexDirection = isMobile ? 'flex-col' : 'flex-row';
  const marginBottom = isMobile ? 'mb-4' : 'mb-0';
  const currentContent = content[language as keyof typeof content];

  return (
    <section id="contacts" className="py-20 bg-secondary-50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className={`${titleSize} font-bold text-white mb-4`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentContent.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-white max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentContent.description}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className={`grid ${gridCols}`}>
              <div className={`${colSpan} bg-white p-8`}>
                <h3 className="text-2xl font-bold mb-6 text-black">{currentContent.contactInfo}</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center mb-4">
                    <FiMail className="text-black mr-2 text-xl" />
                    <div>
                      <h3 className="font-medium text-black">Email:</h3>
                      <a href="mailto:effitechh@gmail.com" className="hover:underline text-black">
                        effitechh@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="w-5 h-5 mr-3 mt-1 text-black" />
                    <div>
                      <p className="font-medium text-black">{currentContent.phone}</p>
                      <p className="text-black">{currentContent.phoneValue}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <p className="text-sm text-black">
                    {currentContent.promoText}
                  </p>
                </div>
              </div>
              <div className={`${colSpanForm} p-8`}>
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                      <FiSend className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">{currentContent.thankYou}</h3>
                    <p className="text-black">
                      {currentContent.thankYouMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                          {currentContent.yourName}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-black"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-black"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                          {currentContent.phone}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-black"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-black mb-1">
                          {currentContent.message}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-black"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary-600 text-black py-3 px-6 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center border-2 border-black"
                        >
                          {isSubmitting ? (
                            <span className="inline-flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {currentContent.sending}
                            </span>
                          ) : (
                            <span className="inline-flex items-center">
                              {currentContent.submit} <FiSend className="ml-2" />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 