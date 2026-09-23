// 活動頁與首頁預覽共用；只收錄有政府公開資料可查的活動，本會角色照原文寫，不要擴大
// 內容只有繁中，切換英文時照樣顯示中文
import {competitions} from './competitions';

export type ActivityCategory = 'organized' | 'partnered';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  // ISO 日期，用於 <time> 與排序
  date: string;
  // 顯示用的日期文字
  period: string;
  // 本會在活動中的角色
  role: string;
  summary: string;
  image: string;
  // 圖片不是本會拍攝時標明出處
  imageCredit?: string;
  source: {label: string; url: string};
  // 有比賽詳情頁時連過去
  competitionId?: string;
}

// 本會承辦的比賽直接沿用比賽資料，避免兩處寫法不一致
const fromCompetition = (id: string): Activity => {
  const competition = competitions.find(item => item.id === id);
  if (!competition) throw new Error(`找不到比賽：${id}`);
  return {
    id: competition.id,
    title: competition.title,
    category: 'organized',
    date: competition.date,
    period: competition.period,
    role: '承辦',
    summary: competition.summary,
    image: competition.image,
    source: competition.sources[0],
    competitionId: competition.id,
  };
};

// 按日期由新到舊
export const activities: Activity[] = [
  {
    id: 'worldskills-2026-departure-ceremony',
    title: '第48屆世界技能大賽中國澳門代表團啟程儀式及選拔賽頒獎禮',
    category: 'partnered',
    date: '2026-07-19',
    period: '2026年7月19日',
    role: '項目代表單位（之一）',
    summary: '本會是勞工事務局本屆邀請的八個項目代表單位之一，參與選手培訓與選拔。勞工事務局在儀式上向各項目代表單位致送感謝狀。',
    image: '/images/activities/worldskills-2026-departure.jpg',
    imageCredit: '圖片：勞工事務局',
    source: {
      label: '勞工事務局：以賽促學育本地技能菁英　澳門代表團整裝待發迎戰第48屆世界技能大賽（2026年7月19日）',
      url: 'https://www.dsal.gov.mo/zh_tw/standard/news_detail/article/mrrmsnsa.html',
    },
    competitionId: 'worldskills-shanghai-2026-macao-selection',
  },
  fromCompetition('chemistry-2025-2026'),
  {
    id: 'youth-skills-day-2025',
    title: '世界青年技能日活動暨技能滿FUN嘉年華2025',
    category: 'partnered',
    date: '2025-07-05',
    period: '2025年7月5日至6日',
    role: '本會代表出席開幕式',
    summary: '勞工事務局與澳門青年發展服務中心合辦的技能體驗嘉年華，現場設12項技能體驗工作坊。本會代表出席開幕式。',
    image: '/images/activities/youth-skills-2025.jpg',
    imageCredit: '圖片：勞工事務局',
    source: {
      label: '勞工事務局：「世界青年技能日活動暨技能滿FUN嘉年華2025」鼓勵青年學習職業技能（2025年7月5日）',
      url: 'https://www.dsal.gov.mo/zh_tw/text/news_detail/article/mcpvdf1l.html',
    },
  },
  fromCompetition('macau-youth-robotics-2024-2025'),
  fromCompetition('chemistry-2024-2025'),
];
