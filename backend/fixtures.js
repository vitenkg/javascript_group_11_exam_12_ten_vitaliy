const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require('./models/User');
const Gallery = require("./models/Gallery");


const run = async () => {
    await mongoose.connect(config.db.url);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, test, test1] = await User.create({
            email: 'admin@admin.com',
            password: 'admin',
            token: nanoid(),
            displayName: 'Admin',
            role: 'admin',
        }, {
            email: 'test@test.com',
            password: 'test',
            token: nanoid(),
            displayName: 'Test',
            role: 'user'
        }, {
            email: 'test1@test.com',
            password: 'test',
            token: nanoid(),
            displayName: 'Test',
            role: 'user'
        },
    );

    await Gallery.create({
            title: 'gallery-One',
            image: '/fixtures/gallery-5.jpg',
            user: admin,
        }, {
            title: 'gallery-Two',
            image: '/fixtures/gallery-1.jpeg',
            user: test,
        },
        {
            title: 'gallery-Three',
            image: '/fixtures/gallery-2.jpg',
            user: test,
        },
        {
            title: 'gallery-Four',
            image: '/fixtures/gallery-3.jpg',
            user: test1,
        },
        {
            title: 'gallery-Five',
            image: '/fixtures/gallery-4.jpg',
            user: test1,
        },
    );

    await mongoose.connection.close();
};

run().catch(console.error);