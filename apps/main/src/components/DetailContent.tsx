import Image from 'next/image';
import {youtubeId} from '@/data/gallery';
import type {Highlight, Organizer, Photo, SourceLink, Video} from '@/data/types';

// 比賽詳情與活動詳情共用的各個區塊；內容只有繁中，所以正文一律標 lang="zh-Hant"
// 概況固定用灰底，其後的區塊由頁面傳 muted 讓底色灰白交替

export function OverviewSection({title, cover, paragraphs}: {title: string; cover: Photo; paragraphs: string[]}) {
  return (
    <section id="overview" className="scroll-mt-16 bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <figure className="relative">
          <Image src={cover.src} alt={cover.alt} width={1280} height={800} unoptimized priority className="aspect-[8/5] w-full bg-gray-100 object-cover" />
          {cover.credit && (
            <figcaption lang="zh-Hant" className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] text-white">{cover.credit}</figcaption>
          )}
        </figure>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-brand-700 font-display mb-4">{title}</h2>
          <div lang="zh-Hant" className="space-y-4 text-lg text-gray-600 leading-relaxed">
            {paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoPlayer({video}: {video: Video}) {
  const id = youtubeId(video.src);
  const className = 'aspect-video w-full rounded-xl bg-black';
  if (id) {
    return <iframe src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`} title={video.title} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen className={className} />;
  }
  return <video src={video.src} poster={video.poster} controls preload="metadata" playsInline aria-label={video.title} className={className} />;
}

export function GallerySection({title, photos, videos = [], muted = false}: {title: string; photos: Photo[]; videos?: Video[]; muted?: boolean}) {
  return (
    <section id="gallery" className={`scroll-mt-16 py-16 px-4 ${muted ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-8">{title}</h2>
        {videos.length > 0 && (
          <div className={`grid grid-cols-1 gap-6 ${photos.length > 0 ? 'mb-10' : ''}`}>
            {videos.map(video => (
              <figure key={video.src} className="min-w-0">
                <VideoPlayer video={video} />
                <figcaption lang="zh-Hant" className="mt-2 flex flex-wrap justify-between gap-x-3 text-sm text-gray-600">
                  <span>{video.caption ?? video.title}</span>
                  {video.credit && <span className="text-xs text-gray-400">{video.credit}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {photos.map(photo => (
            <figure key={photo.src} className="min-w-0">
              {/* 點擊在新分頁打開原圖 */}
              <a href={photo.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800">
                <Image src={photo.src} alt={photo.alt} width={800} height={534} unoptimized className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-105" />
              </a>
              {(photo.caption || photo.credit) && (
                <figcaption lang="zh-Hant" className="mt-2 flex flex-wrap justify-between gap-x-3 text-sm text-gray-600">
                  {photo.caption && <span>{photo.caption}</span>}
                  {photo.credit && <span className="text-xs text-gray-400">{photo.credit}</span>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HighlightsSection({title, items, muted = false}: {title: string; items: Highlight[]; muted?: boolean}) {
  return (
    <section id="highlights" className={`scroll-mt-16 py-16 px-4 ${muted ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-8">{title}</h2>
        <dl lang="zh-Hant" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.label} className={`rounded-xl p-6 border border-gray-100 ${muted ? 'bg-white' : 'bg-gray-50'}`}>
              <dt className="text-sm font-semibold text-gray-500">{item.label}</dt>
              <dd className="mt-2 text-xl font-bold text-brand-700">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function OrganizersSection({title, items, muted = false}: {title: string; items: Organizer[]; muted?: boolean}) {
  return (
    <section id="organizers" className={`scroll-mt-16 py-16 px-4 ${muted ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">{title}</h2>
        <dl lang="zh-Hant" className="space-y-4">
          {items.map(item => (
            <div key={item.role} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="min-w-[140px] font-semibold text-brand-700">{item.role}</dt>
              <dd className="text-gray-700">{item.name}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function SourcesSection({title, items, muted = false}: {title: string; items: SourceLink[]; muted?: boolean}) {
  return (
    <section id="sources" className={`scroll-mt-16 py-16 px-4 ${muted ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">{title}</h2>
        <ul lang="zh-Hant" className="space-y-3">
          {items.map(source => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline underline-offset-4 hover:text-brand-800">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
