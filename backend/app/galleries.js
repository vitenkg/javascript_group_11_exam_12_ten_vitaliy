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
    console.log(userId);
    try {
        const galleries = await Gallery.find({user: userId})
            .populate('user', 'displayName');

        res.send(galleries);
    } catch (e) {
        console.log(e)
    }
});

router.post('/user', auth, async (req, res) => {
    if (!req.body.title || !req.file) {
        return res.status(400).send({error: 'Data No Valid'});
    }

    const galleryData = {
        title: req.body.title,
        user: req.user._id,
    };

    if (req.file) {
        galleryData.image = req.file.filename;
    }

    const gallery = new Gallery(galleryData);

    try {
        await gallery.save();
        res.send(gallery);
    } catch (e) {
        res.status(400).send(e);

    }
});

router.delete('/:id', async (req, res) => {
    const user = req.user;
    const _id = req.params.id;
    try {
        const deleteItemGallery = Gallery.findOne({_id});
        console.log(deleteItemGallery[user]);
        if (deleteItemGallery[user]._id === user._id) {
            await Gallery.findByIdAndUpdate(req.body.id, { publish: true },
                function (err, docs) {
                    if (err){
                        console.log(err);
                        res.status(401).send({error: 'Something wrong'});
                    }
                    else{
                        res.send({message: "Updated User: "});
                    }
                });
        } else {
            return res.status(403).send({error: 'Permission denied'});
        }
        res.send({message: 'Delete is Successfully'});
    } catch (e) {
        res.status(500).send(e);
    }

});


module.exports = router;