const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')
const albumModel = require('../models/album.model')

async function createMusic(req, res) {

    const { title } = req.body
    const file = req.file

        const result = await uploadFile(file)

        const music = await musicModel.create({
            uri: result.url,
            title: title.trim(),
            artist: req.user.id,
        })

        return res.status(201).json({
            message: 'music created Successfully',
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            }
        })
    } 

async function createAlbum(req, res) {

        const { title, musics } = req.body

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics,
        })

        res.status(201).json({
            message: 'Album Created Successfully',
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,
            }
        })

    }

async function getAllMusics(req, res) {
    const musics = await musicModel
    .find()
    // .skip(1)
    .limit(10)
    .populate('artist', 'username email')

    res.status(200).json({
        message: 'Musics fetched Successfully',
        musics: musics,
    })
}

async function getAllAlbums(req, res) {
    const albums = await musicModel.find().select("title artist").populate('artist', 'username email')

    res.status(200).json({
        message: 'Albums fetched Successfully',
        albums: albums,
    })
}

async function getAlbumById(req, res) {
    const albumId = req.params.albumId
    const album = await musicModel.findById(albumId).populate('artist', 'username email').populate('musics')

    return res.status(200).json({
        message: "Album fetched Successfully",
        album: album,
    })
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById}