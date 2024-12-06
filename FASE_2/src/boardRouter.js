import express from 'express'; //Cuando no ponemos '/' delante de lo que queremos importar, lo busca directamente desde node_modules
                               //Por ello, para poder usar express y que lo importe de node_modules necesitamos tenerlo descargado previamente
import multer from 'multer';
import fs from 'node:fs/promises';

import * as boardService from './boardService.js';

const UPLOADS_FOLDER = 'uploads';
const DEMO_FOLDER = 'demo';

//RUBEN
//Copy demo images to upload folder
//fs.cp(origin, destination) -> lo que pongamos en origin lo copia en destination. 
fs.cp(DEMO_FOLDER+'/image1.jpg', UPLOADS_FOLDER+'/image1.jpg'); //Concatena la ruta dejando de forma fija DEMO_FOLDER, ya que todas las imagenes vienen de ahi
fs.cp(DEMO_FOLDER+'/image2.jpg', UPLOADS_FOLDER+'/image2.jpg');
fs.cp(DEMO_FOLDER+'/image3.jpg', UPLOADS_FOLDER+'/image3.jpg');
fs.cp(DEMO_FOLDER+'/image4.jpg', UPLOADS_FOLDER+'/image4.jpg');
fs.cp(DEMO_FOLDER+'/image5.jpg', UPLOADS_FOLDER+'/image5.jpg');
fs.cp(DEMO_FOLDER+'/image6.jpg', UPLOADS_FOLDER+'/image6.jpg');
fs.cp(DEMO_FOLDER+'/image7.jpg', UPLOADS_FOLDER+'/image7.jpg');
fs.cp(DEMO_FOLDER+'/image8.jpg', UPLOADS_FOLDER+'/image8.jpg');
fs.cp(DEMO_FOLDER+'/image9.jpg', UPLOADS_FOLDER+'/image9.jpg');
fs.cp(DEMO_FOLDER+'/image10.jpg', UPLOADS_FOLDER+'/image10.jpg');


boardService.addCuadro({ 
    imageFilename: 'image1.jpg',
    title: 'De Antes', 
    style: 'Barroco', 
    author: 'Isolde Armand',
    date: '12/08/2000',
    price: '3500',
    opinion: 'Siempre he creído que el atardecer tiene una capacidad única para hablar directamente al alma. En este cuadro, quería capturar ese momento preciso en que el sol comienza a esconderse y la luz adquiere una cualidad casi mágica, transformando todo lo que toca. Las montañas, que representan algo tan eterno e inmutable, contrastan con la fugacidad de la luz que las acaricia, creando un diálogo entre lo permanente y lo transitorio. La figura solitaria en el paisaje es una invitación para que el espectador se proyecte a sí mismo en la escena, se detenga, respire y reflexione sobre su lugar en el vasto universo. Creo que, como artistas, tenemos la responsabilidad de capturar esos momentos que pueden pasar desapercibidos, y este atardecer fue mi manera de recordar a todos que incluso los instantes más efímeros pueden dejarnos una marca imborrable.',
    description: 'En esta obra se observa un paisaje montañoso al atardecer, donde el cielo transita de tonos dorados y naranjas a un azul profundo que presagia la noche. Los picos montañosos dominan la escena con una fuerza imponente, mientras un río fluye serpenteante al pie de las montañas, reflejando los últimos rayos de sol. Una figura solitaria, pequeña en comparación con la inmensidad del paisaje, se encuentra en el centro, observando el horizonte en un acto de contemplación. La escena transmite una sensación de serenidad y nostalgia, atrapando la belleza fugaz del momento. <br> La riqueza de los detalles, desde las sombras alargadas hasta el sutil brillo en la superficie del agua, invita al espectador a perderse en la obra. Los colores cálidos del atardecer contrastan con las sombras frías de las montañas, creando un balance emocional que oscila entre la melancolía y la esperanza.'
});

boardService.addCuadro({ 
    imageFilename: 'image2.jpg',
    title: 'Flores Terrenales', 
    style: 'Cubismo', 
    author: 'Lucien Argenville',
    date: '23/6/2018',
    price: '84.000',
    opinion: 'El tiempo siempre ha sido un concepto que me intriga. Esta obra refleja mi visión sobre la incapacidad de contener el paso del tiempo, representado por la lucha entre formas precisas y el desorden que lo rodea. Es una metáfora de nuestra búsqueda por entender lo incontrolable.',
    description: 'En esta pintura se mezclan formas geométricas con manchas de colores vibrantes. Las líneas rectas en la parte superior sugieren orden, mientras que las formas dispersas en la parte inferior evocan caos. Los colores fríos predominan, pero los toques de rojo y naranja aportan energía a la obra, creando una tensión entre el control y la liberación.'
});
boardService.addCuadro({ 
    imageFilename: 'image3.jpg',
    title: 'Selfie', 
    style: 'Barroco', 
    author: 'Seraphina Delacroix',
    date: '18/11/2019',
    price: '9.000.000',
    opinion: 'Este cuadro refleja la importancia de valorar esos momentos simples, pero significativos, que forman nuestra vida diaria. La conexión entre las personas y su entorno me emociona, y quise capturar la armonía de este instante.',
    description: 'Una pequeña plaza de pueblo se llena de vida con puestos de frutas y flores. El sol ilumina la escena, creando sombras irregulares entre las hojas de los árboles. Una mujer mayor ofrece un ramo de flores, mientras un niño juega cerca. La escena es cálida, llena de detalles que invitan a la reflexión sobre la belleza de lo cotidiano.'
});
boardService.addCuadro({ 
    imageFilename: 'image4.jpg',
    title: 'Noche de Vincent', 
    style: 'Postimpresionismo', 
    author: 'Andrés Velasco',
    date: '28/6/1999',
    price: '12.000.000',
    opinion: 'El puente en esta obra es una representación de la transición entre el pasado y el futuro. Mi intención fue capturar esa sensación de incertidumbre que sentimos cuando tomamos decisiones que cambian el curso de nuestras vidas.',
    description: 'Un puente antiguo cruza un río tranquilo, rodeado por árboles desnudos que sugieren el final del otoño. El cielo gris y nublado crea una atmósfera melancólica. La figura de una persona cruza el puente, dando la sensación de un viaje solitario hacia lo desconocido. La pintura equilibra la rigidez de la estructura con la suavidad del agua.'
});
boardService.addCuadro({ 
    imageFilename: 'image5.jpg',
    title: 'Time Salvatore', 
    style: 'Surrealismo', 
    author: 'Elowen Lavelle',
    date: '18/1/2015',
    price: '35.000',
    opinion: 'Las flores representan para mí la fragilidad de la belleza. Este campo es un recordatorio de cómo la naturaleza, a pesar de su inmensidad, se ve afectada por la incertidumbre del clima, como nuestras emociones se ven moldeadas por las circunstancias.',
    description: 'La obra muestra un campo desbordado de flores silvestres, donde los colores vivos de las flores contrastan con el gris del cielo que amenaza lluvia. En el horizonte, una línea de montañas borrosas se dibuja con trazos suaves. Las flores se deshacen en trazos impresionistas, creando una sensación de movimiento.'
});
boardService.addCuadro({ 
    imageFilename: 'image6.jpg',
    title: 'Era Moderna', 
    style: 'Vanguardismo', 
    author: 'Thaddeus Moreau',
    date: '9/2/2020',
    price: '180.000',
    opinion: 'Quise explorar la sensación de estar completamente solo en un vasto paisaje, rodeado de naturaleza pero aún así inmerso en la soledad interior. El amanecer simboliza la esperanza, pero también el vacío que a veces sentimos al empezar algo nuevo.',
    description: 'Una figura humana solitaria camina por una playa desierta al amanecer. El cielo se tiñe de tonos pasteles, mientras las olas tocan suavemente la orilla. La figura, apenas detallada, parece sumida en sus pensamientos. La calma del entorno contrasta con la sensación de introspección que transmite la escena.'
});
boardService.addCuadro({ 
    imageFilename: 'image7.jpg',
    title: 'Segnora', 
    style: 'Expresionismo', 
    author: 'Morgane Vasseur',
    date: '8/8/2008',
    price: '60.000',
    opinion: 'Esta obra representa la vida urbana y cómo, a pesar de la multitud, siempre nos sentimos solos en medio de la ciudad. Las luces reflejan nuestras esperanzas, pero también nuestras inseguridades al navegar en un mundo lleno de ruido y desconexión.',
    description: 'La pintura muestra una ciudad al anochecer, donde las luces de las farolas se reflejan en el pavimento mojado. Las figuras humanas se mezclan con los edificios, creando una sensación de anonimato. El cielo, aunque oscuro, está iluminado por las luces de la ciudad que parecen dar vida a la escena.',
});
boardService.addCuadro({ 
    imageFilename: 'image8.jpg',
    title: 'Concorde', 
    style: 'Realismo', 
    author: 'Céleste Duval',
    date: '9/10/2005',
    price: '80.000',
    opinion: 'Este cuadro es una reflexión sobre la memoria y cómo nuestras experiencias quedan marcadas en nosotros. Cada arruga es un capítulo de una historia, y quise capturar esa sabiduría que solo el paso del tiempo puede otorgar.',
    description: 'Un retrato de una persona mayor, con los ojos llenos de sabiduría, mira al espectador. Las arrugas de su rostro son capturadas con gran detalle, transmitiendo una sensación de tiempo vivido. En el fondo, se distinguen elementos de su vida pasada, como libros y herramientas, creando una atmósfera cálida y nostálgica.'
});
boardService.addCuadro({ 
    imageFilename: 'image9.jpg',
    title: 'Grito Desgarrador', 
    style: 'Expresionismo', 
    author: 'Aurelia Marchand',
    date: '22/7/2012',
    price: '86.000',
    opinion: 'La lluvia tiene un poder único para detenernos y hacernos reflexionar. Este cuadro busca capturar esa quietud que sentimos al estar bajo la lluvia, donde todo se vuelve más íntimo y introspectivo.',
    description: 'La pintura presenta una escena de lluvia, donde las gotas caen sobre un campo verde. Las figuras humanas, aunque borrosas, están representadas como siluetas caminando bajo paraguas. El uso del color en el cielo y el campo, con tonos de verde y gris, refleja la melancolía del momento.'
});
boardService.addCuadro({ 
    imageFilename: 'image10.jpg',
    title: 'Intelligentia Artificialis', 
    style: 'IA', 
    author: 'Valentin de Saint-Claire',
    date: '15/11/2024',
    price: '99.000.000',
    opinion: 'La creación artística nunca es un proceso ordenado, sino que surge del caos. Quise mostrar la belleza que puede surgir de la desorganización, esa energía caótica que da paso a nuevas ideas.',
    description: 'Una mesa de trabajo está cubierta con objetos dispersos: pinceles, tintas, papeles arrugados. La luz suave entra por una ventana, iluminando la escena. La atmósfera es de caos creativo, donde las herramientas y materiales parecen tomar vida propia, reflejando la energía de un proceso artístico.'
});

//añadir
const router = express.Router();
const upload = multer({ dest: UPLOADS_FOLDER })

router.get('/', (req, res) => {

    res.render('index', {
        cuadros: boardService.getCuadros()
    });
});
router.get('/new-cuadro.html', (req, res) => {
    res.render('new-cuadro');  // Sirve la vista con el formulario
});

router.post('/cuadro/new', upload.single('image'), (req, res) => {

    let { title, author, style, price, description, opinion, date } = req.body;

    let imageFilename = req.file.filename;

    let arrayCuadros = boardService.getArrayCuadrosTitle(); //Llamo a la funcion para crear el array de titles 

    if (arrayCuadros.includes(title)){
        res.render('new-cuadro-error');
    } else{
        boardService.addCuadro({ title, author, style, price, description, opinion, date, imageFilename });
        res.render('saved-cuadro-msg');

    }
});


router.get('/info.html/:id', (req, res) => {

    let cuadro = boardService.getCuadro(req.params.id);

    res.render('info', { cuadro });
});


//borrar
router.post('/cuadro/:id/delete', async (req, res) => {
    let cuadro = boardService.deleteCuadro(req.params.id);

    if (cuadro) {
        // Eliminar la imagen asociada
        await fs.unlink(UPLOADS_FOLDER + '/' + cuadro.imageFilename, (err) => { //async y await hacen que se borren las imagenes del server
            //si reinicias con crtl + s te devuelve las imagenes
            if (err) {
                console.error('Error al eliminar la imagen:', err);
            }
        });
                }

    res.render('deleted-cuadro-msg');
});

router.get('/cuadro/:id/image', (req, res) => {

    let cuadro = boardService.getCuadro(req.params.id);

    res.download(UPLOADS_FOLDER + '/' + cuadro.imageFilename);
});

//editar

import { getCuadro, updateCuadro } from './boardService.js';

router.get('/cuadro/:id/edit', (req, res) => {
    const cuadro = getCuadro(req.params.id);
    if (cuadro) {
        res.render('edition-page', { cuadro });
    } else {
        res.status(404).send('Cuadro no encontrado');
    }
});

router.post('/cuadro/:id/edit', upload.single('image'), (req, res) => { //actualización del cuadro

    const updatedData = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        style: req.body.style,
        price: req.body.price,
        opinion: req.body.opinion,
        date: req.body.date,
        imageFilename: req.file ? req.file.filename : undefined, // Si hay una nueva imagen, se guarda el nombre del archivo
    };

    const updatedCuadro = updateCuadro(req.params.id, updatedData);
    if (updatedCuadro) {
        res.render('changes-confirmed', { cuadro: updatedCuadro }); // Muestra la página de confirmación con el cuadro actualizado
    } else {
        res.status(404).send('Cuadro no encontrado');
    }
});

export default router;