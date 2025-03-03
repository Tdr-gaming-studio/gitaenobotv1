# gitaenobotv2

## 開發者
linlin & UB

## 儲存庫代管
Tdr-studio

## 說明
`gitaenobotv2` 是基於 `discord.js v14` 的 Discord 機器人基礎架構，並更新了指令架構
這是提供給初學者一個簡單易用的起點來建立自己的 Discord 機器人。

### 功能
- 提供 Discord 機器人的基本框架
- 適用於 `discord.js v14`
- 方便初學者學習並建立自己的機器人

### 注意事項
- 由於授權原因，此代碼已移除部分安全核心內容。
- 本版本非主要維護 & 運行版本，因此更新緩慢，甚至可能不會再更新。
- 由linlin進行開發。
- 此版本指令無法與v1向上兼容，無法將v1指令檔案直接套用於v2架構，但是可以將v2指令檔案套用於v1架構。

## 安裝與使用
### 1. 克隆儲存庫
```sh
git clone https://github.com/Tdr-studio/gitaenobotv1.git
cd gitaenobotv1
```

### 2. 安裝相依套件
確保已安裝 [Node.js](https://nodejs.org/)，然後執行：
```sh
npm install
```

### 3. 設定 `config.js`
請將`config.js.edit`更名成`config.js`且修改配置文件

### 4. 啟動機器人
```sh
node index.js
```
## 預計更新內容(功能)
- 優化主控台訊息 已便debug     `v3.1.0`
- 優化指令系統
- 優化檔案系統
- 新增automode                 `v5.2.0 - alpha`
- 新增自動回覆
- 重構help指令                 `v3.1.0`

## 預計更新內容(說明與範例文件)
- 更新說明文件                 `v3.3.0`
- 更新範例文件                 `v3.2.0`

## 已知問題
- 主控台錯誤訊息不準確

## 貢獻
如果有任何建議或修改，歡迎提交 Pull Request 或 Issue！

## 授權
此專案不包含完整的核心程式碼，請依據個人需求調整。

