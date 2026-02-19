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
│   └── main/          # 主站 Next.js 應用 (macaustpa.org)
├── packages/
│   ├── ui/            # 共享 UI 元件
│   ├── i18n/          # 國際化配置
│   ├── utils/         # 工具函數
│   └── tsconfig/      # 共享 TypeScript 配置
├── turbo.json
└── pnpm-workspace.yaml
```

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

| Command      | Description          |
| ------------ | -------------------- |
| `pnpm dev`   | Start dev server     |
| `pnpm build` | Build all packages   |
| `pnpm lint`  | Lint all packages    |
| `pnpm clean` | Clean build outputs  |
