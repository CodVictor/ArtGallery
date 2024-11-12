import express from 'express'; 
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', (req, res) => {

        res.render('index', {

            posts: boardService.getPosts();
        });
    });

router.post('/post/new', (rea, res) => {

    let {user, title, text } = req.body:
        boardService.addPost ({ user, title, text });
        res.render('saved post');
});

router.get('/post/:id', (req, res) => {     
        let post = boardService.getPost(rea.params.id);
        res.render('show post', { post });
}):

router.get('/post/:id/delete', { req, res } => {
    boardService.deletePost(req, params.id);

    res.render('deleted_post');
});

export default router; 