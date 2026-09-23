// 首頁預覽、比賽列表與詳情頁共用；比賽資料只有繁中，切換英文時照樣顯示中文
import type {Highlight, Organizer, Photo, SourceLink} from './types';

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
  organizers: Organizer[];
  highlights: Highlight[];
  // 封面圖，列表卡片與詳情頁頂部共用
  image: string;
  imageAlt?: string;
  imageCredit?: string;
  // 詳情頁相冊，不含封面
  gallery?: Photo[];
  sources: SourceLink[];
}

export const dsedjPhoto = (id: number) =>
  `https://portal.dsedj.gov.mo/webdsejspace/addon/upload/Upload_viewfile_page.jsp?id=${id}&`;

const dsalCredit = '圖片：勞工事務局';
const worldskillsPhotos = '/images/activities/worldskills-2026';

const dsalDepartureNews = {
  label: '勞工事務局：以賽促學育本地技能菁英　澳門代表團整裝待發迎戰第48屆世界技能大賽（2026年7月19日）',
  url: 'https://www.dsal.gov.mo/zh_tw/standard/news_detail/article/mrrmsnsa.html',
};

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
      '中國澳門代表團由勞工事務局組織，共24名選手參與22個技能項目，是澳門歷來參賽項目最多的一屆，其中包括無人機系統項目。代表選手經「第48屆世界技能大賽澳門特別行政區選拔賽」選出，並接受約350至600小時的專業培訓。',
      '代表團於2026年7月19日在澳門旅遊大學（望廈校區）舉行啟程儀式，專家與選手代表共同宣誓，承諾嚴格遵守賽事規則、全力以赴。各項目代表單位將派出專家團隊隨團赴上海，為選手提供專業指導。',
    ],
    organizers: [
      {role: '主辦', name: '世界技能組織、國家人力資源和社會保障部、上海市人民政府'},
      {role: '中國澳門代表團組織', name: '勞工事務局'},
    ],
    highlights: [
      {label: '比賽項目', value: '無人機系統（本屆首設）'},
      {label: '澳門代表團選手', value: '24名'},
      {label: '澳門參賽項目', value: '22個'},
      {label: '選手專業培訓', value: '約350至600小時'},
    ],
    image: `${worldskillsPhotos}/training-drone.jpg`,
    imageAlt: '無人機系統項目澳門代表選手培訓情況',
    imageCredit: dsalCredit,
    gallery: [
      {src: `${worldskillsPhotos}/flag-presentation.jpg`, alt: '中國澳門代表團授旗儀式', caption: '代表團啟程儀式：授旗儀式', credit: dsalCredit},
      {src: `${worldskillsPhotos}/oath.jpg`, alt: '中國澳門代表團選手宣誓', caption: '代表團啟程儀式：選手宣誓', credit: dsalCredit},
    ],
    sources: [
      dsalSelectionNews,
      dsalDepartureNews,
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
      '由本屆比賽成績優異學生組成的澳門學界代表隊，於2025年10月23日至30日在合肥參加第39屆中國化學奧林匹克（決賽），8名學生均獲銅獎。代表隊由澳門大學葉穎暉教授擔任領隊，本會代表陳錫僑教授擔任觀察員。',
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
      {label: '第39屆中國化學奧林匹克', value: '8名代表學生均獲銅獎'},
    ],
    image: dsedjPhoto(705597),
    sources: [
      {label: '教育及青年發展局：2025/2026學年學界化學比賽結果公佈', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=709562&langsel=C&'},
      {label: '教育及青年發展局：學界比賽成績', url: 'https://portal.dsedj.gov.mo/webdsejspace/site/ce/index.jsp?con=result'},
      {label: '教育及青年發展局：第39屆中國化學奧林匹克（決賽）澳生奪佳績（2025年11月7日）', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=709975&langsel=C&'},
    ],
  },
  {
    id: 'worldskills-shanghai-2026-macao-selection',
    title: 'WorldSkills Shanghai 2026 澳門區選拔賽',
    category: '職業技能',
    status: 'ended',
    date: '2025-07-05',
    period: '2025年7月至2026年7月',
    location: '澳門',
    summary: '選拔代表中國澳門出戰第48屆世界技能大賽的選手，共設22個競賽項目，包括無人機系統。',
    overview: [
      '「第48屆世界技能大賽澳門特別行政區選拔賽」由勞工事務局舉辦，於2025年7月5日至9月30日接受報名，共設22個競賽項目，包括本屆世界技能大賽新增的無人機系統項目。',
      '選拔賽設有入圍賽及決賽。通過入圍賽的參賽者須完成相關項目的強化課程，才可進入決賽；決賽成績最優者代表中國澳門出戰於上海舉行的第48屆世界技能大賽。各項目決賽首三名分別獲得澳門元15,000元、10,000元及5,000元獎金及獎狀。',
      '勞工事務局邀請多個本地機構擔任項目代表單位，負責為參賽者提供培訓、選拔優勝選手，並派出專家與選手一同代表中國澳門參賽。澳門科技實踐促進會是本屆的項目代表單位之一。',
      '經過入圍賽、約350至600小時的專業培訓及決賽遴選，最終選出24名選手代表中國澳門參賽。勞工事務局於2026年7月19日在澳門旅遊大學（望廈校區）啟思樓大禮堂舉行代表團啟程儀式及選拔賽頒獎禮，為各項目冠、亞、季軍頒獎，並向各項目代表單位致送感謝狀。',
    ],
    organizers: [
      {role: '主辦', name: '勞工事務局'},
      {role: '項目代表單位（之一）', name: '澳門科技實踐促進會'},
    ],
    highlights: [
      {label: '競賽項目', value: '22個'},
      {label: '報名人數', value: '近600人'},
      {label: '報名期', value: '2025年7月5日至9月30日'},
      {label: '入圍賽', value: '2025年10月至11月'},
      {label: '專業培訓', value: '約350至600小時'},
      {label: '最終選出選手', value: '24名'},
    ],
    image: `${worldskillsPhotos}/group-photo.jpg`,
    imageAlt: '第48屆世界技能大賽中國澳門代表團啟程儀式及選拔賽頒獎禮大合照',
    imageCredit: dsalCredit,
    gallery: [
      {src: `${worldskillsPhotos}/flag-presentation.jpg`, alt: '中國澳門代表團授旗儀式', caption: '授旗儀式', credit: dsalCredit},
      {src: `${worldskillsPhotos}/oath.jpg`, alt: '中國澳門代表團選手宣誓', caption: '選手宣誓', credit: dsalCredit},
      {src: `${worldskillsPhotos}/training-mobile-robotics.jpg`, alt: '兩名選手調試自主移動機器人', caption: '自主移動機器人選手培訓情況', credit: dsalCredit},
      {src: `${worldskillsPhotos}/training-drone.jpg`, alt: '選手操控無人機', caption: '無人機系統選手培訓情況', credit: dsalCredit},
    ],
    sources: [
      dsalSelectionNews,
      {label: '本澳選拔代表 備戰第48屆世界技能大賽', url: 'https://macautodaynews.com/detail/18509.html'},
      dsalDepartureNews,
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
  {
    id: 'chemistry-2023-2024',
    title: '2023/2024學年學界化學比賽',
    category: '化學',
    status: 'ended',
    date: '2023-09-23',
    period: '2023年9月23日',
    location: '澳門',
    summary: '28所中學共134名學生參賽，優勝學生組成澳門學界代表隊出戰第37屆中國化學奧林匹克。',
    overview: [
      '「2023/2024學年學界化學比賽」由教育及青年發展局及澳門大學主辦、澳門科技實踐促進會承辦、中國工商銀行（澳門）股份有限公司獎金贊助，已於2023年9月23日順利完成。',
      '比賽旨在推動本地化學學科發展，並藉此選拔本地優秀學生參加全國化學比賽。是次比賽有28所中學共派出134名學生參賽，5所學校共6位老師獲得優秀指導老師獎項，25名學生獲得個人獎項。',
      '由本屆比賽選出的8名學生組成澳門學界代表隊，於2023年11月3日至8日赴北京參加第37屆中國化學奧林匹克（決賽），取得三等獎1名、優勝獎7名。出發前會議上，本會理事長黃志文以承辦單位身份與教青局代表一同勉勵同學。',
    ],
    organizers: [
      {role: '主辦', name: '教育及青年發展局、澳門大學'},
      {role: '承辦', name: '澳門科技實踐促進會'},
      {role: '獎金贊助', name: '中國工商銀行（澳門）股份有限公司'},
    ],
    highlights: [
      {label: '參賽學校', value: '28所'},
      {label: '參賽學生', value: '134名'},
      {label: '個人獎項', value: '一等獎3名、二等獎5名、三等獎7名、優異獎10名'},
      {label: '優秀指導老師獎', value: '5所學校共6位老師'},
      {label: '第37屆中國化學奧林匹克', value: '三等獎1名、優勝獎7名'},
    ],
    image: dsedjPhoto(95858),
    sources: [
      {label: '教育及青年發展局：2023/2024學年學界化學比賽結果公佈', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=99576&langsel=C&'},
      {label: '教育及青年發展局：學界代表隊赴北京參加第37屆中國化學奧林匹克（決賽）（2023年10月27日）', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=99617&langsel=C&'},
      {label: '教育及青年發展局：第37屆中國化學奧林匹克（決賽）澳生奪佳績（2023年11月20日）', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=99947&langsel=C&'},
    ],
  },
  {
    id: 'macau-youth-robotics-2022-2023',
    title: '2022/2023學年澳門青少年綜合機械人科普活動選拔大賽',
    category: '機械人',
    status: 'ended',
    // 公開資料只有結果公佈日期，比賽確切日期待補
    date: '2023-06-14',
    period: '2022/2023學年',
    location: '澳門',
    summary: '本會協辦，共設12項選拔賽事，31所學校共314支隊伍、641人次參加。',
    overview: [
      '2022/2023學年「澳門青少年綜合機械人科普活動選拔大賽」由教育及青年發展局主辦、澳門科學技術協進會承辦、澳門科技實踐促進會協辦、中國工商銀行（澳門）股份有限公司獎金贊助。',
      '比賽共進行12項選拔賽事，吸引31所學校共314支隊伍、641人次參加，獲獎名單於2023年6月14日公佈。優勝隊伍日後有機會代表澳門參加多項國際性或地區性賽事。',
    ],
    organizers: [
      {role: '主辦', name: '教育及青年發展局'},
      {role: '承辦', name: '澳門科學技術協進會'},
      {role: '協辦', name: '澳門科技實踐促進會'},
      {role: '獎金贊助', name: '中國工商銀行（澳門）股份有限公司'},
    ],
    highlights: [
      {label: '選拔賽事', value: '12項'},
      {label: '參賽學校', value: '31所'},
      {label: '參賽隊伍', value: '314支'},
      {label: '參賽人次', value: '641'},
    ],
    image: dsedjPhoto(93426),
    sources: [
      {label: '2022/2023學年澳門青少年綜合機械人科普選拔大賽章程', url: 'https://macau-robot.org/_/announcement/161/attachment'},
      {label: '教育及青年發展局：2022/2023學年「澳門青少年綜合機械人科普活動選拔大賽」獲獎名單公佈', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=97143&langsel=C&'},
    ],
  },
];

export const getCompetition = (id: string) => competitions.find(item => item.id === id);
