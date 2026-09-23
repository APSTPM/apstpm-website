// 協會組織架構：會員大會、理事會、監事會
// 有照片後把檔案放到 public/images/organization/，再填入 photo（例如 '/images/organization/president.jpg'）
// name 目前是占位，拿到名單後替換

type Localized = {en: string; 'zh-TW': string};

export type OrganizationMember = {
  id: string;
  name: Localized;
  position: Localized;
  photo?: string;
};

export type OrganizationGroup = {
  key: 'generalAssembly' | 'board' | 'supervisory';
  members: OrganizationMember[];
};

const tbd: Localized = {en: 'To be announced', 'zh-TW': '待定'};

export const organizationGroups: OrganizationGroup[] = [
  {
    key: 'generalAssembly',
    members: [
      {id: 'president', name: tbd, position: {en: 'President', 'zh-TW': '會長'}},
      {id: 'vice-president', name: tbd, position: {en: 'Vice President', 'zh-TW': '副會長'}},
      {id: 'secretary-general', name: tbd, position: {en: 'Secretary-General', 'zh-TW': '秘書長'}},
    ],
  },
  {
    key: 'board',
    members: [
      {id: 'board-chairman', name: tbd, position: {en: 'Chairman', 'zh-TW': '理事長'}},
      {id: 'board-vice-chairman-treasurer', name: tbd, position: {en: 'Vice Chairman (Treasurer)', 'zh-TW': '副理事長(兼財務長)'}},
      {id: 'board-vice-chairman', name: tbd, position: {en: 'Vice Chairman', 'zh-TW': '副理事長'}},
      {id: 'board-director-1', name: tbd, position: {en: 'Director', 'zh-TW': '理事'}},
      {id: 'board-director-2', name: tbd, position: {en: 'Director', 'zh-TW': '理事'}},
    ],
  },
  {
    key: 'supervisory',
    members: [
      {id: 'supervisory-chairman', name: tbd, position: {en: 'Chief Supervisor', 'zh-TW': '監事長'}},
      {id: 'supervisory-vice-chairman', name: tbd, position: {en: 'Deputy Chief Supervisor', 'zh-TW': '副監事長'}},
      {id: 'supervisor', name: tbd, position: {en: 'Supervisor', 'zh-TW': '監事'}},
    ],
  },
];
