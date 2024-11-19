import express from 'express';
import multer from 'multer';
import fs from 'node:fs/promises';

import * as boardService from './boardService.js';

const UPLOADS_FOLDER = 'uploads';
const DEMO_FOLDER = 'demo';
fs.cp(DEMO_FOLDER+'/image3.jpg', UPLOADS_FOLDER+'/image3.jpg');
fs.cp(DEMO_FOLDER+'/image4.jpg', UPLOADS_FOLDER+'/image4.jpg');

const comments = new Map();
let commID=0;

const cuadros = new Map();
let numCuadro=0;
export function addComment(comment) {
    let commID = commID++;
    comments.set(commID, comment);
}
export function deleteComment(id) {
    comments.delete(id);
}
export function editComment(comment, id){
    comments.delete(id);
    comments.set(id, comments)
}

export function addCuadro(cuadro) {
    let numCuadro = numCuadro++;
    comments.set(numCuadro, cuadro);
}
export function deleteCuadro(id) {
    cuadro.delete(id);
}
export function editCuadro(cuadro, id){
    cuadro.delete(id);
    cuadro.set(id, cuadro);
}

export function getCuadro(id){
    return cuadros.get(id);
}
export function getCuadros(){
    return [...cuadros.values()];
}