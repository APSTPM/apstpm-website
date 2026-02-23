# Robot 站文檔

本目錄包含 Robot 站的技術文檔。

## 文檔索引

- [數據庫結構文檔](./database.md) - 數據庫表結構、關係、RLS 策略等
- [業務邏輯文檔](./business-logic.md) - 業務功能模塊、數據流程、操作流程等

## 快速開始

### 數據庫相關

如需了解數據庫結構，請參考 [database.md](./database.md)。

主要內容：
- 7 個數據庫表的詳細結構
- 數據庫關係圖
- 觸發器與函數說明
- RLS 安全策略
- 數據庫遷移記錄

### 業務邏輯相關

如需了解業務功能，請參考 [business-logic.md](./business-logic.md)。

主要內容：
- 5 大業務功能模塊詳解
- 完整的數據流程圖
- 關鍵檔案索引
- 安全考量說明

## 技術棧摘要

- **框架：** Next.js 15 (App Router)
- **語言：** TypeScript
- **樣式：** Tailwind CSS 4
- **數據庫：** Supabase (PostgreSQL)
- **i18n：** next-intl（僅支援 zh-TW 繁體中文）
- **其他：** React 19, Turborepo

## 專案結構

```
apps/robot/
├── app/               # Next.js App Router（扁平路由）
├── supabase/          # Supabase 配置和遷移
├── messages/          # 翻譯檔案（zh-TW）
│   └── zh-TW.json
└── src/
    ├── components/    # React 元件
    ├── i18n/          # zh-TW 單語配置
    │   └── request.ts
    └── lib/
        ├── actions/   # Server Actions
        ├── queries/   # 數據查詢
        └── utils/     # 工具函數

packages/database/
└── src/
    ├── types/         # 數據庫類型定義
    └── client/        # Supabase 客戶端
```
