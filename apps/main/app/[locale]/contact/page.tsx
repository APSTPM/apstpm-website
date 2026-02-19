'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contact');

  const contactInfo = [
    {icon: '📍', label: t('info.address'), value: '123 Energy Innovation Center, Singapore 138589'},
    {icon: '📞', label: t('info.phone'), value: '+65 6123 4567'},
    {icon: '✉️', label: t('info.email'), value: 'info@apstpm.org'},
  ];

  const offices = [
    {name: t('offices.hk'), email: 'hongkong@apstpm.org'},
    {name: t('offices.tw'), email: 'taiwan@apstpm.org'},
    {name: t('offices.sg'), email: 'singapore@apstpm.org'},
    {name: t('offices.jp'), email: 'japan@apstpm.org'},
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative py-24 px-4 bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-display mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}>
              <h2 className="text-2xl font-bold text-brand-700 font-display mb-8">{t('info.title')}</h2>
              <div className="space-y-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 flex items-start gap-4 border border-gray-100 shadow-sm">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h4 className="text-brand-700 text-sm font-semibold mb-1">{info.label}</h4>
                      <p className="text-gray-600 text-sm">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 0.2}}>
              <h3 className="text-xl font-bold text-brand-700 font-display mb-4">{t('offices.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {offices.map((office, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                    <h4 className="text-brand-700 text-sm font-semibold mb-1">{office.name}</h4>
                    <p className="text-gray-500 text-xs">{office.email}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
