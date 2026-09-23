// 合作單位：只收錄與本會直接合作過的單位，依據見 competitions.ts、activities.ts 的 organizers
// 日後有官方標誌可放到 public/images/partners/ 再加 logo 欄位

type Localized = {en: string; 'zh-TW': string};

export type Partner = {
  id: string;
  name: Localized;
  // 與本會的合作內容
  relation: Localized;
  url: string;
};

export const partners: Partner[] = [
  {
    id: 'dsedj',
    name: {en: 'Education and Youth Development Bureau', 'zh-TW': '教育及青年發展局'},
    relation: {en: 'Organiser of the Inter-school Chemistry Competition and the Macau Youth Robotics Competition', 'zh-TW': '學界化學比賽、澳門青少年綜合機械人科普活動選拔大賽主辦單位'},
    url: 'https://www.dsedj.gov.mo',
  },
  {
    id: 'um',
    name: {en: 'University of Macau', 'zh-TW': '澳門大學'},
    relation: {en: 'Co-organiser of the Inter-school Chemistry Competition', 'zh-TW': '學界化學比賽主辦單位'},
    url: 'https://www.um.edu.mo',
  },
  {
    id: 'dsal',
    name: {en: 'Labour Affairs Bureau', 'zh-TW': '勞工事務局'},
    relation: {en: 'Organiser of the Macao delegation to the WorldSkills Competition', 'zh-TW': '世界技能大賽中國澳門代表團組織單位'},
    url: 'https://www.dsal.gov.mo',
  },
  {
    id: 'icbc-macau',
    name: {en: 'Industrial and Commercial Bank of China (Macau) Limited', 'zh-TW': '中國工商銀行（澳門）股份有限公司'},
    relation: {en: 'Prize sponsor of the chemistry and robotics competitions', 'zh-TW': '化學及機械人比賽獎金贊助'},
    url: 'https://www.icbc.com.mo',
  },
  {
    id: 'mapst',
    name: {en: 'Macau Association for the Promotion of Science and Technology', 'zh-TW': '澳門科學技術協進會'},
    relation: {en: 'Co-organiser of the Macau Youth Robotics Competition', 'zh-TW': '澳門青少年綜合機械人科普活動選拔大賽承辦單位'},
    url: 'https://mapst.org',
  },
];
