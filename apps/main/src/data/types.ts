// 比賽與活動共用的內容結構；字段按日後 CMS 集合的樣子設計，接入時可直接對應
export interface Photo {
  src: string;
  alt: string;
  // 圖片說明，照原出處的說明文字寫
  caption?: string;
  // 圖片不是本會拍攝時標明出處
  credit?: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface Organizer {
  role: string;
  name: string;
}

export interface Highlight {
  label: string;
  value: string;
}
