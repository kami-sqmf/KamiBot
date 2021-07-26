const emoji = require('../../config/config').emojis
const spotifyToURL = require('./spotifyURI')
const youtubeToURL = require('./youtubeURI')
const webFileToURL = require('./webfileURI')
module.exports = async function (client, message, text) {
    let request = new String()
    if(message.content.includes("play") && !message.content.includes("playlist") ){
        request = message.content.slice(message.content.indexOf('play') + 5)
    }else if(message.content.includes("download")){
        request = message.content.slice(message.content.indexOf('download') + 9)
    }else if(message.content.includes("dd")){
        request = message.content.slice(message.content.indexOf('dd') + 3)
    }else if(message.content.includes("yt2mp3")){
        request = message.content.slice(message.content.indexOf('yt2mp3') + 7)
    }else if(message.content.includes("music")){
        request = message.content.slice(message.content.indexOf('music') + 6)
    }
    let respond = new Object()
    if (request.includes('open.spotify.com')) {
        message.channel.send(client.$e(client._(text.rp_searching, {emoji: emoji.spotify, request: request})))
        res = await spotifyToURL(request)
    } else if (isMusicURL(request)) {
        message.channel.send(client.$e(client._(text.rp_searching, {emoji: emoji.general.check, request: request})))
        res = await webFileToURL(request)
    } else {
        message.channel.send(client.$e(client._(text.rp_searching, {emoji: emoji.youtube, request: request})))
        res = await youtubeToURL(request)
    }
    if(!res.success) {
        console.log(res.error)
        return message.channel.send(client.$e(text.rp_errorProcess))
    }else{
        return res;
    }
}

function isMusicURL(url) {
    try {
        new URL(url);
        if(url.endsWith('.mp3') || url.endsWith('.ogg') || url.endsWith('.wav') || url.endsWith('.webm')) return true;
    } catch (e) {
        return false;
    }
    return false;
}