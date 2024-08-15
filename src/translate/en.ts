export default {
    lang: {
        language: ':flag_us: English',
        code: 'en',
        contributors: ['KamiSqmf'],
    },

    general: {
        permissions: {
            None: 'None',

            View_Channels: 'View Channels',
            Manage_Channels: 'Manage Channel',
            Manage_Roles: 'Manage Roles',
            Manage_Emojis: 'Manage Emojis',
            View_Audit_Log: 'View Audit Log',
            View_Server_Insights: 'View Server Insights',
            Manage_Webhooks: 'Manage Webhooks',
            Manage_Server: 'Manage Server',

            Create_Instant_Invite: 'Create Instant Invite',
            Change_Nickname: 'Change Nickname',
            Manage_Nicknames: 'Manage Nicknames',
            Kick_Members: 'Kick Members',
            Ban_Members: 'Ban Members',

            Send_Messages: 'Send_Messages',
            Embed_Links: 'Embed Links',
            Attach_Files: 'Attach Files',
            Add_Reactions: 'Add Reactions',
            Use_External_Emojis: 'Use External Emojis',
            Mention_Everyone: 'Mention Everyone',
            Manage_Messages: 'Manage Messages',
            Read_Message_History: 'Read Message History',
            Send_TTS_Messages: 'Send TTS Messages',
            Use_Slash_Commands: 'Use Slash Commands',

            Connect: 'Connect',
            Speak: 'Speak',
            Video: 'Video',
            Use_Voice_Activity: 'Use Voice Activity',
            Priority_Speaker: 'Priority Speaker',
            Mute_Members: 'Mute Members',
            Deafen_Members: 'Deafen Members',
            Move_Members: 'Move Members',

            Administrator: 'Administrator',
            Moderator: 'Moderator',
        },
        category: {
            Infos: 'Infos',
            Configs: 'Configs',
            Utilities: 'Utilities',
        },
        error: 'KamiBot got an error (Please contact KamiBot Team)',
    },

    admin: {
        prefix: {
            rp_defalut: '*Default Prefix* ./',
            rp_sayPrefix: 'Sever Prefix is **{{prefix}}**',
            rp_updatedPrefix: 'Success update Prefix **({{prefix}})**',
            rp_defaultPrefix: 'Successful recover Prefix, Please use **./** as your prefix',
            rp_errorFormat: "Please check your commands\n **Example： `./prefix <set/default> ('your prefix')`**",
            rp_errorDB: 'KamiBot got an error (Please contact KamiBot Team)',
        },
        language: {
            rp_sayLang: 'Sever Language is **{{lang}}**',
            rp_updatedLang: 'Success update Language **({{lang}})**',
            rp_defaultLang1: 'Successful recover Language',
            rp_defaultLang2: '已還原至預設語言 - 中文', // Use Chinese
            rp_errorLangCode: "Sorry, we haven't support this language",
            rp_errorNotGuild: 'Please use this command in a Guild',
            rp_errorFormat: "Please check your commands\n **Example： `./language <set/default> ('lang-code')`",
            embed_supportedLang: 'Current Support Language',
            rp_errorDB: 'KamiBot got an error (Please contact KamiBot Team)',
        },
        clear: {
            rp_errorChannel: 'Please use this command in a text channel',
            rp_errorNumInput: 'Please enter a valid number (Integer)',
            rp_errorWhileClearing: "There's an error during deleting message (Please try it later)",
            rp_successClearing: 'Successful delete {{lines}} message',
            rp_startClearing: 'Deleting {{lines}} message',
        },
    },

    infos: {
        ping: {
            message: '{{emoji1}} The Ping is **{{ping}}ms** now\n{{emoji2}} Messages Edit Latency is **{{rewrite}}ms**',
            footer: 'Tested by {{user}}'
        },
    },

    voice: {
        play: {
            rp_searching: 'Searching {{request}}',
            rp_errorProcess: 'KamiBot got an error (Please contact KamiBot Team)',
            rp_errorFormat: "Please check your commands\n **Example： `./play <'your link'>`**",
        },
        controls: {
            embed_title: 'Music Control Panel',
            component_play: 'Play',
            component_pause: 'Pause',
            component_stop: 'Stop',
            component_skip: 'Skip',
        },
        download: {
            rp_added_queue: '[{{file}}]({{url}}) had been successfully added to the queue',
            rp_searching: 'Searching {{request}}',
            rp_downloading: 'KamiBot is downloading\n **[{{file}}]({{url}})**\n{{time}}',
            rp_errorProcess: 'KamiBot got an error (Please contact KamiBot Team)',
            rp_errorUploading: "There's an error during uploading file to Discord！ (Please contact KamiBot Team)",
            rp_errorFormat: "Please check your commands\n **Example： `./download <'your link' || 'download name'>`**",
            rp_errorTimeout: "Kami didn't finish download in the specify time (Please try it later or The file to Large)",
        },
        tts: {
            rp_added_queue: '{{content}} had been successfully added to the queue',
            rp_errorTimeout: "Kami didn't finish download in the specify time (Please try it later)",
            rp_errorProcess: 'KamiBot got an error (Please contact KamiBot Team)',
            rp_errorLangCode: 'Please check your language code\n**[Click Here](http://www.lingoes.net/en/translator/langcode.htm) to check all the language code**',
            rp_errorFormat: "Please check your commands\n **Example： `./tts <'lang-code'> <'your word'>`**\n[Lang-Code Here](http://www.lingoes.net/en/translator/langcode.htm)",
        },
        queue: {
            rp_errorNotGuild: 'Please use this command in a Guild',
            rp_queueEmpty: 'The queue is empty',
            embed_title: 'Current Queue',
            embed_description: 'Total: {{count}} songs',
            embed_fields: {
                "added_by": "Added by {{user}}",
                "moved_by": ", Moved by {{user}}",
                "timestamp": ", Added Time: {{time}}",

            }
        }
    },

    utils: {
        calculate: {
            activateAuthor: 'KamiBot Discord Calculator',
            expiredAuthor: 'Expired Calculator',
            calcHistory: 'History of the calculate',
            rp_calcResult: 'According to **KamiPedia** the answer is {{ans}}',
            rp_calcError: 'What is this?',
        },
    },
}
