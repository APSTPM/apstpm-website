# AGENTS.md

澳門科技實踐促進會（APSTPM）官網 monorepo。

## 目前開發範圍

**只開發主站 `apps/main`（macaustpa.org）。**

機器人分站已因業務暫停，相關程式與後端視為封存，不當成現行產品迭代。

| 路徑 | 狀態 | 說明 |
|------|------|------|
| `apps/main` | **現行** | 協會官網：關於、比賽、新聞、畫廊、聯繫 |
| `apps/robot` | **封存** | 原 `robot.macaustpa.org`：討論區、登入、後台 |
| `packages/database` | **封存** | 僅供 robot 的 Supabase 客戶端 |
| `docs/robot/` | **封存** | robot 資料庫／業務文檔 |
| `apps/robot/supabase/` | **封存** | 遷移與 RLS，勿再改 |

除非使用者**明確要求**動封存路徑，否則：

- 不要新增、修復或重構 `apps/robot`、`packages/database`、`docs/robot/`
- 不要為主站接入 Supabase／Auth／Q&A
- 不要恢復討論區、OAuth、管理員後台
- 機器人賽事改在主站當**過往活動**展示（可複用 `apps/robot/src/data/` 的靜態內容，尤其是 `history.ts`）

主站目前是靜態 Next.js（翻譯檔 + 組件），**不依賴資料庫**。

## 技術棧

- Monorepo：Turborepo + pnpm workspace
- `apps/main`：Next.js 15 App Router、React 19、Tailwind CSS 4、next-intl（`en` / `zh-TW`）
- 共用包：`packages/ui`、`packages/i18n`、`packages/utils`、`packages/tsconfig`

## 常用指令

```bash
pnpm install
pnpm --filter main dev    # 主站 http://localhost:3001
pnpm --filter main build
pnpm lint
```

主站環境變數見 `apps/main/.env.example`（目前只需 `NEXT_PUBLIC_SITE_URL`）。

## 約定

- 回覆與提交說明使用繁體中文
- Git 提交用 Gitmoji + 繁體中文，不要用 `feat:` / `fix:` 前綴
- 機器人相關活動 = 主站過往比賽／歷史展示，不是獨立分站
