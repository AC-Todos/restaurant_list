# Ｍy Restaurant List
### 功能

- 查看所有餐廳
- 瀏覽餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 搜尋特定餐廳
- 可以新增及修改餐廳
- 可以刪除餐廳

## 開始使用

1. 安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```
4. 設定mongoDB環境變數

   ```bash
   export MONGODB_URI="mongodb+srv://<your_account>:<your_password>@cluster0.j9qlz5q.mongodb.net/restaurant-list?retryWrites=true&w=majority"
   ```
5. 完畢後，輸入：

   ```bash
   npm run start
   ```
   或是
   ```bash
   npm run dev
   ```
6. 打開瀏覽器進入到以下網址

   ```text
    http://localhost:8080
   ```