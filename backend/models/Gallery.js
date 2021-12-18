const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

});

GallerySchema.plugin(idvalidator);

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;