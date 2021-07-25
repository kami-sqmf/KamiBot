exports.lang = {
    language: ":flag_us: English",
    bot_code: "en",
    docs_code: "en",
    website_code: "en",
    contributors: ["KamiSqmf"]
}

exports.general = {
    permissions: {
        None: "None",

        View_Channels: "View Channels",
        Manage_Channels: "Manage Channel",
        Manage_Roles: "Manage Roles",
        Manage_Emojis: "Manage Emojis",
        View_Audit_Log: "View Audit Log",
        View_Server_Insights: "View Server Insights",
        Manage_Webhooks: "Manage Webhooks",
        Manage_Server: "Manage Server",

        Create_Instant_Invite: "Create Instant Invite",
        Change_Nickname: "Change Nickname",
        Manage_Nicknames: "Manage Nicknames",
        Kick_Members: "Kick Members",
        Ban_Members: "Ban Members",

        Send_Messages: "Send_Messages",
        Embed_Links: "Embed Links",
        Attach_Files: "Attach Files",
        Add_Reactions: "Add Reactions",
        Use_External_Emojis: "Use External Emojis",
        Mention_Everyone: "Mention Everyone",
        Manage_Messages: "Manage Messages",
        Read_Message_History: "Read Message History",
        Send_TTS_Messages: "Send TTS Messages",
        Use_Slash_Commands: "Use Slash Commands",

        Connect: "Connect",
        Speak: "Speak",
        Video: "Video",
        Use_Voice_Activity: "Use Voice Activity",
        Priority_Speaker: "Priority Speaker",
        Mute_Members: "Mute Members",
        Deafen_Members: "Deafen Members",
        Move_Members: "Move Members",

        Administrator: "Administrator",
        Moderator: "Moderator"
    },
    category: {
        Infos: "Infos",
        Configs: 'Configs',
        Utilities: 'Utilities',
    },
}

exports.admin = {
    prefix: {
        rp_sayPrefix: "伺服器目前使用的 Prefix 為 **{{prefix}}**",
        rp_updatedPrefix: "成功設定新的 Prefix **({{prefix}})**",
        rp_defaultPrefix: "成功還原 Prefix, 以後請使用 **./**",
        rp_errorFormat: "請檢查指令\n **範例： `./prefix <set/default> ('your prefix')`**",
        rp_errorDB: "Kami 出錯了！ (請聯繫 Kami 官方管理員)",
    },
    language: {
        rp_sayLang: "目前伺服器使用的語言為 **{{lang}}**",
        rp_updatedLang: "成功設定新的語言 **({{lang}})**",
        rp_defaultLang1: "成功還原語言",
        rp_defaultLang2: "Now using Default Language - English", // Use English
        rp_errorLangCode: "不好意思，我們現在還不支援這個語言",
        rp_errorFormat: "請檢查指令\n **範例： `./language <set/default> ('lang-code')`",
        embed_supportedLang: "目前支援的語言",
        rp_errorDB: "Kami 出錯了！ (請聯繫 Kami 官方管理員)",
    }
}

exports.infos = {
    ping: "目前的 Ping 為 {{ping}}"
}