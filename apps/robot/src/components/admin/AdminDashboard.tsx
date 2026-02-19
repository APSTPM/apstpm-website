import { getTranslations } from 'next-intl/server';
import { getPostStats } from '@/lib/queries/qa';
import { Card, CardContent } from '@apstpm-website/ui';
import { MessageSquare, Clock, CheckCircle, CalendarPlus } from 'lucide-react';

export default async function AdminDashboard() {
  const t = await getTranslations('Admin');
  const stats = await getPostStats();

  const cards = [
    { label: t('totalQuestions'), value: stats.total, icon: MessageSquare, color: 'text-blue-600 bg-blue-50' },
    { label: t('pendingQuestions'), value: stats.open, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: t('answeredQuestions'), value: stats.answered, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: t('todayQuestions'), value: stats.today, icon: CalendarPlus, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
