const cuadros = new Map();
let nextId = 0;
let totalCuadros = 10; //contador para AJAX (INDEX)

//En la function addCuadro añado la parte en la que compruebo que 
// el cuadro que voy a añadir no se haya 
// introducido ya, comparando el titulo.
//En la function addCuadro añado la parte en la q
// ue compruebo que el cuadro que voy a añadir no se haya 
// introducido ya, comparando el titulo.
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
    totalCuadros++; // va haciendo recuento de numero de cuadros -> AJAX
}

// Función para obtener el valor actual de totalCuadros ->AJAX
export function getTotalCuadros() {
    return totalCuadros;
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
export function getResenia(id, reviewId) {
    const cuadro = cuadros.get(id);
    
    if (!cuadro) return null; 
    else {
        let review =cuadro.reviewMap.get(reviewId)
        console.log(cuadro.reviewMap.get(reviewId));
        return review;
    }
}


export function updateResennia(cuadroId, order, updatedData) {
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

export function addResenia(review, id){
     let cuadro = cuadros.get(id);
     cuadro.reviews++;
    review.order=cuadro.reviews.toString()
    cuadro.reviewMap.set(review.order, review); 
    }


export function deleteResenia(id, order){
    let cuadro = cuadros.get(id); 
    let review=cuadro.reviewMap.get(order)
    cuadro.reviews--;
    cuadro.reviewMap.delete(order);
        }

export function deleteResenias(id){  
    let cuadro = cuadros.get(id);
        while (cuadro.reviews>0){
            let cuadro = cuadros.get(id); 
            cuadro.reviewMap.delete(cuadro.reviews);
            cuadro.reviews--; 
        }
    }


//victor AJAX
// funcion que va a mostrar los cuadros de 3 en 3
export function getCuadrosAJAX(from, to) {
    let values = [...cuadros.values()];

    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values; 
    }
}



