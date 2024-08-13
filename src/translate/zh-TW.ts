export default {
    lang: {
        language: ':flag_tw: 繁體中文',
        code: 'zh-TW',
        contributors: ['KamiSqmf'],
    },

    general: {
        permissions: {
            None: '無',

            View_Channels: '檢視頻道',
            Manage_Channels: '管理頻道',
            Manage_Roles: '管理身分組',
            Manage_Emojis: '管理表情符號與貼圖',
            View_Audit_Log: '檢視審核紀錄',
            View_Server_Insights: '檢視 Server Insights',
            Manage_Webhooks: '管理 Webhooks',
            Manage_Server: '管理伺服器',

            Create_Instant_Invite: '建立邀請',
            Change_Nickname: '更改暱稱',
            Manage_Nicknames: '管理暱稱',
            Kick_Members: '踢出成員',
            Ban_Members: '對成員停權',

            Send_Messages: '發送訊息',
            Embed_Links: '嵌入連結',
            Attach_Files: '附加檔案',
            Add_Reactions: '新增反應',
            Use_External_Emojis: '使用外部表情符號',
            Mention_Everyone: '提及 @everyone、@here 和所有身分組',
            Manage_Messages: '管理訊息',
            Read_Message_History: '讀取訊息歷史',
            Send_TTS_Messages: '傳送文字朗讀訊息',
            Use_Slash_Commands: '使用斜線指令',

            Connect: '連接',
            Speak: '說話',
            Video: '視訊通話',
            Use_Voice_Activity: '使用語音活動',
            Priority_Speaker: '優先發言者',
            Mute_Members: '讓成員靜音',
            Deafen_Members: '讓成員拒聽',
            Move_Members: '移動成員',

            Administrator: '管理員',
            Moderator: '版主',
        },
        category: {
            Infos: '資訊',
            Configs: '配置',
            Utilities: '工具',
        },
        error: 'Kami 出錯了！ (請聯繫 Kami 官方管理員)',
    },

    admin: {
        prefix: {
            rp_defalut: '*預設Prefix* ./',
            rp_sayPrefix: '伺服器目前使用的 Prefix 為 **{{prefix}}**',
            rp_updatedPrefix: '成功設定新的 Prefix **({{prefix}})**',
            rp_defaultPrefix: '成功還原 Prefix, 以後請使用 **./**',
            rp_errorFormat: "請檢查指令\n **範例： `./prefix <set/default> ('your prefix')`**",
            rp_errorDB: 'Kami 出錯了！ (請聯繫 Kami 官方管理員)',
        },
        language: {
            rp_sayLang: '目前伺服器使用的語言為 **{{lang}}**',
            rp_updatedLang: '成功設定新的語言 **({{lang}})**',
            rp_defaultLang1: '成功還原語言',
            rp_defaultLang2: '已還原至預設語言 - 中文', // Use Chinese
            rp_errorLangCode: '不好意思，我們現在還不支援這個語言',
            rp_errorFormat: "請檢查指令\n **範例： `./language <set/default> ('lang-code')`",
            rp_errorNotGuild: '請在伺服器使用這個指令',
            embed_supportedLang: '目前支援的語言',
            rp_errorDB: 'Kami 出錯了！ (請聯繫 Kami 官方管理員)',
        },
        clear: {
            rp_errorChannel: '請在文字頻道使用這個指令',
            rp_errorNumInput: '請輸入正確的數字 (整數)',
            rp_errorWhileClearing: '在刪除的過程中出了些問題 ( 請稍後在試 )',
            rp_successClearing: '成功刪除 {{lines}} 條訊息！',
            rp_startClearing: '正在刪除 {{lines}} 條訊息！',
        },
    },

    infos: {
        ping: {
            message: '{{emoji1}} 目前的 Ping 為 **{{ping}}ms**\n{{emoji2}} 訊息處理延遲為  **{{rewrite}}ms**',
            footer: '由 {{user}} 測試'
        },
    },

    voice: {
        controls: {
            embed_title: '音樂控制面板',
            component_play: '播放',
            component_pause: '暫停',
            component_stop: '斷開',
            component_skip: '下一首',
        },
        play: {
            rp_searching: '正在搜尋 {{request}}',
            rp_errorProcess: 'Kami 出錯了！ (請聯繫 Kami 官方管理員)',
            rp_errorFormat: "請檢查指令\n **範例： `./play <'your link'>`**",
        },
        download: {
            rp_added_queue: '[{{file}}]({{url}}) 已成功加入待播清單！',
            rp_searching: '正在搜尋 {{request}}',
            rp_downloading: '請稍後，目前正在下載\n **[{{file}}]({{url}})**\n{{time}}',
            rp_errorProcess: 'Kami 出錯了！ (請聯繫 Kami 官方管理員)',
            rp_errorUploading: '目前Kami無法成功上傳檔案到 Discord！ (請聯繫 Kami 官方管理員)',
            rp_errorFormat: "請檢查指令\n **範例： `./download <'your link' || 'download name'>`**",
            rp_errorTimeout: 'Kami 沒能在時間內完成下載！ (錯誤：檔案太大 或 稍後再試)',
        },
        tts: {
            rp_added_queue: '{{content}} 已成功加入待播清單！',
            rp_errorTimeout: 'Kami 沒能在時間內完成下載！ (請稍後在試)',
            rp_errorProcess: 'Kami 出錯了！ (請聯繫 Kami 官方管理員)',
            rp_errorLangCode: '請檢查語言代碼\n**[點這裡查看代碼](http://www.lingoes.net/en/translator/langcode.htm)**',
            rp_errorFormat: "請檢查指令\n **範例： `./tts <'lang-code'> <'your word'>`**\n[Lang-Code 請點這裡](http://www.lingoes.net/en/translator/langcode.htm)",
        },
        queue: {
            rp_errorNotGuild: '請在伺服器使用這個指令！',
            rp_queueEmpty: '目前沒有待播放的歌曲！',
            embed_title: '目前的播放清單',
            embed_description: '共有 {{count}} 首歌曲',
            embed_fields: {
                "added_by": "由 {{user}} 加入",
                "moved_by": "，並由 {{user}} 移動順序",
                "timestamp": "，加入時間：{{time}}",

            }
        }
    },

    utils: {
        calculate: {
            activateAuthor: 'KamiBot Discord 計算機',
            expiredAuthor: '失效的 KamiBot 計算機',
            calcHistory: '計算の歷史紀錄',
            rp_calcResult: '根據超複雜的計算，答案是 {{ans}}',
            rp_calcError: '這根本計算不出來啊！！！',
        },
    },
}
