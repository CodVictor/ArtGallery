export const cuadros = new Map();
export let nextId = 0;

//En la function addCuadro añado la parte en la que compruebo que el cuadro que voy a añadir no se haya introducido ya, comparando el titulo.
export function addCuadro(cuadro) {

    let id = nextId++;
    cuadro.id = id.toString(); // Convierte el id en cadena de texto porque es más fácil de manejar en los Maps
    cuadros.set(cuadro.id, cuadro); // Agrega el id y el objeto cuadro al Map
}

export function deleteCuadro(id){

    let cuadro = getCuadro(id);
    cuadros.delete(id); //Definido por defecto en los métodos de un Map (en este caso del map cuadros). 
    //Se elimina el id y el objeto asociado
    return cuadro;
}

export function getCuadros(){
    return [...cuadros.values()];
}

export function getCuadro(id){
    return cuadros.get(id);
}
