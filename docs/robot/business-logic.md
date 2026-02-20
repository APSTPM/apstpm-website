# Robot 站業務邏輯文檔

本文檔描述了 Robot 站的主要業務功能模塊、數據流程和操作流程。

## 技術棧

- **框架：** Next.js 15 (App Router)
- **語言：** TypeScript
- **樣式：** Tailwind CSS 4
- **國際化：** next-intl
- **狀態管理：** React Server Components + Server Actions
- **數據獲取：** React Query (TanStack Query)

---

## 主要業務功能模塊

### 1. 用戶認證與資料管理

#### 功能說明
- 基於 Supabase Auth 的用戶認證
- 新用戶需完成個人資料才能使用系統
- 用戶可在設定頁面更新個人資料
- 支援教師和學生兩種用戶類型

#### 核心流程

##### 新用戶註冊流程
```
1. 用戶經 Supabase Auth 註冊
   ↓
2. 觸發 handle_new_user() 建立 profiles 記錄
   ↓
3. 用戶被導向完成 profile 頁面
   ↓
4. 填寫真實姓名、學校、用戶類型
   ↓
5. 調用 completeProfile() action
   ↓
6. 設定 profile_completed=true 和 cookie
   ↓
7. 導向問答頁面
```

#### 關鍵檔案

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| Server Actions | `apps/robot/src/lib/actions/profile.ts` | 完成 profile 相關操作 |
| Server Actions | `apps/robot/src/lib/actions/updateProfile.ts` | 更新 profile 相關操作 |
| 元件 | `apps/robot/src/components/auth/CompleteProfileForm.tsx` | 完成 profile 表單 |
| 元件 | `apps/robot/src/components/settings/ProfileSettingsForm.tsx` | profile 設定表單 |
| 元件 | `apps/robot/src/components/auth/AuthGuard.tsx` | 認證守護 |

#### 數據驗證

- **display_name:** 可選
- **real_name:** 必填
- **school_id:** 必填
- **user_type:** 必填（'teacher' 或 'student'）

---

### 2. 問答系統 (QA)

#### 功能說明
- 用戶可建立新貼文
- 用戶可回覆貼文
- 管理員可置頂/取消置頂貼文
- 管理員可刪除貼文和回覆
- 管理員回覆自動標記為「官方回覆」
- 自動根據最後回覆更新貼文狀態
- 新貼文通知管理員，新回覆通知貼文作者

#### 核心流程

##### 問答貼文建立流程
```
1. 用戶填寫表單（標題、內容、標籤）
   ↓
2. 調用 createPost() action
   ↓
3. 驗證輸入（長度限制）
   ↓
4. 寫入 qa_posts 表
   ↓
5. 調用 notifyAdmins() 寄送郵件給所有管理員
   ↓
6. 重新驗證 /qa 路徑
   ↓
7. 導向貼文詳情頁
```

##### 問答回覆流程
```
1. 用戶填寫回覆表單
   ↓
2. 調用 createReply() action
   ↓
3. 檢查用戶 role
   ↓
4. 管理員回覆標記 is_official=true
   ↓
5. 寫入 qa_replies 表
   ↓
6. 觸發 update_reply_count() 遞增計數
   ↓
7. 調用 updatePostStatusBasedOnLastReply() 更新貼文狀態
   ↓
8. 調用 notifyPostAuthor() 通知貼文作者
   ↓
9. 重新驗證相關路徑
```

##### 貼文狀態更新邏輯
- 有官方回覆 → `status = 'answered'`
- 無官方回覆 → `status = 'open'`

#### 關鍵檔案

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| Server Actions | `apps/robot/src/lib/actions/qa.ts` | 問答相關操作 |
| Server Actions | `apps/robot/src/lib/actions/notify.ts` | 通知相關操作 |
| Queries | `apps/robot/src/lib/queries/qa.ts` | 問答相關查詢 |
| 元件 | `apps/robot/src/components/qa/QaDetail.tsx` | 貼文詳情頁 |
| 元件 | `apps/robot/src/components/qa/QaPostCard.tsx` | 貼文卡片 |
| 元件 | `apps/robot/src/components/qa/QaNewPostForm.tsx` | 新貼文表單 |
| 元件 | `apps/robot/src/components/qa/QaReplyForm.tsx` | 回覆表單 |
| 元件 | `apps/robot/src/components/admin/AdminQaList.tsx` | 管理員貼文列表 |

#### 數據驗證

**貼文：**
- **title:** 1-200 字元
- **content:** 最少 10 字元
- **tags:** 可選，字串陣列

**回覆：**
- **content:** 最少 1 字元

---

### 3. 學校管理

#### 功能說明
- 管理員可建立新學校
- 管理員可更新學校資訊
- 管理員可刪除學校
- 學校包含代碼和名稱兩個欄位

#### 關鍵檔案

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| Server Actions | `apps/robot/src/lib/actions/schools.ts` | 學校相關操作 |
| Queries | `apps/robot/src/lib/queries/schools.ts` | 學校相關查詢 |
| 元件 | `apps/robot/src/components/admin/AdminSchoolList.tsx` | 管理員學校列表 |

#### 數據驗證

- **code:** 必填，唯一
- **name:** 必填

---

### 4. 競賽類別管理

#### 功能說明
- 管理員可建立新競賽類別
- 管理員可更新競賽類別
- 管理員可刪除競賽類別
- 包含中文名稱和英文名稱

#### 預設競賽類別
- VEXIQ
- RIC創新挑戰賽 (RIC Innovation Challenge)
- EnjoyAI

#### 關鍵檔案

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| Server Actions | `apps/robot/src/lib/actions/competition-categories.ts` | 競賽類別相關操作 |
| Queries | `apps/robot/src/lib/queries/competition-categories.ts` | 競賽類別相關查詢 |
| 元件 | `apps/robot/src/components/admin/AdminCompetitionCategoryList.tsx` | 管理員競賽類別列表 |

---

### 5. 審計日誌

#### 功能說明
- 記錄用戶操作（如 profile 更新）
- 包含操作前的舊值和操作後的新值
- 用戶只能查看自己的日誌
- 管理員可查看所有日誌

#### 記錄的操作
- Profile 更新
- 未來可擴展其他操作

#### 關鍵檔案

| 類型 | 檔案路徑 | 說明 |
|------|---------|------|
| Server Actions | `apps/robot/src/lib/actions/audit.ts` | 審計相關操作 |

---

## 管理員操作流程

### 管理員驗證
所有管理員操作都會先調用 `requireAdmin()` 來驗證用戶角色。

### 管理員可執行的操作

#### 問答系統管理
- 置頂/取消置頂貼文 (`togglePin()`)
- 刪除貼文 (`deletePost()`)
- 刪除回覆 (`deleteReply()`)

#### 學校管理
- 建立學校 (`createSchool()`)
- 更新學校 (`updateSchool()`)
- 刪除學校 (`deleteSchool()`)

#### 競賽類別管理
- 建立競賽類別
- 更新競賽類別
- 刪除競賽類別

### 操作後處理
所有管理員操作都會重新驗證相關路徑，確保 UI 顯示最新資料。

---

## 通知系統

### 通知類型

1. **新貼文通知**
   - 收件人：所有管理員
   - 時機：新貼文建立時
   - 方式：電子郵件

2. **新回覆通知**
   - 收件人：貼文作者
   - 時機：新回覆建立時
   - 方式：電子郵件

### 關鍵函數

- `notifyAdmins()` - 通知所有管理員
- `notifyPostAuthor()` - 通知貼文作者

---

## 關鍵檔案總整理

| 功能模組 | Server Actions | Queries | 元件 |
|---------|----------------|---------|-----|
| 用戶認證與資料 | `profile.ts`, `updateProfile.ts` | - | `CompleteProfileForm.tsx`, `ProfileSettingsForm.tsx`, `AuthGuard.tsx` |
| 問答系統 | `qa.ts`, `notify.ts` | `qa.ts` | `QaDetail.tsx`, `QaPostCard.tsx`, `QaNewPostForm.tsx`, `QaReplyForm.tsx`, `AdminQaList.tsx` |
| 學校管理 | `schools.ts` | `schools.ts` | `AdminSchoolList.tsx` |
| 競賽類別 | `competition-categories.ts` | `competition-categories.ts` | `AdminCompetitionCategoryList.tsx` |
| 規則版本 | - | `rules.ts` | - |
| 審計 | `audit.ts` | - | - |

---

## 國際化 (i18n)

- 框架：next-intl
- 支援語言：繁體中文 (zh-TW)、英文 (en)
- 翻譯檔案位置：`apps/robot/messages/`

---

## 安全考量

1. **輸入驗證**
   - 所有用戶輸入都經過適當的驗證
   - 長度限制防止濫用

2. **權限檢查**
   - RLS 確保數據層級的安全性
   - Server Actions 內部也進行權限驗證
   - 管理員操作需要 `requireAdmin()` 驗證

3. **SQL 注入防護**
   - 使用 Supabase 客戶端而非原始 SQL
   - 參數化查詢

4. **敏感數據處理**
   - 密碼由 Supabase Auth 處理
   - 審計日誌不記錄敏感資訊

---

## 相關文件

- [數據庫結構文檔](./database.md)
- Supabase 官方文件
- Next.js 15 App Router 文件
