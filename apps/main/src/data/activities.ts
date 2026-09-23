// 活動頁與首頁共用；只收錄有政府公開資料可查的活動，本會角色照原文寫，不要擴大
// 內容只有繁中，切換英文時照樣顯示中文
import {competitions, dsedjPhoto} from './competitions';
import type {Highlight, Organizer, Photo, SourceLink, Video} from './types';

export type ActivityCategory = 'organized' | 'partnered';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  // ISO 日期，用於 <time> 與排序
  date: string;
  // 顯示用的日期文字
  period: string;
  location: string;
  // 本會在活動中的角色
  role: string;
  summary: string;
  overview: string[];
  highlights: Highlight[];
  organizers: Organizer[];
  // 封面圖，列表卡片、首頁輪播與詳情頁頂部共用
  image: string;
  imageAlt?: string;
  imageCredit?: string;
  // 詳情頁相冊，不含封面
  gallery: Photo[];
  videos?: Video[];
  sources: SourceLink[];
  // 有比賽詳情頁的活動直接連過去，不另設活動詳情頁
  competitionId?: string;
}

const dsalCredit = '圖片：勞工事務局';
const dsedjCredit = '圖片：教育及青年發展局';

// 本會承辦或協辦的比賽直接沿用比賽資料，避免兩處寫法不一致
const fromCompetition = (id: string): Activity => {
  const competition = competitions.find(item => item.id === id);
  if (!competition) throw new Error(`找不到比賽：${id}`);
  // 角色取自比賽的主辦及承辦單位列表，承辦、協辦等照原文
  const role = competition.organizers.find(item => item.name === '澳門科技實踐促進會')?.role;
  if (!role) throw new Error(`比賽未列出本會角色：${id}`);
  return {
    id: competition.id,
    title: competition.title,
    category: role === '承辦' ? 'organized' : 'partnered',
    date: competition.date,
    period: competition.period,
    location: competition.location,
    role,
    summary: competition.summary,
    overview: competition.overview,
    highlights: competition.highlights,
    organizers: competition.organizers,
    image: competition.image,
    imageAlt: competition.imageAlt,
    imageCredit: competition.imageCredit,
    gallery: competition.gallery ?? [],
    videos: competition.videos,
    sources: competition.sources,
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
    location: '澳門旅遊大學（望廈校區）啟思樓大禮堂',
    role: '項目代表單位（之一）',
    summary: '本會是勞工事務局本屆邀請的八個項目代表單位之一，參與選手培訓與選拔。勞工事務局在儀式上向各項目代表單位致送感謝狀。',
    overview: [
      '中國澳門代表團於2026年7月19日在澳門旅遊大學（望廈校區）啟思樓大禮堂舉行第48屆世界技能大賽啟程儀式及選拔賽頒獎禮，標誌着本屆賽事的備戰工作進入最後衝刺階段。儀式上，專家與選手代表共同宣誓，承諾嚴格遵守賽事規則、全力以赴。',
      '本屆澳門參賽選手經公開選拔產生，首階段吸引近600人報名。通過入圍賽的選手修讀項目強化課程，接受約350至600小時的專業培訓，最終經決賽遴選出24名選手，參與22個競賽項目，於9月赴上海出賽。',
      '勞工事務局攜手多個專業機構及院校籌備本屆賽事。項目代表單位包括澳門旅遊大學、澳門生產力暨科技轉移中心、澳門髮型美容從業員協會、澳門花藝設計師學會、澳門科學技術協進會、澳門電訊股份有限公司、澳門鏡湖護理學院以及澳門科技實踐促進會，負責各項目的選手培訓與選拔工作，並派出專家團隊隨團赴上海為選手提供專業指導。',
      '勞工事務局在儀式上向各項目代表單位致送感謝狀，並為澳門區選拔賽各項目的冠、亞、季軍得主頒發獎項。',
    ],
    highlights: [
      {label: '本會角色', value: '項目代表單位（之一）'},
      {label: '代表團選手', value: '24名'},
      {label: '競賽項目', value: '22個'},
      {label: '選手專業培訓', value: '約350至600小時'},
    ],
    organizers: [
      {role: '主辦', name: '勞工事務局'},
      {role: '項目代表單位', name: '澳門旅遊大學、澳門生產力暨科技轉移中心、澳門髮型美容從業員協會、澳門花藝設計師學會、澳門科學技術協進會、澳門電訊股份有限公司、澳門鏡湖護理學院、澳門科技實踐促進會'},
    ],
    image: '/images/activities/worldskills-2026/group-photo.jpg',
    imageAlt: '第48屆世界技能大賽中國澳門代表團啟程儀式及選拔賽頒獎禮大合照',
    imageCredit: dsalCredit,
    gallery: [
      {src: '/images/activities/worldskills-2026/flag-presentation.jpg', alt: '中國澳門代表團授旗儀式', caption: '授旗儀式', credit: dsalCredit},
      {src: '/images/activities/worldskills-2026/oath.jpg', alt: '中國澳門代表團選手宣誓', caption: '選手宣誓', credit: dsalCredit},
      {src: '/images/activities/worldskills-2026/training-mobile-robotics.jpg', alt: '兩名選手調試自主移動機器人', caption: '自主移動機器人選手培訓情況', credit: dsalCredit},
      {src: '/images/activities/worldskills-2026/training-drone.jpg', alt: '選手操控無人機', caption: '無人機系統選手培訓情況', credit: dsalCredit},
    ],
    sources: [
      {label: '勞工事務局：以賽促學育本地技能菁英　澳門代表團整裝待發迎戰第48屆世界技能大賽（2026年7月19日）', url: 'https://www.dsal.gov.mo/zh_tw/standard/news_detail/article/mrrmsnsa.html'},
    ],
  },
  {
    id: 'ccho-39-final-2025',
    title: '第39屆中國化學奧林匹克（決賽）',
    category: 'partnered',
    date: '2025-10-23',
    period: '2025年10月23日至30日',
    location: '安徽合肥',
    role: '本會代表擔任觀察員',
    summary: '澳門學界代表隊由本會承辦的2025/2026學年學界化學比賽優勝學生組成，赴合肥參賽，8名學生均獲銅獎。本會代表陳錫僑教授擔任觀察員。',
    overview: [
      '教育及青年發展局組織澳門學界代表隊，於2025年10月23日至30日在合肥參加第39屆中國化學奧林匹克（決賽）。賽事由中國化學會主辦，安徽省化學學會與中國科學技術大學化學與材料科學學院共同承辦，來自全國31個省、自治區、直轄市及澳門特別行政區逾600名學生參與。',
      '代表隊由2025/2026學年學界化學比賽獲優異成績的學生組成，8名學生均獲得銅獎。代表隊由澳門大學葉穎暉教授擔任領隊，本會代表陳錫僑教授擔任觀察員。',
    ],
    highlights: [
      {label: '本會角色', value: '本會代表擔任觀察員'},
      {label: '澳門代表學生', value: '8名'},
      {label: '成績', value: '8名學生均獲銅獎'},
      {label: '全國參賽學生', value: '逾600名'},
    ],
    organizers: [
      {role: '主辦', name: '中國化學會'},
      {role: '承辦', name: '安徽省化學學會、中國科學技術大學化學與材料科學學院'},
      {role: '澳門學界代表隊組織', name: '教育及青年發展局'},
    ],
    image: dsedjPhoto(706222),
    imageAlt: '澳門學界代表隊在第39屆中國化學奧林匹克（決賽）會場合照',
    imageCredit: dsedjCredit,
    gallery: [],
    sources: [
      {label: '教育及青年發展局：第39屆中國化學奧林匹克（決賽）澳生奪佳績（2025年11月7日）', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=709975&langsel=C&'},
    ],
    competitionId: 'chemistry-2025-2026',
  },
  fromCompetition('chemistry-2025-2026'),
  {
    id: 'youth-skills-day-2025',
    title: '世界青年技能日活動暨技能滿FUN嘉年華2025',
    category: 'partnered',
    date: '2025-07-05',
    period: '2025年7月5日至6日',
    location: '氹仔星皓廣場',
    role: '本會代表出席開幕式',
    summary: '勞工事務局與澳門青年發展服務中心合辦的技能體驗嘉年華，現場設12項技能體驗工作坊。本會代表出席開幕式。',
    overview: [
      '為響應聯合國訂立每年7月15日為「世界青年技能日」，勞工事務局及澳門青年發展服務中心合辦、澳門中華新青年協會協辦「世界青年技能日活動暨技能滿FUN嘉年華2025」，於2025年7月5日至6日在氹仔星皓廣場舉行，讓青少年動手操作、體驗職業技能的樂趣。',
      '開幕式期間舉辦「技能菁英嘉許禮」，表揚過去一年代表澳門參加國際性及區域性技能競賽並取得優異成績的選手，涉及的賽事包括第47屆世界技能大賽及第二屆「一帶一路」國際技能大賽等。',
      '活動以「巧手藝•新技能」為主題，現場設有12項技能體驗工作坊，涵蓋資訊科技、茶藝、電子技術、廚藝、文創、花藝、編織等範疇，另有企業支援的技能展示表演。本會代表出席了開幕式。',
    ],
    highlights: [
      {label: '本會角色', value: '本會代表出席開幕式'},
      {label: '活動主題', value: '巧手藝•新技能'},
      {label: '技能體驗工作坊', value: '12項'},
      {label: '活動日期', value: '2025年7月5日至6日'},
    ],
    organizers: [
      {role: '合辦', name: '勞工事務局、澳門青年發展服務中心'},
      {role: '協辦', name: '澳門中華新青年協會'},
    ],
    image: '/images/activities/youth-skills-2025/group-photo.jpg',
    imageAlt: '2025 世界青年技能日活動開幕式合照',
    imageCredit: dsalCredit,
    gallery: [
      {src: '/images/activities/youth-skills-2025/opening-speech.jpg', alt: '勞工事務局局長在開幕式上致辭', caption: '勞工事務局陳元童局長在開幕式上致辭', credit: dsalCredit},
      {src: '/images/activities/youth-skills-2025/workshop-03.jpg', alt: '嘉賓參觀技能體驗攤位', caption: '技能體驗工作坊', credit: dsalCredit},
      {src: '/images/activities/youth-skills-2025/workshop-04.jpg', alt: '技能體驗工作坊現場', caption: '技能體驗工作坊', credit: dsalCredit},
      {src: '/images/activities/youth-skills-2025/workshop-05.jpg', alt: '小朋友在廚藝工作坊製作甜點', caption: '技能體驗工作坊', credit: dsalCredit},
      {src: '/images/activities/youth-skills-2025/workshop-06.jpg', alt: '技能體驗工作坊現場', caption: '技能體驗工作坊', credit: dsalCredit},
    ],
    sources: [
      {label: '勞工事務局：「世界青年技能日活動暨技能滿FUN嘉年華2025」鼓勵青年學習職業技能（2025年7月5日）', url: 'https://www.dsal.gov.mo/zh_tw/text/news_detail/article/mcpvdf1l.html'},
    ],
  },
  fromCompetition('macau-youth-robotics-2024-2025'),
  fromCompetition('chemistry-2024-2025'),
  {
    id: 'ccho-37-departure-meeting',
    title: '澳門學界代表隊赴京參加第37屆中國化學奧林匹克（決賽）出發前會議',
    category: 'partnered',
    date: '2023-10-27',
    period: '2023年10月',
    location: '教育及青年發展局',
    role: '承辦單位理事長出席',
    summary: '代表隊8名學生由本會承辦的2023/2024學年學界化學比賽甄選組成。本會理事長黃志文與教青局學生廳廳長陳旭偉在出發前會議上勉勵同學。',
    overview: [
      '教育及青年發展局於2023年11月3日至8日組織澳門學界代表隊前往北京參加第37屆中國化學奧林匹克（決賽），並於出發前在教青局舉行會議。代表隊8名學生均透過2023/2024學年學界化學比賽甄選組成，由澳門大學科技學院葉穎暉助理教授擔任領隊、濠江中學康玉專老師擔任觀察員。',
      '教青局學生廳廳長陳旭偉及承辦單位澳門科技實踐促進會理事長黃志文在會上勉勵同學以最佳狀態投入比賽，珍惜外出學習的機會。',
    ],
    highlights: [
      {label: '本會角色', value: '承辦單位理事長出席'},
      {label: '代表學生', value: '8名'},
      {label: '比賽日期', value: '2023年11月3日至8日'},
      {label: '比賽地點', value: '北京'},
    ],
    organizers: [
      {role: '澳門學界代表隊組織', name: '教育及青年發展局'},
    ],
    image: dsedjPhoto(96037),
    imageAlt: '第37屆中國化學奧林匹克澳門學界代表隊出發前會議合照',
    imageCredit: dsedjCredit,
    gallery: [],
    sources: [
      {label: '教育及青年發展局：學界代表隊赴北京參加第37屆中國化學奧林匹克（決賽）（2023年10月27日）', url: 'https://portal.dsedj.gov.mo/webdsejspace/internet/Inter_main_page.jsp?id=99617&langsel=C&'},
    ],
    competitionId: 'chemistry-2023-2024',
  },
  fromCompetition('chemistry-2023-2024'),
  fromCompetition('macau-youth-robotics-2022-2023'),
];

export const getActivity = (id: string) => activities.find(item => item.id === id);

// 有比賽詳情頁的連到比賽詳情頁，其餘連到活動詳情頁
export const activityHref = (item: Activity) =>
  item.competitionId ? `/competitions/${item.competitionId}` : `/news/${item.id}`;
