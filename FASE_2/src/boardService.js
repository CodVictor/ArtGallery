const cuadros = new Map();
let nextId = 0;

//En la function addCuadro añado la parte en la que compruebo que el cuadro que voy a añadir no se haya introducido ya, comparando el titulo.
export function addCuadro(cuadro) {
    if (cuadros.has(cuadro.title)){
        console.log("El cuadro que intentas añadir ya ha sido añadido!")
    } else {
        let id = nextId++;
        cuadro.id = id.toString(); //Convierte el id en cadena de texto porque es más facil de manejar en los maps
        cuadros.set(cuadro.id, cuadro); //Set permite agregar una pareja (en este caso id - objeto) a un map. 
                                    //En este caso, agregamos el id del cuadro asociado a un objeto cuadro dentro del mapa cuadros.
    }
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

export function updateCuadro(id, updatedData) {
    const cuadro = cuadros.get(id);
    if (cuadro) {
        // Actualiza los campos del cuadro solo si el nuevo valor existe
        cuadro.title = updatedData.title !== undefined ? updatedData.title : cuadro.title;
        cuadro.author = updatedData.author !== undefined ? updatedData.author : cuadro.author;
        cuadro.style = updatedData.style !== undefined ? updatedData.style : cuadro.style;
        cuadro.price = updatedData.price !== undefined ? updatedData.price : cuadro.price;
        cuadro.description = updatedData.description !== undefined ? updatedData.description : cuadro.description;
        cuadro.opinion = updatedData.opinion !== undefined ? updatedData.opinion : cuadro.opinion;
        cuadro.date = updatedData.date !== undefined ? updatedData.date : cuadro.date;
        cuadro.imageFilename = updatedData.imageFilename !== undefined ? updatedData.imageFilename : cuadro.imageFilename;

        return cuadro;
    }
    return null; // Devuelve null si el cuadro no existe
}