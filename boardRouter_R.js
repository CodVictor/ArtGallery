import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as boardService from './boardService.js';

const UPLOADS_FOLDER = 'uploads';
const DEMO_FOLDER = 'demo';

//Copy demo images to upload folder
fs.cp(DEMO_FOLDER+'/image3.jpg', UPLOADS_FOLDER+'/image3.jpg');
fs.cp(DEMO_FOLDER+'/image4.jpg', UPLOADS_FOLDER+'/image4.jpg');

boardService.addCuadro({ 
    nombre: 'Victorman', 
    autor: 'JoanPoig', 
    corriente: 'Barroco',
    descripcion: 'No es el caballo Rumano', 
    imagen: 'image3.jpg' 
});

boardService.addCuadro({ 
    nombre: 'ElFonsi', 
    autor: 'La Irene', 
    corriente: 'Barroco',
    descripcion: 'No es el caballo Rumano', 
    imagen: 'image4.jpg' 
});

boardService.addCuadro({ 
    nombre: 'Desconocido', 
    autor: 'Alguien', 
    corriente: 'No se sabe',
    descripcion: 'alguien lo ha visto?', 
    imagen: '' 
});

const router = express.Router();
const upload = multer({ dest: UPLOADS_FOLDER })

router.get('/', (req, res) => {

    res.render('index', {
        cuadros: boardService.getCuadros()
    });
});
router.post('/cuadro/crear', upload.single('image'), (req, res) => {

    let { nombre, autor, corriente, descripcion } = req.body;

    let imageFilename = req.file.filename;

    boardService.addCuadro({ nombre, autor, corriente, descripcion, imageFilename });

    res.render('Cuadro guardado');
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
        fs.unlink(UPLOADS_FOLDER +'/' + post.imageFilename);
    }

    res.render('El cuadro se ha borrado');
});

router.get('/post/:id/image', (req, res) => {

    let post = boardService.getPost(req.params.id);

    res.download(UPLOADS_FOLDER + '/' + post.imageFilename);

});

export default router;