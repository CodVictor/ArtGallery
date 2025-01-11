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


      shortDescriptionFeedback.style.display = 'none';
      longDescriptionFeedback.style.display = 'none';
      validDescription.style.display = 'none';

      zona_de_description.classList.remove('is-valid', 'is-invalid');
      zona_de_description.setCustomValidity("");

  if (description.length < 10) {
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

    let futureDateFeedback = document.getElementById("futureDateFeedback");
    let validDate = document.getElementById("validDate");

  // Ocultar mensajes
      futureDateFeedback.style.display = 'none';
      validDate.style.display = 'none';

  // Limpiar clases de validación
      dateField.classList.remove('is-valid', 'is-invalid');
      dateField.setCustomValidity(""); // Eliminar cualquier mensaje de error previo

  // Obtener la fecha de hoy
    let today = new Date();
      today.setHours(0, 0, 0, 0); // Asegurarse de que solo se compare la fecha sin la hora

  // Verificación de la fecha
  if (dateValue >= today) {
    futureDateFeedback.style.display = 'block';
    dateField.classList.add('is-invalid');
    dateField.setCustomValidity("La fecha debe ser anterior a la fecha de hoy.");
  } else {
    validDate.style.display = 'block';
    dateField.classList.add('is-valid');
    dateField.setCustomValidity(""); // Si es válida, se elimina cualquier mensaje de error.
  }
}

//--------------CHECK PRECIO--------------
async function checkPrice() {
    let priceField = document.getElementById("price"); // Suponiendo que el campo de precio tiene id="price"
    let priceValue = parseFloat(priceField.value); // Convertir el valor ingresado a un número flotante

    let minusceroFeedback = document.getElementById("minusceroFeedback");
    let validPrice = document.getElementById("validPrice");

  // Ocultar los mensajes de error y éxito
      minusceroFeedback.style.display = 'none';
      validPrice.style.display = 'none';

  // Limpiar las clases de validación
      priceField.classList.remove('is-valid', 'is-invalid');
      priceField.setCustomValidity(""); // Eliminar cualquier mensaje de error previo

  // Verificación del precio
  if (isNaN(priceValue) || priceValue <= 0) {
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
  let title = paintingTitle.value.trim();
  const titleDefault = paintingTitle.defaultValue.trim(); // Esto obtiene el valor por defecto del input
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
async function sendFormEdit(event) {
  event.preventDefault();  // elimino el envío por defecto del formulario

  const form = document.getElementById('creationForm');
  form.classList.add('was-validated');  // Activar la validación por defecto de Bootstrap

  // Verifico el título antes de enviar el formulario por si ya estuviese en uso en el último momento
  await checkPaintingTitleEdit();

  const paintingTitle = document.getElementById("artName");
  const urlParts = window.location.pathname.split('/'); 
  const paintingId = urlParts[urlParts.length - 2];

  if (paintingTitle.checkValidity()) {  // Verificar si el campo título pasa la validación personalizada
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