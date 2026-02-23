'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building2, Handshake, Users } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@apstpm-website/ui';
import { Badge } from '@apstpm-website/ui';
import type { ContactInfo } from '@/lib/content';

interface ContactPageContentProps {
  contactInfo: ContactInfo | null;
}

export default function ContactPageContent({ contactInfo }: ContactPageContentProps) {
  const t = useTranslations('Contact');
  const tNav = useTranslations('Navigation');
  const tHome = useTranslations('Home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!contactInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t('loading') || '載入中...'}</p>
      </div>
    );
  }

  const orgUnits = [
    {
      key: 'organizer',
      label: tHome('organizer'),
      icon: Building2,
      data: contactInfo.organizer,
      color: 'bg-robot-600',
    },
    {
      key: 'coOrganizer',
      label: tHome('coOrganizer'),
      icon: Handshake,
      data: contactInfo.coOrganizer,
      color: 'bg-robot-500',
    },
    {
      key: 'cooperator',
      label: tHome('cooperator'),
      icon: Users,
      data: contactInfo.cooperator,
      color: 'bg-robot-400',
    },
  ];

  const contactDetails = [
    {
      icon: Mail,
      label: t('email'),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: t('phone'),
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: MapPin,
      label: t('address'),
      value: contactInfo.address,
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-robot-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-robot-600/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">
            {tNav('contact')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('title')}
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Organization Units */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-robot-600" />
              {t('organization')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {orgUnits.map((org) => (
                <Card
                  key={org.key}
                  className="border-robot-200 hover:border-robot-400 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 ${org.color} rounded-lg`}>
                        <org.icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="outline" className="border-robot-300 text-robot-700">
                        {org.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900">
                      {org.data.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-robot-600" />
              {t('contactInfo')}
            </h2>
            <Card className="border-robot-200">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {contactDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 flex items-start gap-4 hover:bg-robot-50/50 transition-colors"
                    >
                      <div className="p-2 bg-robot-100 rounded-lg shrink-0">
                        <detail.icon className="w-5 h-5 text-robot-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{detail.label}</p>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="text-gray-900 font-medium hover:text-robot-600 transition-colors"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-medium">{detail.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Additional Info */}
          <motion.section variants={itemVariants}>
            <Card className="bg-robot-600 border-robot-600">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('getInTouch')}
                </h3>
                <p className="text-robot-100 mb-6">
                  {t('getInTouchDesc')}
                </p>
                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-robot-700 px-6 py-3 rounded-xl font-semibold hover:bg-robot-50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {t('sendMessage')}
                </motion.a>
              </CardContent>
            </Card>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
