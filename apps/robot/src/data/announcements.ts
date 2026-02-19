import type { Announcement } from '../lib/content/types';

export const announcements: Announcement[] = [
  {
    id: '1',
    slug: '2025-competition-results',
    title: '2025年度澳門青少年機械人大賽比賽結果公佈',
    content: `
## 比賽結果

恭喜所有參賽隊伍！

本屆比賽吸引了來自澳門各中學的數十支隊伍參加，經過激烈的角逐，以下隊伍獲得優異成績：

### 初級組
- 一等獎：創意先鋒隊
- 二等獎：未來工程師隊
- 三等獎：機械探索隊

### 高級組
- 一等獎：智能先驅隊
- 二等獎：創新達人隊
- 三等獎：科技夢工場隊

完整獲獎名單請查閱附件。
    `,
    publishedAt: '2025-05-20',
    attachments: [
      {
        id: 'a1',
        title: '2025比賽完整獲獎名單',
        url: '/files/2025-results.pdf',
        fileType: 'pdf'
      }
    ]
  },
  {
    id: '2',
    slug: '2025-map-mission',
    title: '2025年度地圖任務設置公佈',
    content: `
## 地圖任務設置

2025年度澳門青少年機械人大賽的地圖任務已經公佈，請各參賽隊伍認真閱讀並做好準備。

### 比賽地圖
本屆比賽採用模擬城市救援任務，參賽機械人需要完成以下任務：
1. 穿越迷宮區域
2. 搬運物資到指定地點
3. 越過障礙物
4. 完成定點任務

詳細規則請參閱比賽規則文檔。
    `,
    publishedAt: '2025-04-15',
    attachments: [
      {
        id: 'a2',
        title: '2025比賽地圖',
        url: '/files/2025-map.pdf',
        fileType: 'pdf'
      },
      {
        id: 'a3',
        title: '任務說明書',
        url: '/files/2025-mission.pdf',
        fileType: 'pdf'
      }
    ]
  },
  {
    id: '3',
    slug: '2025-venue-announcement',
    title: '2025年度比賽場地變更通知',
    content: `
## 重要通知

由於澳門科學館會議中心進行設施升級工程，2025年度澳門青少年機械人大賽的比賽場地將更改為：

**澳門大學體育館**

地址：澳門大學橫琴校區

比賽日期維持不變（2025年5月16日至18日），請各參賽隊伍留意新的場地位置。

不便之處，敬請見諒。
    `,
    publishedAt: '2025-03-10',
    attachments: []
  },
  {
    id: '4',
    slug: '2025-registration-open',
    title: '2025年度澳門青少年機械人大賽報名開始',
    content: `
## 報名通知

2025年度澳門青少年機械人大賽現正接受報名！

### 重要日期
- 報名日期：2025年3月5日至3月26日
- 比賽日期：2025年5月16日至5月18日
- 比賽地點：澳門科學館會議中心

### 參賽資格
面向澳門各中學在校學生，每隊2-4人。

### 報名方式
請填寫網上報名表格，並於截止日期前提交。

如有疑問，請聯繫組委會。
    `,
    publishedAt: '2025-03-05',
    attachments: [
      {
        id: 'a4',
        title: '報名表格',
        url: '/files/2025-registration-form.pdf',
        fileType: 'pdf'
      }
    ]
  },
  {
    id: '5',
    slug: '2024-competition-results',
    title: '2024年度澳門青少年機械人大賽圓滿結束',
    content: `
## 比賽圓滿結束

2024年度澳門青少年機械人大賽已於2024年5月18日至20日在澳門科學館會議中心圓滿舉行。

本屆比賽主題為「智慧城市」，共有30支隊伍參加。比賽過程激烈精彩，充分展示了澳門青少年在科技創新方面的才華。

感謝各參賽學校、指導老師和同學們的積極參與！

2025年度比賽資訊將於稍後公佈，敬請期待。
    `,
    publishedAt: '2024-05-22',
    attachments: []
  }
];
