import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {notFound} from 'next/navigation';

const competitions: Record<string, {
  title: Record<string, string>;
  description: Record<string, string>;
  fullDescription: Record<string, string>;
  date: string;
  endDate: string;
  location: Record<string, string>;
  organizer: string;
  status: string;
  schedule: {time: string; event: Record<string, string>}[];
  prizes: {place: string; amount: string}[];
  requirements: Record<string, string>;
}> = {
  'smart-grid-innovation-2026': {
    title: {en: 'Smart Grid Innovation Challenge 2026', 'zh-TW': '智慧電網創新挑戰賽 2026'},
    description: {en: 'Showcase innovative solutions for modern power grid challenges.', 'zh-TW': '展示現代電網挑戰的創新解決方案。'},
    fullDescription: {
      en: 'The Smart Grid Innovation Challenge invites researchers, engineers, and students to develop innovative solutions for modern power grid challenges. Participants will have the opportunity to present their ideas to industry experts and compete for prestigious prizes.',
      'zh-TW': '智慧電網創新挑戰賽邀請研究人員、工程師和學生開發現代電網挑戰的創新解決方案。參賽者將有機會向產業專家展示他們的想法，並競爭獎項。'
    },
    date: '2026-03-15', endDate: '2026-03-17',
    location: {en: 'Singapore', 'zh-TW': '新加坡'},
    organizer: 'APSTPM', status: 'open',
    schedule: [
      {time: 'Day 1', event: {en: 'Registration & Opening Ceremony', 'zh-TW': '報到與開幕式'}},
      {time: 'Day 2', event: {en: 'Competition & Workshop', 'zh-TW': '競賽與工作坊'}},
      {time: 'Day 3', event: {en: 'Final Presentation & Awards', 'zh-TW': '決賽展示與頒獎'}}
    ],
    prizes: [{place: '1st', amount: '$10,000'}, {place: '2nd', amount: '$5,000'}, {place: '3rd', amount: '$2,500'}],
    requirements: {en: 'Teams of 2-5 members. Open to students, researchers, and professionals.', 'zh-TW': '2-5人團隊。開放給學生、研究人員和專業人士。'}
  },
  'energy-efficiency-hackathon': {
    title: {en: 'Energy Efficiency Hackathon', 'zh-TW': '能源效率黑客松'},
    description: {en: '24-hour hackathon focused on reducing energy consumption.', 'zh-TW': '為期24小時的黑客松，專注於減少能源消耗。'},
    fullDescription: {en: 'Join us for an intense 24-hour hackathon focused on developing solutions to reduce energy consumption in buildings, factories, and transportation systems.', 'zh-TW': '加入我們為期24小時的黑客松，專注於開發減少建築、工廠和交通運輸系統能源消耗的解決方案。'},
    date: '2026-04-20', endDate: '2026-04-21',
    location: {en: 'Tokyo, Japan', 'zh-TW': '日本東京'},
    organizer: 'APSTPM', status: 'open',
    schedule: [
      {time: 'Day 1 09:00', event: {en: 'Kickoff & Team Formation', 'zh-TW': '開幕與團隊組建'}},
      {time: 'Day 1 12:00', event: {en: 'Hacking Begins', 'zh-TW': '開始coding'}},
      {time: 'Day 2 10:00', event: {en: 'Submission Deadline', 'zh-TW': '提交截止'}},
      {time: 'Day 2 14:00', event: {en: 'Presentations & Awards', 'zh-TW': '展示與頒獎'}}
    ],
    prizes: [{place: '1st', amount: '$5,000'}, {place: '2nd', amount: '$2,500'}, {place: '3rd', amount: '$1,000'}],
    requirements: {en: 'Individual or teams of up to 4 members. All skill levels welcome.', 'zh-TW': '個人或最多4人團隊。歡迎所有技能水平。'}
  },
  'renewable-integration-challenge': {
    title: {en: 'Renewable Integration Challenge', 'zh-TW': '再生能源整合挑戰賽'},
    description: {en: 'Tackle the challenges of integrating renewable energy sources.', 'zh-TW': '解決再生能源整合的挑戰。'},
    fullDescription: {en: 'This challenge focuses on solving the technical challenges of integrating renewable energy sources like solar and wind into existing power grids.', 'zh-TW': '本挑戰賽專注於解決將太陽能和風能等再生能源整合到現有電網的技術挑戰。'},
    date: '2026-05-10', endDate: '2026-05-12',
    location: {en: 'Hong Kong', 'zh-TW': '香港'},
    organizer: 'APSTPM', status: 'upcoming',
    schedule: [
      {time: 'Day 1', event: {en: 'Opening & Technical Sessions', 'zh-TW': '開幕與技術會議'}},
      {time: 'Day 2', event: {en: 'Team Competition', 'zh-TW': '團隊競賽'}},
      {time: 'Day 3', event: {en: 'Finals & Awards', 'zh-TW': '決賽與頒獎'}}
    ],
    prizes: [{place: '1st', amount: '$8,000'}, {place: '2nd', amount: '$4,000'}, {place: '3rd', amount: '$2,000'}],
    requirements: {en: 'Teams of 3-5 members. Academic and industry participants welcome.', 'zh-TW': '3-5人團隊。歡迎學術界和產業界參與。'}
  },
  'power-management-summit': {
    title: {en: 'Power Management Summit 2025', 'zh-TW': '能源管理高峰會 2025'},
    description: {en: 'Annual summit bringing together industry leaders.', 'zh-TW': '匯聚產業領袖的年度高峰會。'},
    fullDescription: {en: 'The Power Management Summit 2025 brought together industry leaders, researchers, and policymakers to discuss the future of energy management.', 'zh-TW': '2025能源管理高峰會匯聚了產業界領袖、研究人員和政策制定者，共同討論能源管理的未來。'},
    date: '2025-11-15', endDate: '2025-11-17',
    location: {en: 'Taipei, Taiwan', 'zh-TW': '台灣台北'},
    organizer: 'APSTPM', status: 'closed',
    schedule: [
      {time: 'Day 1', event: {en: 'Keynote Speeches', 'zh-TW': '主題演講'}},
      {time: 'Day 2', event: {en: 'Panel Discussions', 'zh-TW': '座談討論'}},
      {time: 'Day 3', event: {en: 'Networking Event', 'zh-TW': '交流活動'}}
    ],
    prizes: [],
    requirements: {en: 'Registration required. Open to all industry professionals.', 'zh-TW': '需先報名。開放給所有產業專業人士。'}
  }
};

const statusClasses: Record<string, string> = {
  open: 'bg-brand-50 text-brand-700',
  upcoming: 'bg-amber-100 text-amber-800',
  closed: 'bg-gray-100 text-gray-500',
};

export default async function CompetitionDetailPage({params}: {params: Promise<{slug: string; locale: string}>}) {
  const {slug, locale} = await params;
  const competition = competitions[slug];
  if (!competition) notFound();

  const t = await getTranslations('competitions');
  const tCommon = await getTranslations('common');

  const title = competition.title[locale] || competition.title.en;
  const fullDescription = competition.fullDescription[locale] || competition.fullDescription.en;
  const location = competition.location[locale] || competition.location.en;
  const requirements = competition.requirements[locale] || competition.requirements.en;

  const sc = statusClasses[competition.status] || statusClasses.closed;

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/competitions" className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors">
            ← {tCommon('back')}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sc}`}>
              {t(`status.${competition.status}`)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">{title}</h1>
          <div className="flex flex-wrap gap-6 mt-6 text-gray-600">
            <div className="flex items-center gap-2"><span>📅</span><span>{competition.date} — {competition.endDate}</span></div>
            <div className="flex items-center gap-2"><span>📍</span><span>{location}</span></div>
            <div className="flex items-center gap-2"><span>🏢</span><span>{competition.organizer}</span></div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-brand-700 font-display mb-4">{t('detail.overview')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{fullDescription}</p>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-8">{t('detail.schedule')}</h2>
          <div className="space-y-4">
            {competition.schedule.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row gap-4 border border-gray-100">
                <span className="font-bold text-brand-700 font-display text-sm min-w-[120px]">{item.time}</span>
                <span className="text-gray-700">{item.event[locale] || item.event.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      {competition.prizes.length > 0 && (
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 font-display mb-8">{t('detail.prizes')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {competition.prizes.map((prize, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <div className="text-4xl mb-2">{['🥇', '🥈', '🥉'][i]}</div>
                  <div className="text-sm font-semibold text-gray-400 mb-2">{prize.place} Place</div>
                  <div className="text-3xl font-bold text-brand-700 font-display">{prize.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 font-display mb-4">{t('detail.requirements')}</h2>
          <p className="text-lg text-gray-600">{requirements}</p>
        </div>
      </section>

      {/* CTA */}
      {competition.status !== 'closed' && (
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 rounded-lg font-semibold text-lg bg-brand-700 hover:bg-brand-800 text-white transition-colors">
              {t('register')}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
