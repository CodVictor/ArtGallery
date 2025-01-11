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

// Función para enviar el formulario
async function sendForm(event) {
  event.preventDefault();  // elimino el envío por defecto del formulario

  const form = document.getElementById('creationForm');
  form.classList.add('was-validated');  // Activar la validación por defecto de Bootstrap

  // Verifico el título antes de enviar el formulario por si ya estuviese en uso en el último momento
  await checkPaintingTitle();

  const paintingTitle = document.getElementById("artName");
  if (paintingTitle.checkValidity()) {  // Verificar si el campo título pasa la validación personalizada
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
