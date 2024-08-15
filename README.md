# Kami-Bot ( IN DEV )
Kami-Bot Offical Repository

## 機器人功能
### 管理功能
+ `/clear <quantity>` 移除訊息（至多 14 天）
  > *Inteager number* `quantity`:  要刪除的數量
+ `/language <current/set> <language_code(set)>` 機器人顯示語
  > *current|set* `<current/set>`: Current 將回覆目前伺服器顯示語言, Set 則為設定 (須提供 `language_code`)
  > 
  > *string* `language_code`: 語言代碼 目前支援的語言(en, zh-TW)
### 資訊功能
+ `/ping` 檢測機器人延遲
### 主要功能
+ `/yt2mp3 <traget>` 下載 YouTube 影片 (MP3)>
  > *string* `target`: 要下載的內容（影片關鍵字、Youtube 網址、音檔網址）
+ `/tts <language> <content>` Google 小姐唸給你聽
  > *string* `language`: 語言代碼 （附有 Auto Complete）http://www.lingoes.net/en/translator/langcode.htm
  >
  > *string* `content`: 要朗讀的文字
+ `/controls` 音樂控制面板
+ `/queue` 音樂待播清單
+ `/calculator` 叫出一個高延遲計算機

## 已知問題
+ 刪除訊息時，若輸入小於 100，但 100 條訊息內包含超過 14 天之訊息，將不會刪除任何訊息
+ 下載音樂時可能會報錯 （初步判斷：發送頻率問題）

## 版本紀錄
> **v1.0.0**
- 升級所有已過時的套件 (Major: Discord.js 13 beta -> 14)
- 改良 Client Class (Construtor, Embeds, Temp -> Cache)
- 將 Message Command 改為 Slash Commands
- 將 TTS and Download 功能帶入語音聊天室
- 新增 controls, queue 指令

> **PreAlpha 0.6.0**
Rewrite Bot in Typescript

> **PreAlpha 0.5.0**
Add TTS Commands & Add Timeout in Download Mod

> **PreAlpha 0.3.0**
Add Calculator Mods

> **PreAlpha 0.2.5**
Change Download Method [buffer]


> **PreAlpha 0.2.0**
Add download & Clear commands

> **PreAlpha 0.1.5**
Update NPM Discord.JS

> **PreAlpha 0.1.0**
Initialize KamiBot With Node