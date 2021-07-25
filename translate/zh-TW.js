const emoji = require('../src/client/config/config').emojis
const $g = emoji.general
exports.lang = {
    language: ":flag_tw: 繁體中文",
    bot_code: "zh-TW",
    docs_code: "zh-TW",
    website_code: "zh-TW",
    contributors: ["KamiSqmf"]
}

exports.general = {
    permissions: {
        None: "無",

        View_Channels: "檢視頻道",
        Manage_Channels: "管理頻道",
        Manage_Roles: "管理身分組",
        Manage_Emojis: "管理表情符號與貼圖",
        View_Audit_Log: "檢視審核紀錄",
        View_Server_Insights: "檢視 Server Insights",
        Manage_Webhooks: "管理 Webhooks",
        Manage_Server: "管理伺服器",

        Create_Instant_Invite: "建立邀請",
        Change_Nickname: "更改暱稱",
        Manage_Nicknames: "管理暱稱",
        Kick_Members: "踢出成員",
        Ban_Members: "對成員停權",

        Send_Messages: "發送訊息",
        Embed_Links: "嵌入連結",
        Attach_Files: "附加檔案",
        Add_Reactions: "新增反應",
        Use_External_Emojis: "使用外部表情符號",
        Mention_Everyone: "提及 @everyone、@here 和所有身分組",
        Manage_Messages: "管理訊息",
        Read_Message_History: "讀取訊息歷史",
        Send_TTS_Messages: "傳送文字朗讀訊息",
        Use_Slash_Commands: "使用斜線指令",

        Connect: "連接",
        Speak: "說話",
        Video: "視訊通話",
        Use_Voice_Activity: "使用語音活動",
        Priority_Speaker: "優先發言者",
        Mute_Members: "讓成員靜音",
        Deafen_Members: "讓成員拒聽",
        Move_Members: "移動成員",

        Administrator: "管理員",
        Moderator: "版主"
    },
    category: {
        Infos: "資訊",
        Configs: '配置',
        Utilities: '工具',
    },
}

exports.admin = {
    prefix: {
        rp_sayPrefix: "伺服器目前使用的 Prefix 為 **{{prefix}}**",
        rp_updatedPrefix: `${$g.check} ` + "成功設定新的 Prefix **({{prefix}})**",
        rp_defaultPrefix: `${$g.check} ` + "成功還原 Prefix, 以後請使用 **./**",
        rp_errorFormat: `${$g.uSuck} ` + "請檢查指令\n **範例： `./prefix <set/default> ('your prefix')`**",
        rp_errorDB: `${$g.cross} ` + "Kami 出錯了！ (請聯繫 Kami 官方管理員)",
    },
    language: {
        rp_sayLang: "目前伺服器使用的語言為 **{{lang}}**",
        rp_updatedLang: `${$g.check} ` + "成功設定新的語言 **({{lang}})**",
        rp_defaultLang1: `${$g.check} ` + "成功還原語言",
        rp_defaultLang2: "Now using Default Language - English", // Use English
        rp_errorLangCode: `${$g.uSuck} ` + "不好意思，我們現在還不支援這個語言",
        rp_errorFormat: `${$g.uSuck} ` +  "請檢查指令\n **範例： `./language <set/default> ('lang-code')`",
        embed_supportedLang: "目前支援的語言",
        rp_errorDB: `${$g.cross} ` + "Kami 出錯了！ (請聯繫 Kami 官方管理員)",
    }
}

exports.infos = {
    ping: `${$g.hourglass} ` + "目前的 Ping 為 **{{ping}}ms**"
}