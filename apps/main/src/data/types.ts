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

export interface Video {
  // 本地視頻放 public/videos/ 下填路徑；也可以直接填 YouTube 鏈接
  src: string;
  // 視頻標題，同時用作播放器的無障礙名稱
  title: string;
  // 封面圖；YouTube 不填時自動取縮略圖，本地視頻不填時顯示第一幀
  poster?: string;
  caption?: string;
  credit?: string;
}
