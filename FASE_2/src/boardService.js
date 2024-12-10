const cuadros = new Map();
let nextId = 0;

//En la function addCuadro añado la parte en la que compruebo que el cuadro que voy a añadir no se haya introducido ya, comparando el titulo.
export function addCuadro(cuadro) {
    if (cuadros.has(cuadro.title)){
        console.log("El cuadro que intentas añadir ya ha sido añadido!")
    } else {
        let id = nextId++;
        cuadro.reviews=0;
        cuadro.reviewMap= new Map();
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

export function getArrayCuadrosTitle(){
    return Array.from(cuadros.values()).map(cuadro => cuadro.title);    
}

//ariel funciones para editar las reseñas


export function getReview(cuadroId, reviewId) {
    const cuadro = cuadros.get(cuadroId);
    if (!cuadro) return null;
    return cuadro.reviewMap.find(r => r.id === reviewId) || null;
}


export function updateReview(cuadroId, order, updatedData) {
    const cuadro = cuadros.get(cuadroId);
    if (!cuadro) return null;
    const reviewIndex = cuadro.reviewMap.findIndex(r => r.id === order);
    if (reviewIndex === -1) return null;


    const review = cuadro.reviewMap[reviewIndex];
    cuadro.reviewMap[reviewIndex] = { ...review, ...updatedData };
    return cuadro.reviewMap[reviewIndex];
}
export function getResenias(id){
    let cuadro= cuadros.get(id);
    return[...cuadro.reviewMap.values()];
}
export function addResenia(user, text, rating, id){
     let cuadro = cuadros.get(id);
    review={user, rating, text};
    cuadro.reviewMap.set(review.order, review); 
    console.log(cuadro.reviews);
    }
export function deleteResenia(id, order){
    let cuadro = cuadros.get(id); 
        cuadro.reviewMap.delete(order)
        //por que querria devolver un objeto vacio?
        }
export function deleteResenias(id){  
    let cuadro = cuadros.get(id);
        while (cuadro.reviews>0){
            let cuadro = cuadros.get(id); 
            cuadro.reviewMap.delete(cuadro.reviews);
            cuadro.reviews--; 
        }
    }

