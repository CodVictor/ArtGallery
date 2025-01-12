//--------------FUNCIONES PARA NEW-CUADRO:--------------
//--------------CHECK TITULO--------------
async function checkPaintingTitle() {
  //obtengo el valor del input título
    let paintingTitle = document.getElementById("artName");
    let title = paintingTitle.value;
  //verifico si el titulo está disponible
    const response = await fetch(`/availableTitle?title=${title}`);
    const responseObj = await response.json();
  //obtengo los valores de los div por su id
    let emptyFeedback = document.getElementById("emptyFeedback");
    let upperCaseFeedback = document.getElementById("upperCaseFeedback");
    let validTitle = document.getElementById("validTitle");
    let repeatedTitle = document.getElementById("repeatedTitle");

  // oculto los mensajes de los div
      emptyFeedback.style.display = 'none';
      upperCaseFeedback.style.display = 'none';
      repeatedTitle.style.display = 'none';
      validTitle.style.display = 'none';

  //elimino las clases is-valid e is-invalid del título
      paintingTitle.classList.remove('is-valid', 'is-invalid');
      paintingTitle.setCustomValidity("");  // Elimino cualquier mensaje de error establecido previamente

  //Validación personalizada: voy mostrando los mensajes correspondientes y añado la clase correspondiente en cada caso
  if (title === "") {
    emptyFeedback.style.display = 'block';
    paintingTitle.classList.add('is-invalid');
    paintingTitle.setCustomValidity("El título no puede estar vacío");
  } else if (!/^[A-Z]/.test(title)) {
    upperCaseFeedback.style.display = 'block';
    paintingTitle.classList.add('is-invalid');
    paintingTitle.setCustomValidity('El título debe comenzar con una letra mayúscula.');
  } else if (!responseObj.available) {
    repeatedTitle.style.display = 'block';
    paintingTitle.classList.add('is-invalid');
    paintingTitle.setCustomValidity('El título ya está en uso.');
  } else {
    validTitle.style.display = 'block';
    paintingTitle.classList.add('is-valid');
    paintingTitle.setCustomValidity("");  // Si es válido reseteo el mensaje de error-> esto hace que por defecto se verifique como válido.
  } 
  //Información de uso de SetCustomvalidity:
  //SetCustomValidity()-> Cuando usas esta función, el formulario no se considerará válido hasta que este mensaje sea eliminado (o se establezca como vacío). 
  //Este método es esencial si estás implementando tu propia lógica de validación en lugar de depender de la validación por defecto del navegador.
  //Para poder mostrar los mensajes escritos por setCustomValidity, pondría al final: paintingTitle.reportValidity();, pero en este caso no me interesa, ya que,
  //he implementado los mensajes usando div y las clases de valid-feedback e invalid-feedback
}

//--------------CHECK DESCRIPCION--------------
async function checkDescription() {
  //obtengo el valor del input description
    let zona_de_description = document.getElementById("description");
    let description = zona_de_description.value;


    let shortDescriptionFeedback = document.getElementById("shortDescriptionFeedback");
    let longDescriptionFeedback = document.getElementById("longDescriptionFeedback");
    let validDescription = document.getElementById("validDescription");
    let descriptionFeedback = document.getElementById("descriptionFeedback");

    

    descriptionFeedback.style.display = 'none';
      shortDescriptionFeedback.style.display = 'none';
      longDescriptionFeedback.style.display = 'none';
      validDescription.style.display = 'none';

      zona_de_description.classList.remove('is-valid', 'is-invalid');
      zona_de_description.setCustomValidity("");

  if (description === "") {
        descriptionFeedback.style.display = 'block';
        zona_de_description.classList.add('is-invalid');
        zona_de_description.setCustomValidity("La descripcion no puede estar vacía");
    emptyFeedback.style.display = 'block';
    zona_de_description.classList.add('is-invalid');
    zona_de_description.setCustomValidity("La descripcion no puede estar vacía");
  } else if (description.length < 10) {
    shortDescriptionFeedback.style.display = 'block';
    zona_de_description.classList.add('is-invalid');
    zona_de_description.setCustomValidity("La descripción debe tener al menos 10 caracteres.");
  } else if (description.length > 500) {
    longDescriptionFeedback.style.display = 'block';
    zona_de_description.classList.add('is-invalid');
    zona_de_description.setCustomValidity("La descripción no puede tener más de 500 caracteres.");
  } else {
    validDescription.style.display = 'block';
    zona_de_description.classList.add('is-valid');
    zona_de_description.setCustomValidity("");
  }
}

//--------------CHECK FECHA--------------
async function checkDate() {
    let dateField = document.getElementById("date"); // Suponiendo que el campo de fecha tiene id="date"
    let dateValue = new Date(dateField.value); // Obtener la fecha ingresada
    let date = dateField.value;

    let futureDateFeedback = document.getElementById("futureDateFeedback");
    let validDate = document.getElementById("validDate");
    let dateFeedback = document.getElementById("dateFeedback");

  // Ocultar mensajes
      futureDateFeedback.style.display = 'none';
      validDate.style.display = 'none';
      dateFeedback.style.display = 'none';

  // Limpiar clases de validación
      dateField.classList.remove('is-valid', 'is-invalid');
      dateField.setCustomValidity(""); // Eliminar cualquier mensaje de error previo

  // Obtener la fecha de hoy
    let today = new Date();
      today.setHours(0, 0, 0, 0); // Asegurarse de que solo se compare la fecha sin la hora

  // Verificación de la fecha
  if (date === "") {
    dateFeedback.style.display = 'block';
    dateField.classList.add('is-invalid');
    dateField.setCustomValidity("La descripcion no puede estar vacía");
  } else if (dateValue >= today) {
    futureDateFeedback.style.display = 'block';
    dateField.classList.add('is-invalid');
    dateField.setCustomValidity("La fecha debe ser anterior a la fecha de hoy.");
  } else if (dateValue < today){
    validDate.style.display = 'block';
    dateField.classList.add('is-valid');
    dateField.setCustomValidity(""); // Si es válida, se elimina cualquier mensaje de error.
  }
}

//--------------CHECK PRECIO--------------
async function checkPrice() {
    let priceField = document.getElementById("price"); // Suponiendo que el campo de precio tiene id="price"
    let priceValue = parseFloat(priceField.value); // Convertir el valor ingresado a un número flotante
    let price = priceField.value;

    let minusceroFeedback = document.getElementById("minusceroFeedback");
    let validPrice = document.getElementById("validPrice");
    let monetaryValueFeedback = document.getElementById("monetaryValueFeedback");

  // Ocultar los mensajes de error y éxito
      minusceroFeedback.style.display = 'none';
      validPrice.style.display = 'none';
      monetaryValueFeedback.style.display = 'none';
  // Limpiar las clases de validación
      priceField.classList.remove('is-valid', 'is-invalid');
      priceField.setCustomValidity(""); // Eliminar cualquier mensaje de error previo

  // Verificación del precio
  
  if (price === "") {
    monetaryValueFeedback.style.display = 'block';
    priceField.classList.add('is-invalid');
    priceField.setCustomValidity("El precio no puede estar vacío");
  } else if (isNaN(priceValue) || priceValue <= 0) {
    minusceroFeedback.style.display = 'block';
    priceField.classList.add('is-invalid');
    priceField.setCustomValidity("El precio debe ser un número válido mayor que 0.");
  } else {
    validPrice.style.display = 'block';
    priceField.classList.add('is-valid');
    priceField.setCustomValidity(""); // Si es válido, se elimina cualquier mensaje de error.
  }
}

//--------------ENVIO DE FORMULARIO--------------
async function sendForm(event) {
      event.preventDefault();  // elimino el envío por defecto del formulario

    const form = document.getElementById('creationForm');
      form.classList.add('was-validated');  // Activar la validación por defecto de Bootstrap


//--------------AWAIT--------------
    await checkPaintingTitle();  // Verifico el título antes de enviar el formulario por si ya estuviese en uso en el último momento
    await checkDescription();
    await checkDate();
    await checkPrice();

    const paintingTitle = document.getElementById("artName");
    const zona_de_description = document.getElementById("description");
    const dateField = document.getElementById("date");
    const priceField = document.getElementById("price");

//--------------CHECK VALIDEZ DE LOS ATRIBUTOS--------------
  if (paintingTitle.checkValidity()&& zona_de_description.checkValidity()&& dateField.checkValidity()&& priceField.checkValidity()) {  // Verificar si el campo título pasa la validación personalizada
    const formData = new FormData(event.target);
    const response = await fetch(`/cuadro/new`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Cuadro añadido con éxito!");
      window.location.href = "/";
    } else {
      alert("Error al añadir el cuadro. Rellena todos los campos correctamente.");
    }
  } else {
    alert("Hay errores en el formulario. Por favor, revisa los campos.");
  }
}

//--------------PAGINA PRINCIPAL CON AJAX--------------
    const NUM_RESULTADOS_A_MOSTRAR = 3; //tres cuadros a mostrar
    let loadMoreRequests = 0; 

async function loadAJAX() {
    const from = (loadMoreRequests + 1)* NUM_RESULTADOS_A_MOSTRAR; //inicialmente: from 3 <-- ya que siempre ha de tener 3 cuadros inicialmente
    const to = from + NUM_RESULTADOS_A_MOSTRAR;                    // final: to 6

    const response = await fetch(`/AJAXCuadrosPart?from=${from}&to=${to}`); // se pulsa "cargar mas arte", 
                                                                          // llama a la funcion loadAJAX
                                                                          // y hace la llamada a la ruta `/AJAXCuadrosPart?from=${from}to=${to}`
                                                                          // para pillar del 3 al 6, del 6 al 9...                                       
    const newCuadros = await response.text(); //coge la respuesta. Aqui esta la lista de cuadros

    const cuadrosDiv = document.getElementById("content"); 

      cuadrosDiv.innerHTML += newCuadros; //lo pinta debajo de los 3, 6, 9... ya puestos
      loadMoreRequests++;

  // Verifica si el número total de cuadros es igual o mayor que 10
if (loadMoreRequests * NUM_RESULTADOS_A_MOSTRAR >= 10) {
    const loadMoreButton = document.querySelector('.bottom-buttons-index .btn-outline-success');
    loadMoreButton.style.display = 'none'; // Oculta el botón

  // Cambia la clase del contenedor para centrar el botón "Añadir Cuadro"
    const buttonContainer = document.querySelector('.bottom-buttons-index');
      buttonContainer.classList.add('center');
    }
}


//------------FUNCIONES PARA EDITION-PAGE:--------------

async function checkPaintingTitleEdit() {
  //obtengo el valor del input título
  let paintingTitle = document.getElementById("artName");
  let title = paintingTitle.value;
  const titleDefault = paintingTitle.defaultValue; // Esto obtiene el valor por defecto del input
  //verifico si el titulo está disponible
  const response = await fetch(`/availableTitle?title=${title}`);
  const responseObj = await response.json();
  //obtengo los valores de los div por su id
  let emptyFeedback = document.getElementById("emptyFeedback");
  let upperCaseFeedback = document.getElementById("upperCaseFeedback");
  let validTitle = document.getElementById("validTitle");
  let repeatedTitle = document.getElementById("repeatedTitle");

  // oculto los mensajes de los div
  emptyFeedback.style.display = 'none';
  upperCaseFeedback.style.display = 'none';
  repeatedTitle.style.display = 'none';
  validTitle.style.display = 'none';
  //elimino las clases is-valid e is-invalid del título
  paintingTitle.classList.remove('is-valid', 'is-invalid');
  paintingTitle.setCustomValidity("");  // Elimino cualquier mensaje de error establecido previamente

  //Validación personalizada: voy mostrando los mensajes correspondientes y añado la clase correspondiente en cada caso
  if (title === "") {
    emptyFeedback.style.display = 'block';
    paintingTitle.classList.add('is-invalid');
    paintingTitle.setCustomValidity("El título no puede estar vacío");
  } else if (!/^[A-Z]/.test(title)) {
    upperCaseFeedback.style.display = 'block';
    paintingTitle.classList.add('is-invalid');
    paintingTitle.setCustomValidity('El título debe comenzar con una letra mayúscula.');
  } else if (title === titleDefault){
    validTitle.style.display = 'block';
    paintingTitle.classList.add('is-valid');
    paintingTitle.setCustomValidity("");  // Si es válido reseteo el mensaje de error-> esto hace que por defecto se verifique como válido.
  } else if (!responseObj.available) {
    repeatedTitle.style.display = 'block';
    paintingTitle.classList.add('is-invalid');
    paintingTitle.setCustomValidity('El título ya está en uso.');
  } else {
    validTitle.style.display = 'block';
    paintingTitle.classList.add('is-valid');
    paintingTitle.setCustomValidity("");  // Si es válido reseteo el mensaje de error-> esto hace que por defecto se verifique como válido.
  } 
  //Información de uso de SetCustomvalidity:
  //SetCustomValidity()-> Cuando usas esta función, el formulario no se considerará válido hasta que este mensaje sea eliminado (o se establezca como vacío). 
  //Este método es esencial si estás implementando tu propia lógica de validación en lugar de depender de la validación por defecto del navegador.
  //Para poder mostrar los mensajes escritos por setCustomValidity, pondría al final: paintingTitle.reportValidity();, pero en este caso no me interesa, ya que,
  //he implementado los mensajes usando div y las clases de valid-feedback e invalid-feedback
}
function alloweditReview(id, reviewId){
  console.log(id, reviewId)
  const reviewDiv = document.querySelector(`.resenia[data-order="${reviewId}"]`);
  reviewDiv.innerHTML = `
  <form class="edit-review-form" data-order="${reviewId}">
  <div class="form-group">
                <label for="review-user-${reviewId}">Usuario</label>
                <input type="text" id="review-user-${reviewId}" class="form-control" placeholder="Nombre de usuario" />
            </div>
      <div class="form-group">
          <label for="review-text-${reviewId}">Editar Reseña</label>
          <textarea id="review-text-${reviewId}" class="form-control" rows="3"></textarea>
      </div>
      <div class="form-group">
          <label for="review-rating-${reviewId}">Calificación</label>
          <select id="review-rating-${reviewId}" class="form-control">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
      </div>
      <button type="button" class="btn btn-success" onclick="saveeditedReview(${id},${reviewId})">Guardar</button>
      <button type="button" class="btn btn-secondary" onclick="cancelEdit(${id},${reviewId})">Cancelar</button>
  </form>
`;
}
function saveeditedReview(id, reviewId) {
  // Obtener los nuevos valores
  const newUser = document.querySelector(`#review-user-${reviewId}`).value;
  const newText = document.querySelector(`#review-text-${reviewId}`).value;
  const newRating = document.querySelector(`#review-rating-${reviewId}`).value;

  // Enviar los datos al servidor usando fetch
  fetch(`/cuadro/${id}/confirm-edit-review/${reviewId}/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: newUser, text: newText, rating: newRating }),
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar la reseña");
      }
      return response.json(); // Aquí esperamos un JSON válido
  })
      .then(data => {
        console.log("ok");
          // Actualizar la reseña en la interfaz con la respuesta del servidor
          const reviewDiv = document.querySelector(`.resenia[data-order="${reviewId}"]`);
          reviewDiv.innerHTML = `
              <div class="resenia-header">
                  <h3>${data.user}</h3>
                  <span class="rating">${data.rating} <i class="bi bi-star-fill"></i></span>
              </div>
              <p class="resenia-text">${data.text}</p>
              <div class="secondary-buttons">
                  <button class="btn btn-outline-danger"><a href="/cuadro/${data.cuadroId}/delete-review/${reviewId}">Borrar Reseña</a></button>
                  <button class="btn btn-outline-success" onclick="alloweditReview(${id}, ${reviewId})>Editar Reseña</button>
              </div>
          `;
      })
      .catch(error => console.error('Error al guardar la reseña:', error));
}
function canceleditReview(order) {
  // Restaurar el contenido original de la reseña
  fetch(`/cuadro/get-review/${order}`)
      .then(response => response.json())
      .then(data => {
          const reviewDiv = document.querySelector(`.resenia[data-order="${order}"]`);
          reviewDiv.innerHTML = `
              <div class="resenia-header">
                  <h3>${data.user}</h3>
                  <span class="rating">${data.rating} <i class="bi bi-star-fill"></i></span>
              </div>
              <p class="resenia-text">${data.text}</p>
              <div class="secondary-buttons">
                  <button class="btn btn-outline-danger"><a href="/cuadro/${data.cuadroId}/delete-review/${order}">Borrar Reseña</a></button>
                  <button class="btn btn-outline-success" onclick="editReview(${order})">Editar Reseña</button>
              </div>
          `;
      })
      .catch(error => console.error('Error al cancelar edición:', error));
}
async function sendFormEdit(event) {
  event.preventDefault();  // elimino el envío por defecto del formulario

  const form = document.getElementById('creationForm');
  form.classList.add('was-validated');  // Activar la validación por defecto de Bootstrap

  // Verifico el título antes de enviar el formulario por si ya estuviese en uso en el último momento
  //--------------AWAIT--------------
  await checkPaintingTitleEdit();  // Verifico el título antes de enviar el formulario por si ya estuviese en uso en el último momento
  /*await checkDescription();
  await checkDate();
  await checkPrice();

  const zona_de_description = document.getElementById("description");
  const dateField = document.getElementById("date");
  const priceField = document.getElementById("price");*/

  const paintingTitle = document.getElementById("artName");
  const urlParts = window.location.pathname.split('/'); 
  const paintingId = urlParts[urlParts.length - 2];

  if (paintingTitle.checkValidity()/*&& zona_de_description.checkValidity()&& dateField.checkValidity()&& priceField.checkValidity()*/) {  // Verificar si el campo título pasa la validación personalizada
    const formData = new FormData(event.target);
    const response = await fetch(`/cuadro/${paintingId}/edit`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Cuadro editado correctamente!");
      window.location.href = "/";
    } else {
      alert("Error al añadir el cuadro. Rellena todos los campos correctamente.");
    }
  } else {
    alert("Hay errores en el formulario. Por favor, revisa los campos.");
  }
}



//BORRAR CUADRO CON AJAX

async function deleteCuadro(id) {
  //confirmacion por si se ha equivocado de boton
  const confirmation = confirm("¿Estás seguro de que deseas borrar este cuadro?");
  if (!confirmation) return;

  try { //si ha confirmado enviamos peticion al servidor para borrar la reseña
      const response = await fetch(`/cuadro/${id}/delete`, {
          method: "POST",
      });

      if (response.ok) { //si todo ha salido bien se elimina la reseña y se muestra el mensaje de confirmacion
          alert("Cuadro eliminado con éxito.");
          window.location.href = "/";
      } else {
          alert("Error al eliminar el cuadro.");
      }
  } catch (error) {
      console.error("Error al eliminar el cuadro:", error); //mostramos el error especifico que ha ocurrido
      alert("Ocurrió un error al procesar tu solicitud.");
  }
}



//FUNCION PARA CREAR LA RESEÑA CON AJAX
async function saveResenia(cuadroId) {
  event.preventDefault(); // Evitar recargar la página

  const user = document.getElementById("user").value.trim();
  const text = document.getElementById("text").value.trim();
  const rating = document.getElementById("rating").value;

  if (!user || !text || !rating) {
      alert("Por favor, completa todos los campos.");
      return false;
  }

  try {
      const response = await fetch(`/cuadro/${cuadroId}/saved-review`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, text, rating }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
          // Mostrar un mensaje y opción de volver
          alert(result.message);
          const reviewsContainer = document.querySelector(".resenias");

          // añadir la nueva reseña al DOM
          const newReview = `
              <div class="resenia" data-order="${result.review.order}">
                  <div class="resenia-header">
                      <h3>${result.review.user}</h3>
                      <span class="rating">${result.review.rating} <i class="bi bi-star-fill"></i></span>
                  </div>
                  <p class="resenia-text">${result.review.text}</p>
              </div>`;
          reviewsContainer.innerHTML += newReview;
          document.getElementById("reseniaForm").reset();

          // Redirigir a la página principal
          if (confirm("¿Deseas volver a la página principal?")) {
              window.location.href = "/";
          }
      } else {
          alert(result.message || "Error al guardar la reseña.");
      }
  } catch (error) {
      console.error("Error al guardar la reseña:", error);
      alert("Ocurrió un error al procesar tu solicitud.");
  }

  return false; // Evitar recargar la página
}
