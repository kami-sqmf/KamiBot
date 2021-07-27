module.exports = async function (req) {
    return {
        success: true,
        res: {
            playlist: false,
            video: [{
                type: "url",
                title: `${req}`,
                url: req,
                thumbnail: req,
                stream: `${req}`
            }]
        }
    }
}