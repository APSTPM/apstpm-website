// 協會組織架構：會員大會、理事會、監事會
// 有照片後把檔案放到 public/images/organization/，再填入 photo（例如 '/images/organization/president.jpg'）
// affiliation／bio／link 只填有公開來源可核實的，其餘待本人提供

type Localized = {en: string; 'zh-TW': string};

export type OrganizationMember = {
  id: string;
  name: Localized;
  position: Localized;
  photo?: string;
  // 本職，例如任職機構與職稱
  affiliation?: Localized;
  // 個人簡介
  bio?: Localized;
  // 在會內負責的工作
  duties?: Localized;
  // 個人主頁（學校／機構頁面等），有才顯示跳轉按鈕
  link?: string;
};

export type OrganizationGroup = {
  key: 'generalAssembly' | 'board' | 'supervisory';
  members: OrganizationMember[];
};

// 中文名；英文頁暫時沿用中文，拿到本人確認的英文拼法後再改
const zh = (name: string): Localized => ({en: name, 'zh-TW': name});

// 各職位在會內的日常工作，按一般社團章程的分工撰寫，如有出入請按本會章程修改
const duties = {
  president: {
    'zh-TW': '對外代表本會，主持會員大會，統籌本會的整體發展方向。',
    en: 'Represents the association externally, presides over the General Assembly and sets its overall direction.',
  },
  vicePresident: {
    'zh-TW': '協助會長處理會務，會長缺席時代行其職務。',
    en: 'Assists the President and acts on their behalf when they are absent.',
  },
  secretaryGeneral: {
    'zh-TW': '負責會員大會的會議籌備與紀錄、文書往來及會員事務。',
    en: 'Prepares and minutes General Assembly meetings, and handles correspondence and membership affairs.',
  },
  boardChairman: {
    'zh-TW': '主持理事會，執行會員大會的決議，統籌比賽承辦、培訓及各項活動的日常運作。',
    en: 'Chairs the Board, carries out General Assembly resolutions, and oversees the day-to-day running of competitions, training and activities.',
  },
  boardViceChairmanTreasurer: {
    'zh-TW': '協助理事長處理會務，同時負責本會財務，包括收支、會費及年度財務報告。',
    en: 'Assists the Chairman and manages the finances, including income, expenses, membership fees and the annual financial report.',
  },
  boardViceChairman: {
    'zh-TW': '協助理事長推動會務，參與比賽及活動的籌劃與執行。',
    en: 'Assists the Chairman and helps plan and run competitions and activities.',
  },
  director: {
    'zh-TW': '出席理事會會議，參與會務決策，協助籌辦比賽、培訓及推廣活動。',
    en: 'Attends Board meetings, takes part in decisions, and helps organise competitions, training and outreach.',
  },
  supervisoryChairman: {
    'zh-TW': '主持監事會，監察理事會的工作及本會財務，向會員大會提交監察報告。',
    en: 'Chairs the Supervisory Board, oversees the work of the Board and the finances, and reports to the General Assembly.',
  },
  supervisoryViceChairman: {
    'zh-TW': '協助監事長履行監察職責，監事長缺席時代行其職務。',
    en: 'Assists the Chief Supervisor and acts on their behalf when they are absent.',
  },
  supervisor: {
    'zh-TW': '出席監事會會議，查核本會帳目及會務執行情況。',
    en: 'Attends Supervisory Board meetings and reviews the accounts and the conduct of affairs.',
  },
} satisfies Record<string, Localized>;

export const organizationGroups: OrganizationGroup[] = [
  {
    key: 'generalAssembly',
    members: [
      {id: 'president', name: zh('李銘源'), position: {en: 'President', 'zh-TW': '會長'}, duties: duties.president},
      {
        id: 'vice-president',
        name: {en: 'Ip Weng Fai', 'zh-TW': '葉穎暉'},
        position: {en: 'Vice President', 'zh-TW': '副會長'},
        affiliation: {
          en: 'Assistant Professor, Faculty of Science and Technology, University of Macau',
          'zh-TW': '澳門大學科技學院助理教授',
        },
        bio: {
          en: 'A physical chemist researching surface and corrosion chemistry, with applications in electrochemical energy conversion and storage, and a multiple-time team leader of the Macao school team at the Chinese Chemistry Olympiad (national final).',
          'zh-TW': '物理化學學者，研究表面及腐蝕化學，應用於電化學能量轉換與儲存。多次擔任澳門學界代表隊領隊，出戰中國化學奧林匹克（決賽）。',
        },
        duties: duties.vicePresident,
        link: 'https://www.fst.um.edu.mo/people/andyip/',
      },
      {id: 'secretary-general', name: zh('林展揚'), position: {en: 'Secretary-General', 'zh-TW': '秘書長'}, duties: duties.secretaryGeneral},
    ],
  },
  {
    key: 'board',
    members: [
      {id: 'board-chairman', name: zh('黃志文'), position: {en: 'Chairman', 'zh-TW': '理事長'}, duties: duties.boardChairman},
      {
        id: 'board-vice-chairman-treasurer',
        name: zh('戴景欽'),
        position: {en: 'Vice Chairman (Treasurer)', 'zh-TW': '副理事長（兼財務長）'},
        duties: duties.boardViceChairmanTreasurer,
      },
      {id: 'board-vice-chairman', name: zh('吳建迪'), position: {en: 'Vice Chairman', 'zh-TW': '副理事長'}, duties: duties.boardViceChairman},
      {id: 'board-director-1', name: zh('黎健恆'), position: {en: 'Director', 'zh-TW': '理事'}, duties: duties.director},
      {id: 'board-director-2', name: zh('杜加威'), position: {en: 'Director', 'zh-TW': '理事'}, duties: duties.director},
    ],
  },
  {
    key: 'supervisory',
    members: [
      {id: 'supervisory-chairman', name: zh('王百鍵'), position: {en: 'Chief Supervisor', 'zh-TW': '監事長'}, duties: duties.supervisoryChairman},
      {
        id: 'supervisory-vice-chairman',
        name: zh('黃威特'),
        position: {en: 'Deputy Chief Supervisor', 'zh-TW': '副監事長'},
        duties: duties.supervisoryViceChairman,
      },
      {id: 'supervisor', name: zh('黃濠華'), position: {en: 'Supervisor', 'zh-TW': '監事'}, duties: duties.supervisor},
    ],
  },
];
