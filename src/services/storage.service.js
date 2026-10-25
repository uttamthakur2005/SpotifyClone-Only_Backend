const { ImageKit } = require('@imagekit/nodejs')
const path = require('node:path')

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
    const fileName = `music_${Date.now()}${path.extname(file.originalname)}`
    const imageKitFile = new File([file.buffer], fileName, {
        type: file.mimetype,
    })

    const result = await ImageKitClient.files.upload({
        file: imageKitFile,
        fileName,
        folder: 'SpotifyClone-project/music'
    })

    return result
}


module.exports = {uploadFile}