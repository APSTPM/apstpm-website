import type { CompetitionInfo } from '../lib/content/types';

export const competitionInfo: CompetitionInfo = {
  id: 'comp-2025',
  year: 2025,
  title: '2025年度澳門青少年機械人大賽',
  registrationPeriod: {
    start: '2025-03-05',
    end: '2025-03-26'
  },
  competitionDates: {
    start: '2025-05-16',
    end: '2025-05-18'
  },
  venue: '澳門科學館會議中心',
  categories: [
    {
      id: 'cat-junior',
      name: '初級組',
      nameEn: 'Junior Category',
      description: '適合初中一年级至三年级学生参加',
      ageGroup: '初中一至三年級'
    },
    {
      id: 'cat-senior',
      name: '高級組',
      nameEn: 'Senior Category',
      description: '適合高中一年级至三年级学生参加',
      ageGroup: '高中一至三年級'
    },
    {
      id: 'cat-creative',
      name: '創意展示組',
      nameEn: 'Creative Display Category',
      description: '以創意設計為主，不設特定任務要求',
      ageGroup: '中一至中六'
    }
  ],
  purpose: '鼓勵青少年在機器人、信息、自動控制等領域進行學習與探索，培養創新思維和實踐能力，通過團隊合作完成比賽任務，提升科學素養和解決問題的能力。',
  judgingCriteria: [
    '機器人設計與創新 (25%)',
    '任務完成度 (30%)',
    '程序編寫與穩定性 (20%)',
    '團隊合作與演示 (15%)',
    '時間效率 (10%)'
  ],
  awards: [
    '一等獎：獎杯 + 獎狀 + 獎學金',
    '二等獎：獎杯 + 獎狀',
    '三等獎：獎杯 + 獎狀',
    '最佳創意獎：獎杯 + 獎狀',
    '最佳團隊獎：獎杯 + 獎狀'
  ]
};
