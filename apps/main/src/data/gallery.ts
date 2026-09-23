// 媒體庫不另存數據，從比賽和活動的封面、相冊、視頻收集，按活動分組成相冊
// 新增相片或視頻只需加到對應比賽或活動的 gallery / videos 字段
import {activities, activityHref} from './activities';
import {competitions} from './competitions';
import type {Photo, Video} from './types';

export type MediaType = 'image' | 'video';

export interface MediaItem {
  type: MediaType;
  src: string;
  // 圖片的替代文字，或視頻標題
  alt: string;
  // 網格縮略圖；本地視頻沒有封面時為空，由組件顯示第一幀
  thumbnail?: string;
  caption?: string;
  credit?: string;
}

export interface Album {
  id: string;
  title: string;
  // ISO 日期，用於排序
  date: string;
  period: string;
  href: string;
  // 相冊封面，取第一項有縮略圖的相片或視頻
  cover?: string;
  items: MediaItem[];
}

const youtubePattern = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/;

export const youtubeId = (src: string) => src.match(youtubePattern)?.[1];

const fromPhoto = (photo: Photo): MediaItem => ({type: 'image', src: photo.src, alt: photo.alt, thumbnail: photo.src, caption: photo.caption, credit: photo.credit});

const fromVideo = (video: Video): MediaItem => {
  const id = youtubeId(video.src);
  return {
    type: 'video',
    src: video.src,
    alt: video.title,
    thumbnail: video.poster ?? (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined),
    caption: video.caption ?? video.title,
    credit: video.credit,
  };
};

interface MediaSource {
  id: string;
  title: string;
  date: string;
  period: string;
  href: string;
  cover: Photo;
  gallery: Photo[];
  videos: Video[];
}

// 活動排在比賽前面：同一張圖同時出現在活動和比賽時，歸到原出處的活動相冊
// 本會承辦的比賽在活動列表裡與比賽同 id，會合併成同一個相冊
const sources: MediaSource[] = [
  ...activities.map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    period: item.period,
    href: activityHref(item),
    cover: {src: item.image, alt: item.imageAlt ?? item.title, credit: item.imageCredit},
    gallery: item.gallery,
    videos: item.videos ?? [],
  })),
  ...competitions.map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    period: item.period,
    href: `/competitions/${item.id}`,
    cover: {src: item.image, alt: item.imageAlt ?? item.title, credit: item.imageCredit},
    gallery: item.gallery ?? [],
    videos: item.videos ?? [],
  })),
];

const buildAlbums = () => {
  const albums = new Map<string, Album>();
  const seen = new Set<string>();
  for (const source of sources) {
    const album = albums.get(source.id) ?? {id: source.id, title: source.title, date: source.date, period: source.period, href: source.href, items: []};
    // 視頻排在相片前面
    const items = [...source.videos.map(fromVideo), ...[source.cover, ...source.gallery].map(fromPhoto)];
    for (const item of items) {
      if (seen.has(item.src)) continue;
      seen.add(item.src);
      album.items.push(item);
    }
    albums.set(source.id, album);
  }
  return [...albums.values()]
    .filter(album => album.items.length > 0)
    .map(album => ({...album, cover: album.items.find(item => item.thumbnail)?.thumbnail}))
    .sort((a, b) => b.date.localeCompare(a.date));
};

// 按活動日期由新到舊
export const albums: Album[] = buildAlbums();
