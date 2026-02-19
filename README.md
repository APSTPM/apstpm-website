# APSTPM Website

亞太科技教育推廣協會 (Asia Pacific Science, Technology Promotion in Macau) 官方網站。

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspace
- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS 4 + Framer Motion
- **i18n**: next-intl (繁體中文 / English)
- **Fonts**: Space Grotesk (display) + Inter (body) + Noto Sans TC (中文)

## Project Structure

```
apstpm-website/
├── apps/
│   ├── main/                    # 主站 Next.js 應用 (macaustpa.org)
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── [locale]/        # 國際化動態路由
│   │   │   │   ├── page.tsx           # 首頁
│   │   │   │   ├── about/page.tsx     # 關於頁面
│   │   │   │   ├── competitions/
│   │   │   │   │   ├── page.tsx       # 比賽列表頁
│   │   │   │   │   └── [slug]/page.tsx # 比賽詳情頁
│   │   │   │   ├── contact/page.tsx   # 聯繫頁面
│   │   │   │   ├── gallery/page.tsx   # 畫廊頁面
│   │   │   │   ├── news/page.tsx      # 新聞頁面
│   │   │   │   └── layout.tsx         # 國際化佈局
│   │   │   ├── globals.css             # 全域樣式
│   │   │   └── layout.tsx              # 根佈局
│   │   ├── src/
│   │   │   ├── components/       # React 組件
│   │   │   │   ├── ui/           # UI 組件庫 (@apstpm-website/ui)
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── CompetitionCard.tsx
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   ├── Timeline.tsx
│   │   │   │   └── index.ts
│   │   │   ├── i18n/             # 國際化配置
│   │   │   │   ├── routing.ts
│   │   │   │   └── request.ts
│   │   │   └── lib/
│   │   │       └── utils.ts
│   │   ├── messages/             # 翻譯檔案
│   │   │   ├── en.json
│   │   │   └── zh-TW.json
│   │   ├── middleware.ts         # 中間件
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── robot/                    # 機器人競賽分站 (robot.macaustpa.org)
│       ├── app/                  # Next.js App Router
│       │   ├── [locale]/         # 國際化動態路由
│       │   │   ├── page.tsx            # 首頁
│       │   │   ├── HomePageContent.tsx # 首頁內容
│       │   │   ├── announcements/      # 公告頁面
│       │   │   │   ├── page.tsx
│       │   │   │   └── [slug]/page.tsx # 公告詳情
│       │   │   ├── competition/         # 競賽頁面
│       │   │   │   ├── page.tsx
│       │   │   │   └── CompetitionPageContent.tsx
│       │   │   ├── contact/page.tsx    # 聯繫頁面
│       │   │   ├── history/page.tsx    # 歷史頁面
│       │   │   │   └── HistoryPageContent.tsx
│       │   │   ├── rules/page.tsx      # 規則頁面
│       │   │   │   └── RulesPageContent.tsx
│       │   │   └── layout.tsx          # 國際化佈局
│       │   ├── globals.css
│       │   └── layout.tsx
│       ├── src/
│       │   ├── components/       # React 組件
│       │   │   ├── Navigation.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Hero.tsx
│       │   │   ├── AnnouncementCard.tsx
│       │   │   ├── CompetitionTimeline.tsx
│       │   │   ├── FileDownloadCard.tsx
│       │   │   └── GiscusComments.tsx  # 評論系統
│       │   ├── data/             # 靜態內容數據
│       │   │   ├── announcements.ts
│       │   │   ├── competition.ts
│       │   │   ├── contact.ts
│       │   │   ├── history.ts
│       │   │   └── rules.ts
│       │   ├── i18n/
│       │   │   ├── routing.ts
│       │   │   └── request.ts
│       │   └── lib/content/      # 內容管理
│       ├── messages/             # 翻譯檔案
│       │   ├── en.json
│       │   └── zh-TW.json
│       ├── middleware.ts
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       └── package.json
├── packages/
│   ├── ui/                 # 共享 UI 元件庫
│   │   ├── src/
│   │   │   ├── Button.tsx      # 按鈕組件
│   │   │   ├── Card.tsx        # 卡片組件
│   │   │   ├── Input.tsx       # 輸入框組件
│   │   │   ├── Badge.tsx       # 徽章組件
│   │   │   ├── lib/utils.ts    # cn() 工具函數
│   │   │   └── index.ts        # 統一導出
│   │   └── package.json
│   ├── i18n/               # 國際化配置包
│   │   ├── src/index.ts    # 翻譯獲取工具
│   │   └── package.json
│   ├── utils/              # 工具函數包
│   │   ├── src/index.ts    # cn, formatDate, debounce 等
│   │   └── package.json
│   └── tsconfig/           # 共享 TypeScript 配置
│       ├── base.json
│       ├── react.json
│       └── node.json
├── turbo.json              # Turborepo 配置
├── pnpm-workspace.yaml     # pnpm workspace 配置
└── package.json            # 根 package.json
```

## Apps

This is a monorepo with multiple Next.js applications:

| App | Domain | Description |
|-----|--------|-------------|
| `apps/main` | macaustpa.org | 主站 - 協會官網，包含關於、比賽、新聞、畫廊等 |
| `apps/robot` | robot.macaustpa.org | 機器人競賽分站 - 公告、競賽資訊、規則、歷史 |

### Main Site Routes (`apps/main`)

| 路徑 | 頁面 |
|------|------|
| `/` | 首頁 |
| `/about` | 關於頁面 |
| `/competitions` | 比賽列表 |
| `/competitions/[slug]` | 比賽詳情 |
| `/contact` | 聯繫我們 |
| `/gallery` | 畫廊 |
| `/news` | 新聞 |

### Robot Site Routes (`apps/robot`)

| 路徑 | 頁面 |
|------|------|
| `/` | 首頁 |
| `/announcements` | 公告列表 |
| `/announcements/[slug]` | 公告詳情 |
| `/competition` | 競賽資訊 |
| `/contact` | 聯繫我們 |
| `/history` | 歷史沿革 |
| `/rules` | 比賽規則 |

所有頁面支援 `[locale]` 動態路由，支持 `en` 和 `zh-TW` 兩種語言。

## Packages

| Package | Name | Description |
|---------|------|-------------|
| Main App | `apps/main` | Next.js 15 主站應用 |
| Robot App | `apps/robot` | Next.js 15 機器人競賽分站 |
| UI | `@apstpm-website/ui` | 共享 UI 組件庫 |
| i18n | `@apstpm-website/i18n` | 國際化配置與翻譯 |
| utils | `@apstpm-website/utils` | 通用工具函數 |
| tsconfig | `@apstpm-website/tsconfig` | 共享 TypeScript 配置 |

### Apps Comparison

| Feature | Main Site | Robot Site |
|---------|-----------|------------|
| **Theme** | 綠色 (brand-*) | 藍色 (robot-*) + 綠色 |
| **Pages** | 首頁、關於、比賽、新聞、畫廊、聯繫 | 首頁、公告、競賽、歷史、規則、聯繫 |
| **Comments** | 無 | Giscus 評論系統 |
| **Form Validation** | react-hook-form + zod | 無 |
| **Data Source** | 翻譯檔案 + 組件 | 翻譯檔案 + src/data/ 靜態數據 |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

## Development

The main website runs at `http://localhost:3000` by default.

### Available Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm clean` | Clean build outputs |

### Environment Variables

Create a `.env.local` file in `apps/main` for local development:

```bash
# Optional: Analytics or API keys
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Dependencies

### Main Dependencies

- **Next.js**: ^15.1.0 (App Router, Server Components)
- **React**: ^19.0.0
- **Tailwind CSS**: ^4.0.0
- **Framer Motion**: ^11.15.0
- **next-intl**: ^3.26.0
- **lucide-react**: ^0.469.0 (Icons)
- **react-hook-form**: ^7.54.2
- **zod**: ^3.24.1

### UI Components (via @apstpm-website/ui)

- Button (variants: primary, secondary, outline, ghost, destructive)
- Card (with Header, Title, Description, Content, Footer)
- Input
- Badge (variants: default, secondary, success, warning, destructive, outline)

## License

MIT
