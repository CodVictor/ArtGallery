const cuadros = new Map();
let nextId = 0;

export function addCuadro(cuadro) {
    let id = nextId++;
    cuadro.id = id.toString(); //Convierte el id en cadena de texto porque es más facil de manejar en los maps
    cuadros.set(cuadro.id, cuadro); //Set permite agregar una pareja (en este caso id - objeto) a un map. 
                                    //En este caso, agregamos el id del cuadro asociado a un objeto cuadro dentro del mapa cuadros.
}

export function deleteCuadro(id){

    let cuadro = getCuadro(id);

    cuadros.delete(id); //Definido por defecto en los métodos de un Map (en este caso del map cuadros). Se elimina el id y el objeto asociado

    return cuadro;
}

export function getCuadros(){
    return [...cuadros.values()];
}

export function getCuadro(id){
    return cuadros.get(id);
}
