import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as boardService from './boardService.js';

const UPLOADS_FOLDER = 'uploads';
const DEMO_FOLDER = 'demo';

//Copy demo images to upload folder
fs.cp(DEMO_FOLDER+'/image1.jpg', UPLOADS_FOLDER+'/image1.jpg');
fs.cp(DEMO_FOLDER+'/image4.jpg', UPLOADS_FOLDER+'/image4.jpg');

boardService.addPost({ 
    imageFilename: 'image1.jpg',
    style: 'Barroco', 
    title: 'De Antes', 
});

boardService.addPost({ 
    user: 'Juan', 
    title: 'Compro coche', 
    text: 'Pago bien', 
    imageFilename: 'image4.jpg' 
});

const router = express.Router();
const upload = multer({ dest: UPLOADS_FOLDER })

router.get('/', (req, res) => {

    res.render('index', {
        posts: boardService.getPosts()
    });
});

router.post('/post/new', upload.single('image'), (req, res) => {

    let { user, title, text } = req.body;

    let imageFilename = req.file.filename;

    boardService.addPost({ user, title, text, imageFilename });

    res.render('saved_post');
});

router.get('/post/:id', (req, res) => {

    let post = boardService.getPost(req.params.id);

    res.render('show_post', { post });
});

router.get('/post/:id/delete', (req, res) => {

    let post = boardService.deletePost(req.params.id);

    if (post) {
        //Delete image. 
        //It should be improved processing possible errors
        fs.unlink(UPLOADS_FOLDER +'/' + post.imageFilename);
    }

    res.render('deleted_post');
});

router.get('/post/:id/image', (req, res) => {

    let post = boardService.getPost(req.params.id);

    res.download(UPLOADS_FOLDER + '/' + post.imageFilename);

});

export default router;