# Robot 站數據庫結構文檔

本文檔描述了 Robot 站的數據庫表結構、關係和數據庫對象。

## 技術棧

- **數據庫：** PostgreSQL (Supabase)
- **類型安全：** TypeScript 類型定義自動生成
- **安全性：** Row Level Security (RLS)

---

## 數據庫表結構

### 1. `profiles` 表（用戶資料表）

存儲用戶的基本資料，與 Supabase Auth 的 `auth.users` 表關聯。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵，關聯 `auth.users.id` | PRIMARY KEY, REFERENCES auth.users(id) |
| `display_name` | TEXT | 顯示名稱 | |
| `avatar_url` | TEXT | 頭像 URL | |
| `email` | TEXT | 電子郵件 | |
| `role` | TEXT | 用戶角色 | CHECK (role IN ('user', 'admin')) |
| `real_name` | TEXT | 真實姓名 | |
| `school_id` | UUID | 關聯學校 | REFERENCES schools(id) |
| `user_type` | TEXT | 用戶類型 | CHECK (user_type IN ('teacher', 'student')) |
| `profile_completed` | BOOLEAN | 資料是否完成 | DEFAULT false |
| `created_at` | TIMESTAMPTZ | 建立時間 | DEFAULT NOW() |

**索引：**
- 主鍵索引：`id`
- 外鍵索引：`school_id`

---

### 2. `schools` 表（學校表）

存儲學校資訊。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PRIMARY KEY |
| `code` | TEXT | 學校代碼（唯一） | UNIQUE |
| `name` | TEXT | 學校名稱 | |
| `created_at` | TIMESTAMPTZ | 建立時間 | DEFAULT NOW() |

**索引：**
- 主鍵索引：`id`
- 唯一索引：`code`

---

### 3. `qa_posts` 表（問答貼文表）

存儲問答系統的貼文。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PRIMARY KEY |
| `author_id` | UUID | 作者 ID | REFERENCES profiles(id) |
| `title` | TEXT | 標題 | |
| `content` | TEXT | 內容 | |
| `status` | TEXT | 狀態 | CHECK (status IN ('open', 'answered')) |
| `pinned` | BOOLEAN | 是否置頂 | DEFAULT false |
| `tags` | TEXT[] | 標籤陣列 | |
| `reply_count` | INTEGER | 回覆數量 | DEFAULT 0 |
| `created_at` | TIMESTAMPTZ | 建立時間 | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | 更新時間 | DEFAULT NOW() |

**索引：**
- 主鍵索引：`id`
- 外鍵索引：`author_id`
- 狀態索引：`status`
- 置頂索引：`pinned`
- 建立時間索引：`created_at DESC`

---

### 4. `qa_replies` 表（問答回覆表）

存儲問答貼文的回覆。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PRIMARY KEY |
| `post_id` | UUID | 貼文 ID | REFERENCES qa_posts(id) ON DELETE CASCADE |
| `author_id` | UUID | 作者 ID | REFERENCES profiles(id) |
| `content` | TEXT | 內容 | |
| `is_official` | BOOLEAN | 是否為官方回覆 | DEFAULT false |
| `created_at` | TIMESTAMPTZ | 建立時間 | DEFAULT NOW() |
| `updated_at` | TIMESTAMPTZ | 更新時間 | DEFAULT NOW() |

**索引：**
- 主鍵索引：`id`
- 外鍵索引：`post_id`, `author_id`
- 官方回覆索引：`is_official`
- 建立時間索引：`created_at ASC`

---

### 5. `competition_categories` 表（競賽類別表）

存儲競賽類別資訊。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PRIMARY KEY |
| `name` | TEXT | 中文名稱 | |
| `name_en` | TEXT | 英文名稱 | |
| `created_at` | TIMESTAMPTZ | 建立時間 | DEFAULT NOW() |

**預設資料：**
- VEXIQ
- RIC創新挑戰賽 (RIC Innovation Challenge)
- EnjoyAI

---

### 6. `rule_versions` 表（規則版本表）

存儲競賽規則的版本資訊。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PRIMARY KEY |
| `title` | TEXT | 標題 | |
| `version` | TEXT | 版本號 | |
| `changelog` | TEXT | 變更日誌 | |
| `file_url` | TEXT | 檔案 URL | |
| `uploaded_by` | UUID | 上傳者 ID | REFERENCES profiles(id) |
| `published_at` | TIMESTAMPTZ | 發布時間 | |

---

### 7. `audit_logs` 表（審計日誌表）

記錄用戶操作的審計日誌。

| 欄位 | 類型 | 說明 | 約束 |
|------|------|------|------|
| `id` | UUID | 主鍵 | PRIMARY KEY |
| `user_id` | UUID | 用戶 ID | REFERENCES profiles(id) |
| `action` | TEXT | 動作 | |
| `entity_type` | TEXT | 實體類型 | |
| `entity_id` | UUID | 實體 ID | |
| `metadata` | JSONB | 中繼資料 | |
| `created_at` | TIMESTAMPTZ | 建立時間 | DEFAULT NOW() |

---

## 數據庫關係圖

```
auth.users
    │
    └── profiles (1:1)
         │
         ├── schools (N:1)
         │
         ├── qa_posts (1:N)
         │    │
         │    └── qa_replies (1:N)
         │
         ├── rule_versions (1:N)
         │
         └── audit_logs (1:N)
```

---

## 數據庫觸發器與函數

### 1. `handle_new_user()`

**說明：** 自動在 `auth.users` 新增時建立對應的 `profiles` 記錄。

**觸發時機：** `AFTER INSERT ON auth.users`

### 2. `update_reply_count()`

**說明：** 自動維護 `qa_posts.reply_count` 計數。

**觸發時機：** `AFTER INSERT/UPDATE/DELETE ON qa_replies`

### 3. `update_updated_at()`

**說明：** 自動更新 `updated_at` 時間戳。

**觸發時機：** `BEFORE UPDATE ON` 多個表

### 4. `is_admin()`

**說明：** 檢查當前用戶是否為管理員。

**返回類型：** BOOLEAN

---

## Row Level Security (RLS) 原則

### 通用原則

1. **公開讀取：** 大部分表允許公開讀取
2. **用戶自管理：** 用戶只能更新自己的資源
3. **管理員特權：** 管理員可管理所有資源
4. **審計日誌：** 僅附加，用戶只能讀取自己的日誌

### 各表 RLS 策略

#### `profiles` 表
- **SELECT:** 公開
- **INSERT:** 認證用戶（僅自己的記錄）
- **UPDATE:** 認證用戶（僅自己的記錄）
- **DELETE:** 管理員

#### `qa_posts` 表
- **SELECT:** 公開
- **INSERT:** 認證用戶
- **UPDATE:** 作者本人 或 管理員
- **DELETE:** 作者本人 或 管理員

#### `qa_replies` 表
- **SELECT:** 公開
- **INSERT:** 認證用戶
- **UPDATE:** 作者本人 或 管理員
- **DELETE:** 作者本人 或 管理員

#### `schools` 表
- **SELECT:** 公開
- **INSERT/UPDATE/DELETE:** 管理員

#### `competition_categories` 表
- **SELECT:** 公開
- **INSERT/UPDATE/DELETE:** 管理員

#### `rule_versions` 表
- **SELECT:** 公開
- **INSERT/UPDATE/DELETE:** 管理員

#### `audit_logs` 表
- **SELECT:** 自己的日誌 或 管理員
- **INSERT:** 認證用戶
- **UPDATE/DELETE:** 無（僅附加）

---

## 數據庫遷移

遷移文件位置：`apps/robot/supabase/migrations/`

| 遷移編號 | 檔案名稱 | 說明 |
|---------|---------|------|
| 001 | `001_base.sql` | 建立 profiles 表、handle_new_user()、is_admin()、update_updated_at() |
| 002 | `002_schools.sql` | 建立 schools 表 |
| 003 | `003_profiles_extended.sql` | 擴充 profiles 欄位（real_name, school_id, user_type, profile_completed） |
| 004 | `004_qa.sql` | 建立問答系統（qa_posts, qa_replies）、update_reply_count() 觸發器 |
| 005 | `005_competition.sql` | 建立競賽類別表（competition_categories）、預設資料 |
| 006 | `006_rules.sql` | 建立規則版本表（rule_versions） |
| 007 | `007_audit.sql` | 建立審計日誌表（audit_logs） |

---

## TypeScript 類型定義

類型定義文件位置：`packages/database/src/types/database.ts`

主要類型：
- `Database` - 完整的數據庫類型定義
- `Json` - JSON 類型
- 各表的 Row 和 Insert 類型

---

## 相關文件

- 數據庫配置：`apps/robot/supabase/config.toml`
- 數據庫客戶端：`packages/database/src/client/`
- 數據庫中間件：`packages/database/src/middleware.ts`
