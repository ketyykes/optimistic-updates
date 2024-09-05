# Like Button Example Repository

這個專案展示了如何在前端 (Vue 和 React) 和後端 (Node.js/Express) 實現按讚功能的樂觀更新和非樂觀更新，並模擬伺服器的錯誤處理和延遲回應。

## 專案結構

```
├── README.md
├── backend
│   ├── app.js
│   ├── likes.json
│   ├── nodemon.json
│   ├── package.json
│   └── pnpm-lock.yaml
└── frontend
    ├── react
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package.json
    │   ├── pnpm-lock.yaml
    │   ├── public
    │   │   └── vite.svg
    │   ├── src
    │   │   ├── App.tsx
    │   │   ├── LikeButton.tsx
    │   │   ├── LikeButton2.tsx
    │   │   ├── api.ts
    │   │   ├── main.tsx
    │   │   └── vite-env.d.ts
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   └── vite.config.ts
    └── vue
        ├── README.md
        ├── index.html
        ├── package.json
        ├── pnpm-lock.yaml
        ├── public
        │   └── vite.svg
        ├── src
        │   ├── App.vue
        │   ├── LikeButton.vue
        │   ├── LikeButton2.vue
        │   ├── api.js
        │   └── main.js
        └── vite.config.js
```

## 安裝與運行

### 全局安裝 pnpm

如果您還沒有安裝 `pnpm`，請先進行安裝：

```bash
npm install -g pnpm
```

### 後端部分

1. 進入 `backend` 資料夾，安裝依賴並啟動伺服器：

   ```bash
   cd backend
   pnpm install
   pnpm run start
   ```

   伺服器將會在 `http://localhost:3000` 上運行。

### 前端部分

#### Vue 範例

1. 進入 `frontend/vue` 資料夾，安裝依賴並啟動開發伺服器：

   ```bash
   cd frontend/vue
   pnpm install
   pnpm run dev
   ```

   開發伺服器將會在 `http://localhost:5174`

#### React 範例

1. 進入 `frontend/react` 資料夾，安裝依賴並啟動開發伺服器：

   ```bash
   cd frontend/react
   pnpm install
   pnpm run dev
   ```

   開發伺服器將會在 `http://localhost:5173`

## 功能說明

### Vue 範例

1. **無樂觀更新 (Non-Optimistic Update)**
   - `LikeButton.vue`：按下「讚」按鈕時，發送 POST 請求到後端伺服器，再發送 GET 請求獲取最新的按讚數。

2. **樂觀更新 (Optimistic Update)**
   - `LikeButton2.vue`：按下「讚」按鈕時，直接在前端增加按讚數，並發送 POST 請求。如果後端回應與前端資料不同步，則進行修正。

### React 範例

1. **無樂觀更新 (Non-Optimistic Update)**
   - `LikeButton.tsx`：按下「讚」按鈕時，發送 POST 請求，再用 GET 請求獲取最新的按讚數。

2. **使用 SWR 的樂觀更新 (Optimistic Update with SWR)**
   - `LikeButton2.tsx`：使用 SWR 庫進行資料緩存和樂觀更新。在按下「讚」按鈕後，更新本地資料，並在伺服器成功回應後進行同步。

### 後端模擬伺服器

1. **GET 請求 `/likes`**
   - 返回當前的按讚數。如果最後一次 POST 操作在 5 秒內，延遲 3 秒才返回資料。

2. **POST 請求 `/likes`**
   - 增加按讚數，有 20% 機率返回錯誤以模擬伺服器異常情況。
