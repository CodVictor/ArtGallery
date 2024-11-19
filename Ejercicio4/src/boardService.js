const cuadros = new Map();
let nextId = 0;

export function addCuadro(cuadro) {
    let id = nextId++;
    cuadro.id = id.toString();
    cuadros.set(cuadro.id, cuadro);
}

export function deleteCuadro(id){

    let cuadro = getCuadro(id);

    cuadros.delete(id);

    return cuadro;
}

export function getCuadros(){
    return [...cuadros.values()];
}

export function getCuadro(id){
    return cuadros.get(id);
}