const express = require("express");
const User = require('../models/User');
const config = require('../config');
const axios = require("axios");
const {nanoid} = require("nanoid");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const galleries = await Gallery.find()
            .populate('user', 'displayName');

        res.send(galleries);
    } catch (e) {
        console.log(e)
    }
});

router.get('/user/:id', async (req, res) => {
    const userId = (req.params.id);
    try {
        const galleries = await Gallery.find({user: userId})
            .populate('user', 'displayName');

        res.send(galleries);
    } catch (e) {
        console.log(e)
    }
});

router.post('/', auth, upload.single('image'),async (req, res) => {
    console.log("post", req.body);
    if (!req.body.title) {
        return res.status(400).send({error: 'Data No Valid'});
    }

    const galleryData = {
        title: req.body.title,
        user: req.user._id,
    };

    if (req.file) {
        galleryData.image = req.file.filename;
    }

    console.log(galleryData);

    const gallery = new Gallery(galleryData);


    try {
        await gallery.save();
        res.send(gallery);
    } catch (e) {
        res.status(400).send(e);

    }
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    const _id = req.params.id;
    try {
        const deleteItemGallery = await Gallery.findById(_id)
            .populate('user', 'displayName');
        if (deleteItemGallery.user.equals(user._id)) {
            deleteItemGallery.delete();
        } else {
            return res.status(403).send({error: 'Permission denied'});
        }
        res.send({message: 'Delete is Successfully'});
    } catch (e) {
        res.status(500).send(e);
    }

});


module.exports = router;