module.exports = function (content) {
    if(content.title) return {
        embeds: [content]
    }
    return {
        embeds: [{
            "color": 6939554,
            "description":  `${content}`
        }]
    }
}