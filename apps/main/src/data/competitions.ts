// 首頁預覽、比賽列表與詳情頁共用；比賽資料只有繁中，切換英文時照樣顯示中文
export type CompetitionStatus = 'ongoing' | 'upcoming' | 'ended';

export interface Competition {
  id: string;
  title: string;
  category: string;
  status: CompetitionStatus;
  // ISO 日期，用於 <time> 與排序
  date: string;
  // 顯示用的日期文字
  period: string;
  location: string;
  summary: string;
  overview: string[];
  organizers: {role: string; name: string}[];
  highlights: {label: string; value: string}[];
  image: string;
  sources: {label: string; url: string}[];
}

const dsedjPhoto = (id: number) =>
  `https://portal.dsedj.gov.mo/webdsejspace/addon/upload/Upload_viewfile_page.jsp?id=${id}&`;

const dsalSelectionNews = {
  label: '勞工事務局：「第48屆世界技能大賽澳門特別行政區選拔賽」接受報名（2025年7月4日）',
  url: 'https://www.dsal.gov.mo/zh_tw/standard/news_detail/article/mcohbt9v.html',
};

// 進行中的排在前面，過往比賽按日期由新到舊
export const competitions: Competition[] = [
  {
    id: 'worldskills-shanghai-2026-drone',
    title: 'WorldSkills Shanghai 2026 世界技能大賽－無人機系統項目',
    category: '職業技能',
    status: 'ongoing',
    date: '2026-09-22',
    period: '2026年9月22日至27日',
    location: '中國上海',
    summary: '無人機系統是本屆世界技能大賽首次設立的比賽項目，中國澳門代表選手正於上海參賽。',
    overview: [
      '第48屆世界技能大賽由世界技能組織、國家人力資源和社會保障部及上海市人民政府共同主辦，於2026年9月22日至27日在上海舉行，是賽事首次在中國舉辦。本屆新增無人機系統等7個比賽項目。',
      '中國澳門代表團由勞工事務局組織，共24名選手參與22個技能項目，是澳門歷來參賽項目最多的一屆，其中包括無人機系統項目。代表選手經「第48屆世界技能大賽澳門特別行政區選拔賽」選出。',
    ],
    organizers: [
      {role: '主辦', name: '世界技能組織、國家人力資源和社會保障部、上海市人民政府'},
      {role: '中國澳門代表團組織', name: '勞工事務局'},
    ],
    highlights: [
      {label: '比賽項目', value: '無人機系統（本屆首設）'},
      {label: '澳門代表團選手', value: '24名'},
      {label: '澳門參賽項目', value: '22個'},
    ],
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=500&fit=crop',
    sources: [
      dsalSelectionNews,
      {label: '澳門代表團啟程赴滬 出戰第48屆世界技能大賽（2026年9月19日）', url: 'https://macao.ifeng.com/c/8wXoULBv9hO'},
    ],
  },
  {
    id: 'chemistry-2025-2026',
    title: '2025/2026學年學界化學比賽',
    category: '化學',
    status: 'ended',
    date: '2025-09-20',
    period: '2025年9月20日',
    location: '澳門',
    summary: '30所中學共140名學生參賽，選拔本地優秀學生參加全國化學比賽。',
    overview: [
      '「2025/2026學年學界化學比賽」由教育及青年發展局及澳門大學主辦、澳門科技實踐促進會承辦、中國工商銀行（澳門）股份有限公司獎金贊助，已於2025年9月20日順利完成。',
      '比賽旨在推動本地化學學科發展，並藉此選拔本地優秀學生參加全國化學比賽。是次比賽有30所中學共派出140名學生參賽，5所學校獲得優秀指導老師獎項，25名學生獲得個人獎項。',
    ],
    organizers: [
      {role: '主辦', name: '教育及青年發展局、澳門大學'},
      {role: '承辦', name: '澳門科技實踐促進會'},
      {role: '獎金贊助', name: '中國工商銀行（澳門）股份有限公司'},
    ],
    highlights: [
      {label: '參賽學校', value: '30所'},
      {label: '參賽學生', value: '140名'},
      {label: '個人獎項', value: '一等獎3名、二等獎5名、三等獎7名、優異獎10名'},
      {label: '優秀指導老師獎', value: '5所學校'},
    ],
    image: dsedjPhoto(705597),
    sources: [
      {label: '教育及青年發展局：2025/2026學年學界化學比賽結果公佈', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=709562&langsel=C&'},
      {label: '教育及青年發展局：學界比賽成績', url: 'https://portal.dsedj.gov.mo/webdsejspace/site/ce/index.jsp?con=result'},
    ],
  },
  {
    id: 'worldskills-shanghai-2026-macao-selection',
    title: 'WorldSkills Shanghai 2026 澳門區選拔賽',
    category: '職業技能',
    status: 'ended',
    date: '2025-07-05',
    period: '2025年7月至2026年',
    location: '澳門',
    summary: '選拔代表中國澳門出戰第48屆世界技能大賽的選手，共設22個競賽項目，包括無人機系統。',
    overview: [
      '「第48屆世界技能大賽澳門特別行政區選拔賽」由勞工事務局舉辦，於2025年7月5日至9月30日接受報名，共設22個競賽項目，包括本屆世界技能大賽新增的無人機系統項目。',
      '選拔賽設有入圍賽及決賽。通過入圍賽的參賽者須完成相關項目的強化課程，才可進入決賽；決賽成績最優者代表中國澳門出戰於上海舉行的第48屆世界技能大賽。各項目決賽首三名分別獲得澳門元15,000元、10,000元及5,000元獎金及獎狀。',
      '勞工事務局邀請多個本地機構擔任項目代表單位，負責為參賽者提供培訓、選拔優勝選手，並派出專家與選手一同代表中國澳門參賽。',
    ],
    organizers: [
      {role: '主辦', name: '勞工事務局'},
    ],
    highlights: [
      {label: '競賽項目', value: '22個'},
      {label: '報名人數', value: '近600人'},
      {label: '報名期', value: '2025年7月5日至9月30日'},
      {label: '入圍賽', value: '2025年10月至11月'},
    ],
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&h=500&fit=crop',
    sources: [
      dsalSelectionNews,
      {label: '本澳選拔代表 備戰第48屆世界技能大賽', url: 'https://macautodaynews.com/detail/18509.html'},
    ],
  },
  {
    id: 'macau-youth-robotics-2024-2025',
    title: '2024/2025學年澳門青少年綜合機械人科普活動選拔大賽',
    category: '機械人',
    status: 'ended',
    date: '2025-05-16',
    period: '2025年5月16日至18日',
    location: '澳門',
    summary: '共設9項選拔賽事，27所學校共441支隊伍、631名學生報名參加。',
    overview: [
      '2024/2025學年「澳門青少年綜合機械人科普活動選拔大賽」由教育及青年發展局主辦、澳門科技實踐促進會承辦、中國工商銀行（澳門）股份有限公司獎金贊助，於2025年5月16日至18日舉行。',
      '比賽共進行9項選拔賽事，吸引27所學校共441支隊伍、631名學生報名參加。優勝隊伍日後有機會代表澳門參加多項國際性或地區性賽事。',
    ],
    organizers: [
      {role: '主辦', name: '教育及青年發展局'},
      {role: '承辦', name: '澳門科技實踐促進會'},
      {role: '獎金贊助', name: '中國工商銀行（澳門）股份有限公司'},
    ],
    highlights: [
      {label: '選拔賽事', value: '9項'},
      {label: '參賽學校', value: '27所'},
      {label: '參賽隊伍', value: '441支'},
      {label: '參賽學生', value: '631名'},
    ],
    image: dsedjPhoto(702453),
    sources: [
      {label: '教育及青年發展局：2024/2025學年「澳門青少年綜合機械人科普活動選拔大賽」獲獎名單公佈', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=705696&langsel=C&'},
      {label: '教育及青年發展局：學界比賽成績', url: 'https://portal.dsedj.gov.mo/webdsejspace/site/ce/index.jsp?con=result'},
    ],
  },
  {
    id: 'chemistry-2024-2025',
    title: '2024/2025學年學界化學比賽',
    category: '化學',
    status: 'ended',
    date: '2024-09-14',
    period: '2024年9月14日',
    location: '澳門',
    summary: '27所中學共132名學生參賽，選拔本地優秀學生參加全國化學比賽。',
    overview: [
      '「2024/2025學年學界化學比賽」由教育及青年發展局及澳門大學主辦、澳門科技實踐促進會承辦、中國工商銀行（澳門）股份有限公司獎金贊助，已於2024年9月14日順利完成。',
      '比賽旨在推動本地化學學科發展，並藉此選拔本地優秀學生參加全國化學比賽。是次比賽有27所中學共派出132名學生參賽，5所學校獲得優秀指導老師獎項，25名學生獲得個人獎項。',
    ],
    organizers: [
      {role: '主辦', name: '教育及青年發展局、澳門大學'},
      {role: '承辦', name: '澳門科技實踐促進會'},
      {role: '獎金贊助', name: '中國工商銀行（澳門）股份有限公司'},
    ],
    highlights: [
      {label: '參賽學校', value: '27所'},
      {label: '參賽學生', value: '132名'},
      {label: '個人獎項', value: '一等獎3名、二等獎5名、三等獎7名、優異獎10名'},
      {label: '優秀指導老師獎', value: '5所學校'},
    ],
    image: dsedjPhoto(697408),
    sources: [
      {label: '教育及青年發展局：2024/2025學年學界化學比賽結果公佈', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=702714&langsel=C&'},
      {label: '教育及青年發展局：學界比賽成績', url: 'https://portal.dsedj.gov.mo/webdsejspace/site/ce/index.jsp?con=result'},
    ],
  },
];

export const getCompetition = (id: string) => competitions.find(item => item.id === id);
