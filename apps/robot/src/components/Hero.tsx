'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Users } from 'lucide-react';
import { Button } from '@apstpm-website/ui';
import { Link } from '@/i18n/routing';
import type { ContactInfo, CompetitionInfo } from '@/lib/content';

interface HeroProps {
  contactInfo: ContactInfo;
  competitionInfo: CompetitionInfo | null;
}

export default function Hero({ contactInfo, competitionInfo }: HeroProps) {
  const t = useTranslations('Home');
  const locale = useLocale();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-robot-50 via-white to-robot-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-robot-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-robot-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-robot-400/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0284c7 1px, transparent 1px),
              linear-gradient(to bottom, #0284c7 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-robot-100 rounded-full">
              <Award className="w-4 h-4 text-robot-600" />
              <span className="text-robot-700 text-sm font-medium">
                {t('year')} <span className="font-bold">{t('year')}</span>
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold text-gray-900 font-display leading-tight"
            >
              {t('title')}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-lg"
            >
              {t('subtitle')}
            </motion.p>

            {/* Organization Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-robot-100">
                <p className="text-xs text-gray-500 mb-1">{t('organizer')}</p>
                <p className="text-sm font-semibold text-gray-900">{contactInfo.organizer.name}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-robot-100">
                <p className="text-xs text-gray-500 mb-1">{t('coOrganizer')}</p>
                <p className="text-sm font-semibold text-gray-900">{contactInfo.coOrganizer.name}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-robot-100">
                <p className="text-xs text-gray-500 mb-1">{t('cooperator')}</p>
                <p className="text-sm font-semibold text-gray-900">{contactInfo.cooperator.name}</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/rules">
                <Button size="lg" className="bg-robot-600 hover:bg-robot-700">
                  {t('viewRules')}
                </Button>
              </Link>
              <Link href="/announcements">
                <Button size="lg" variant="outline" className="border-robot-300 text-robot-700 hover:bg-robot-50">
                  {t('viewAnnouncements')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Competition Timeline Card */}
          <motion.div variants={itemVariants} className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-robot-100 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-robot-100 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-robot-50 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 font-display">
                  {t('competitionInfo')}
                </h3>

                {/* Registration Period */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-robot-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-robot-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('registrationPeriod')}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {competitionInfo ? (
                        <>
                          {new Date(competitionInfo.registrationPeriod.start).toLocaleDateString(locale, { month: 'long', day: 'numeric' })} - 
                          {new Date(competitionInfo.registrationPeriod.end).toLocaleDateString(locale, { month: 'long', day: 'numeric' })}
                        </>
                      ) : '-'}
                    </p>
                  </div>
                </div>

                {/* Competition Dates */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-robot-100 rounded-xl">
                    <Users className="w-6 h-6 text-robot-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('competitionPeriod')}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {competitionInfo ? (
                        <>
                          {new Date(competitionInfo.competitionDates.start).toLocaleDateString(locale, { month: 'long', day: 'numeric' })} - 
                          {new Date(competitionInfo.competitionDates.end).toLocaleDateString(locale, { month: 'long', day: 'numeric' })}
                        </>
                      ) : '-'}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-robot-100 rounded-xl">
                    <MapPin className="w-6 h-6 text-robot-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('location')}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {competitionInfo?.venue || '-'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link href="/competition">
                    <Button variant="ghost" className="text-robot-600 hover:text-robot-700 w-full justify-center">
                      {t('learnMore')} →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-robot-500 rounded-2xl shadow-lg flex items-center justify-center"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
