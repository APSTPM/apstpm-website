// 協會組織架構：會員大會、理事會、監事會
// 照片放在 public/images/organization/，其中四張取自各人任職大學的官方頁面
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
      {
        id: 'president',
        name: {en: 'Simon Lee Ming-yuen', 'zh-TW': '李銘源'},
        photo: '/images/organization/lee-ming-yuen.jpg',
        position: {en: 'President', 'zh-TW': '會長'},
        affiliation: {
          en: 'Chair Professor of Biomedical Sciences, The Hong Kong Polytechnic University; formerly Professor, Institute of Chinese Medical Sciences, University of Macau',
          'zh-TW': '香港理工大學生物醫學講座教授，曾任澳門大學中華醫藥研究院教授',
        },
        bio: {
          en: 'Researches natural-product and Chinese-medicine drug discovery, neurodegenerative diseases and neuroprotection. At the University of Macau the team built a zebrafish-based high-throughput drug screening platform on microfluidic chips, which received a Technological Invention Award in the 2020 Macao Science and Technology Awards. Also President of the Macao Pharmacology Association.',
          'zh-TW': '研究天然產物與中藥新藥研發、神經退行性疾病及神經保護機制。在澳門大學期間帶領團隊建立基於微流控芯片的斑馬魚高通量藥物篩選平台，獲2020年澳門科學技術獎勵技術發明獎。現任澳門藥理學會會長。',
        },
        duties: duties.president,
        link: 'https://www.polyu.edu.hk/fsn/people/academic-staff/prof-lee-mingyuen-simon/',
      },
      {
        id: 'vice-president',
        name: {en: 'Ip Weng Fai', 'zh-TW': '葉穎暉'},
        photo: '/images/organization/ip-weng-fai.jpg',
        position: {en: 'Vice President', 'zh-TW': '副會長'},
        affiliation: {
          en: 'Assistant Professor, Faculty of Science, University of Macau',
          'zh-TW': '澳門大學理學院助理教授',
        },
        bio: {
          en: 'Researches surface and corrosion chemistry, with applications in electrochemical energy conversion and storage, and oversees the chemistry laboratory. Has co-organised the chemistry competition for Macao secondary school students since 2007, and has led the Macao school team at the Chinese Chemistry Olympiad (national final) several times.',
          'zh-TW': '研究表面及腐蝕化學，應用於電化學能量轉換與儲存，並負責澳大化學實驗室。自2007年起協辦澳門中學生化學比賽，多次擔任澳門學界代表隊領隊，出戰中國化學奧林匹克（決賽）。',
        },
        duties: duties.vicePresident,
        link: 'https://personal.fsc.um.edu.mo/andyip/',
      },
      {id: 'secretary-general', name: zh('林展揚'), position: {en: 'Secretary-General', 'zh-TW': '秘書長'}, duties: duties.secretaryGeneral},
    ],
  },
  {
    key: 'board',
    members: [
      {
        id: 'board-chairman',
        name: {en: 'Matthew Vong Chi Man', 'zh-TW': '黃志文'},
        photo: '/images/organization/vong-chi-man.jpg',
        position: {en: 'Chairman', 'zh-TW': '理事長'},
        affiliation: {
          en: 'Associate Professor, Department of Computer and Information Science, Faculty of Information Science and Computing, University of Macau',
          'zh-TW': '澳門大學信息學院電腦及資訊科學系副教授',
        },
        bio: {
          en: 'Researches intelligent systems and machine learning, and teaches artificial intelligence. Served as Associate Head of the Department of Computer and Information Science from 2017 to 2025. An IEEE Senior Member and a repeat winner of the University of Macau Best Teaching Award.',
          'zh-TW': '研究智能系統與機器學習，教授人工智能課程。2017至2025年任電腦及資訊科學系副系主任，IEEE高級會員，多次獲澳門大學最佳教學獎。',
        },
        duties: duties.boardChairman,
        link: 'https://personal.fic.um.edu.mo/cmvong/',
      },
      {
        id: 'board-vice-chairman-treasurer',
        name: zh('戴景欽'),
        position: {en: 'Vice Chairman (Treasurer)', 'zh-TW': '副理事長（兼財務長）'},
        duties: duties.boardViceChairmanTreasurer,
      },
      {id: 'board-vice-chairman', name: zh('吳建迪'), position: {en: 'Vice Chairman', 'zh-TW': '副理事長'}, duties: duties.boardViceChairman},
      {
        id: 'board-director-1',
        name: zh('黎健恆'),
        photo: '/images/organization/li-jian-heng.jpg',
        position: {en: 'Director', 'zh-TW': '理事'},
        duties: duties.director,
      },
      {
        id: 'board-director-2',
        name: zh('杜加威'),
        photo: '/images/organization/du-jia-wei.jpg',
        position: {en: 'Director', 'zh-TW': '理事'},
        duties: duties.director,
      },
    ],
  },
  {
    key: 'supervisory',
    members: [
      {
        id: 'supervisory-chairman',
        name: {en: 'Wong Pak Kin', 'zh-TW': '王百鍵'},
        photo: '/images/organization/wong-pak-kin.jpg',
        position: {en: 'Chief Supervisor', 'zh-TW': '監事長'},
        affiliation: {
          en: 'Professor, Department of Electromechanical Engineering, and Dean of the Graduate School, University of Macau',
          'zh-TW': '澳門大學機電工程系教授、研究生院院長',
        },
        bio: {
          en: 'Researches automotive engines and powertrains, vehicle dynamics and control, fluid power and intelligent medical engineering. Formerly Head of the Department of Electromechanical Engineering and Associate Dean of the Faculty of Science and Technology, leading the professional accreditation of its engineering and computer science degrees. A Fellow of the Hong Kong Institution of Engineers.',
          'zh-TW': '研究汽車引擎與動力系統、車輛動力學與控制、流體動力及智能醫學工程。曾任機電工程系主任及科技學院副院長，主導學院工程及電腦科學學位的專業認證。香港工程師學會資深會員。',
        },
        duties: duties.supervisoryChairman,
        link: 'https://personal.feg.um.edu.mo/fstpkw/',
      },
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
