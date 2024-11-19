import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as boardService from './boardService.js';

const UPLOADS_FOLDER = 'uploads';
const DEMO_FOLDER = 'demo';

//Copy demo images to upload folder
fs.cp(DEMO_FOLDER+'/image1.jpg', UPLOADS_FOLDER+'/image1.jpg');
fs.cp(DEMO_FOLDER+'/image4.jpg', UPLOADS_FOLDER+'/image4.jpg');

boardService.addCuadro({ 
    imageFilename: 'image1.jpg',
    title: 'De Antes', 
    style: 'Barroco', 
});

boardService.addCuadro({ 
    imageFilename: 'image2.jpg',
    title: 'Flores Terrenales', 
    style: 'Cubismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image3.jpg',
    title: 'Selfie', 
    style: 'Barroco', 
});
boardService.addCuadro({ 
    imageFilename: 'image4.jpg',
    title: 'Noche de Vincent', 
    style: 'Postimpresionismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image5.jpg',
    title: 'Time Salvatore', 
    style: 'Surrealismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image6.jpg',
    title: 'Era Moderna', 
    style: 'Vanguardismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image7.jpg',
    title: 'Segnora', 
    style: 'Expresionismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image8.jpg',
    title: 'Concorde', 
    style: 'Realismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image9.jpg',
    title: 'Grito Desgarrador', 
    style: 'Expresionismo', 
});
boardService.addCuadro({ 
    imageFilename: 'image10.jpg',
    title: 'Intelligentia Artificialis', 
    style: 'IA', 
});

const router = express.Router();
const upload = multer({ dest: UPLOADS_FOLDER })

router.get('/', (req, res) => {

    res.render('index', {
        cuadros: boardService.getCuadros()
    });
});

router.post('/cuadro/new', upload.single('image'), (req, res) => {

    let { user, title, text } = req.body;

    let imageFilename = req.file.filename;

    boardService.addCuadro({ user, title, text, imageFilename });

    res.render('saved_cuadro');
});

router.get('/cuadro/:id', (req, res) => {

    let cuadro = boardService.getCuadro(req.params.id);

    res.render('show_cuadro', { cuadro });
});

router.get('/cuadro/:id/delete', (req, res) => {

    let cuadro = boardService.deleteCuadro(req.params.id);

    if (cuadro) {
        //Delete image. 
        //It should be improved processing possible errors
        fs.unlink(UPLOADS_FOLDER +'/' + cuadro.imageFilename);
    }

    res.render('deleted_cuadro');
});

router.get('/cuadro/:id/image', (req, res) => {

    let cuadro = boardService.getCuadro(req.params.id);

    res.download(UPLOADS_FOLDER + '/' + cuadro.imageFilename);

});

export default router;