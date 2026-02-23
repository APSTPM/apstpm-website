'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Megaphone, History, ArrowRight } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@apstpm-website/ui';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CompetitionTimeline from '@/components/CompetitionTimeline';
import type { Announcement, ContactInfo, CompetitionInfo } from '@/lib/content';

interface HomePageContentProps {
  announcements: Announcement[];
  contactInfo: ContactInfo | null;
  competitionInfo: CompetitionInfo | null;
}

export default function HomePageContent({
  announcements,
  contactInfo,
  competitionInfo,
}: HomePageContentProps) {
  const t = useTranslations('Home');

  const quickLinks = [
    {
      icon: FileText,
      label: t('viewRules'),
      href: '/rules',
      description: t('viewRules'),
      color: 'bg-robot-600 hover:bg-robot-700',
    },
    {
      icon: Megaphone,
      label: t('viewAnnouncements'),
      href: '/announcements',
      description: t('viewAnnouncements'),
      color: 'bg-robot-700 hover:bg-robot-800',
    },
    {
      icon: History,
      label: t('viewHistory'),
      href: '/history',
      description: t('viewHistory'),
      color: 'bg-robot-800 hover:bg-robot-900',
    },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {contactInfo && <Hero contactInfo={contactInfo} competitionInfo={competitionInfo} />}

      {/* Quick Links Section */}
      <section className="py-16 bg-robot-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 font-display mb-3">
              {t('quickLinks')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={link.href} className="block group">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
                    <div className={`${link.color} p-8 text-white transition-transform duration-300 group-hover:scale-105`}>
                      <link.icon className="w-12 h-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">{link.label}</h3>
                      <p className="text-white/80">{link.description}</p>
                    </div>
                    <CardContent className="p-4 bg-white">
                      <div className="flex items-center text-robot-600 font-medium">
                        <span>{t('learnMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Timeline Section */}
      <CompetitionTimeline competitionInfo={competitionInfo} />

      {/* Latest News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-display mb-3">
                {t('latestNews')}
              </h2>
              <p className="text-gray-600">{t('latestNewsSubtitle')}</p>
            </div>
            <Link href="/announcements">
              <Button variant="ghost" className="text-robot-600 mt-4 md:mt-0">
                {t('readMore')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {announcements.slice(0, 3).map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/announcements/${announcement.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 overflow-hidden">
                    <div className="h-2 bg-robot-600" />
                    <CardHeader>
                      <p className="text-sm text-robot-600 font-medium mb-2">
                        {formatDate(announcement.publishedAt)}
                      </p>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-robot-600 transition-colors">
                        {announcement.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-robot-600 font-medium">
                        <span>{t('readMore')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {announcements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">{t('noAnnouncements')}</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
