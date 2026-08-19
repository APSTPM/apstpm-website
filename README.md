# APSTPM Website

澳門科技實踐促進會 (Association of Promotion of Science and Technology Practice in Macau) 官方網站及其子網站。

## 開發注意：不要頻繁 push 到 `master`

主站部署在 Netlify。`master` 是 production 分支，**每次成功部署到正式站會消耗 15 credits**。免費方案每月約 **300 credits**（大約 **20 次**正式上線）；額度用完後全站會暫停，要等下個週期才恢復，且無法加購。

- 日常開發請用 **分支或 PR**（Deploy Preview 不扣 credits），確認後再合進 `master`
- 不要把 `master` 當存檔鍵；一天多次 push 到 `master` 會很快用完額度
- 免費方案通常同時只能跑 1 個 build，連續推送會排隊
- 只改 `apps/robot` 等與主站無關的檔案時，`apps/main/netlify.toml` 的 `ignore` 可能會跳過本次 build；改 `apps/main`、`packages/` 或 lockfile 仍會部署並扣 credits
- 用量在 Netlify → Team → Billing / Usage 查看

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspace
- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS 4 + Framer Motion
- **i18n**: next-intl
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Email**: Resend (optional, for QA notifications)
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
│       ├── app/                  # Next.js App Router（扁平路由）
│       │   ├── page.tsx                # 首頁
│       │   ├── HomePageContent.tsx     # 首頁內容
│       │   ├── announcements/          # 公告頁面
│       │   │   ├── page.tsx
│       │   │   └── [slug]/page.tsx     # 公告詳情
│       │   ├── competition/            # 競賽頁面
│       │   │   ├── page.tsx
│       │   │   └── CompetitionPageContent.tsx
│       │   ├── contact/page.tsx        # 聯繫頁面
│       │   ├── history/page.tsx        # 歷史頁面
│       │   │   └── HistoryPageContent.tsx
│       │   ├── rules/page.tsx          # 規則頁面
│       │   │   └── RulesPageContent.tsx
│       │   ├── qa/                     # Q&A 問答
│       │   │   ├── page.tsx
│       │   │   ├── new/page.tsx
│       │   │   └── [id]/page.tsx
│       │   ├── auth/                   # 認證
│       │   │   ├── login/page.tsx
│       │   │   ├── complete-profile/page.tsx
│       │   │   ├── callback/route.ts
│       │   │   └── confirm/route.ts
│       │   ├── admin/                  # 管理後台
│       │   │   ├── page.tsx
│       │   │   ├── qa/page.tsx
│       │   │   ├── schools/page.tsx
│       │   │   └── competition-categories/page.tsx
│       │   ├── settings/page.tsx
│       │   ├── layout.tsx
│       │   └── globals.css
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
│       │   │   └── request.ts          # zh-TW 單語配置
│       │   └── lib/content/      # 內容管理
│       ├── messages/             # 翻譯檔案（zh-TW）
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

| App          | Domain              | Description                                   |
| ------------ | ------------------- | --------------------------------------------- |
| `apps/main`  | macaustpa.org       | 主站 - 協會官網，包含關於、比賽、新聞、畫廊等 |
| `apps/robot` | robot.macaustpa.org | 機器人競賽分站 - 公告、競賽資訊、規則、歷史   |

### Main Site Routes (`apps/main`)

| 路徑                   | 頁面     |
| ---------------------- | -------- |
| `/`                    | 首頁     |
| `/about`               | 關於頁面 |
| `/competitions`        | 比賽列表 |
| `/competitions/[slug]` | 比賽詳情 |
| `/contact`             | 聯繫我們 |
| `/gallery`             | 畫廊     |
| `/news`                | 新聞     |

### Robot Site Routes (`apps/robot`)

| 路徑                    | 頁面         |
| ----------------------- | ------------ |
| `/`                     | 首頁         |
| `/announcements`        | 公告列表     |
| `/announcements/[slug]` | 公告詳情     |
| `/competition`          | 競賽資訊     |
| `/contact`              | 聯繫我們     |
| `/history`              | 歷史沿革     |
| `/rules`                | 比賽規則     |
| `/qa`                   | Q&A 問答列表 |
| `/qa/[id]`              | 問答詳情     |
| `/auth/login`           | 登入頁面     |
| `/admin`                | 管理後台     |
| `/admin/qa`             | 管理 Q&A     |

Robot 站採用扁平路由，僅支援 zh-TW 繁體中文。

## Packages

| Package   | Name                       | Description                                     |
| --------- | -------------------------- | ----------------------------------------------- |
| Main App  | `apps/main`                | Next.js 15 主站應用                             |
| Robot App | `apps/robot`               | Next.js 15 機器人競賽分站                       |
| UI        | `@apstpm-website/ui`       | 共享 UI 組件庫                                  |
| Database  | `@apstpm/database`         | Supabase 客戶端封裝 (browser/server/middleware) |
| i18n      | `@apstpm-website/i18n`     | 翻譯配置（zh-TW）                               |
| utils     | `@apstpm-website/utils`    | 通用工具函數                                    |
| tsconfig  | `@apstpm-website/tsconfig` | 共享 TypeScript 配置                            |

### Apps Comparison

| Feature             | Main Site                          | Robot Site                         |
| ------------------- | ---------------------------------- | ---------------------------------- |
| **Theme**           | 綠色 (brand-*)                     | 藍色 (robot-*) + 綠色              |
| **Pages**           | 首頁、關於、比賽、新聞、畫廊、聯繫 | 首頁、公告、競賽、歷史、規則、聯繫 |
| **Comments**        | 無                                 | Giscus 評論系統                    |
| **Form Validation** | react-hook-form + zod              | 無                                 |
| **Data Source**     | 翻譯檔案 + 組件                    | 翻譯檔案 + src/data/ 靜態數據      |

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

| Command      | Description         |
| ------------ | ------------------- |
| `pnpm dev`   | Start dev server    |
| `pnpm build` | Build all packages  |
| `pnpm lint`  | Lint all packages   |
| `pnpm clean` | Clean build outputs |

### Environment Variables

每個應用都提供 `.env.example` 模板文件。首次配置時，複製模板並填入你的配置：

```bash
# 複製模板文件
cp apps/main/.env.example apps/main/.env.local
cp apps/robot/.env.example apps/robot/.env.local
```

#### `apps/main/.env.local`（主站）：

參考 `apps/main/.env.example`，目前僅需配置：

| 變量                   | 必填 | 說明                                         |
| ---------------------- | ---- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | ✅    | 站點 URL，開發環境為 `http://localhost:3000` |

#### `apps/robot/.env.local`（機器人競賽分站）：

參考 `apps/robot/.env.example`，需要配置：

| 變量                            | 必填 | 說明                                                            |
| ------------------------------- | ---- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅    | Supabase 項目 URL（從 Dashboard > Project Settings > API 獲取） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅    | Supabase Publishable Key（安全，可公開）                        |
| `RESEND_API_KEY`                | ❌    | Resend 郵件服務 API Key（不設置則跳過郵件通知）                 |
| `NEXT_PUBLIC_SITE_URL`          | ✅    | 用於郵件中的連結                                                |

## Database Setup (Supabase)

Robot 分站使用 Supabase 作為數據庫和認證後端。首次設置需執行以下步驟。

### 1. 創建 Supabase 項目

前往 [supabase.com](https://supabase.com) 創建項目，記下 Project URL 和 API Keys。

### 2. 配置 OAuth 登入（Dashboard > Authentication > Providers）

項目支持三種 OAuth 登入方式，回調 URL 統一為：

```
https://<your-project-ref>.supabase.co/auth/v1/callback
```

**GitHub OAuth**：
1. 前往 [github.com/settings/developers](https://github.com/settings/developers) → New OAuth App
2. Authorization callback URL 填入上方回調 URL
3. 將 Client ID / Client Secret 填入 Supabase Dashboard > Authentication > Providers > GitHub

**Google OAuth**：
1. 前往 [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → Create OAuth client ID
2. Authorized redirect URIs 填入上方回調 URL
3. 將 Client ID / Client Secret 填入 Supabase Dashboard > Authentication > Providers > Google

**Microsoft (Azure) OAuth**：
1. 前往 [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration
2. Redirect URI (Web) 填入上方回調 URL
3. 將 Application (client) ID 和 Client Secret **Value** 填入 Supabase Dashboard > Authentication > Providers > Azure

### 3. 配置 Redirect URLs

在 Supabase Dashboard > Authentication > URL Configuration 中添加：

```
http://localhost:3000/auth/callback
http://localhost:3000/auth/confirm
```

生產環境部署後，再添加對應的生產域名 URL。

### 4. 執行數據庫遷移

遷移文件位於 `apps/robot/supabase/migrations/`，包含：

| 文件                    | 說明                                     |
| ----------------------- | ---------------------------------------- |
| `001_profiles.sql`      | 用戶檔案表 + 自動建立 profile 的 trigger |
| `002_qa_tables.sql`     | Q&A 問答表 + 回覆表 + RLS 策略           |
| `003_rule_versions.sql` | 規則版本表                               |

**方式 A：使用 Supabase CLI**

```bash
cd apps/robot
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

**方式 B：在 Supabase Dashboard 手動執行**

如果 CLI 連線失敗（已知 TLS 問題），可在 Dashboard > SQL Editor 中按順序粘貼執行三個 SQL 文件的內容，效果相同。

> ⚠️ 必須按 001 → 002 → 003 順序執行，後續表依賴前置表。

### 5. 設置管理員

需要先用任意 OAuth 或 Magic Link 登入一次，讓 trigger 自動在 `profiles` 表中建立記錄，然後在 Dashboard > SQL Editor 中執行：

```sql
-- 查看已有用戶
SELECT id, email, role FROM profiles;

-- 將指定用戶設為管理員
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```



# 生產環境須知
1. Supabase Dashboard → Authentication → URL Configuration：
- Site URL：設置為你的實際域名（如 https://xxx.org）
- Redirect URLs：包含你的實際域名

2. 修改Oauth中的url
3. 修改環境變數 apps/robot/.env.local：   NEXT_PUBLIC_SITE_URL=https://xxx.org
