//RUBEN
async function checkPaintingTitle() {
  //Leo el titulo que esta siendo escrito 
  let paintingTitle = document.getElementById("artName"); 
  let title = paintingTitle.value;
  const response = await fetch(`/availableTitle?title=${title}`);
  const responseObj = await response.json();
  
  //Si el titulo no esta disponible pongo borde rojo, si lo esta lo pongo verde:
  let message3;
  if (!responseObj.available){
    paintingTitle.style.border = "4px red double"; 
    message3 =  "";
  }else{
    paintingTitle.style.border = "4px green double";
    message3 = "<p>Título disponible</p>";
  }

  //Compruebo si el titulo esta vacio:
  let message1;
  if (title === ""){
    message1 = "<p>Introduce un título</p>";
  }else{
    message1 = "";
  } 

  //Compruebo si el titulo empieza con mayuscula:
  const startsWithUpperCase = /^[A-Z]/.test(title);
  let message2;
  if (!startsWithUpperCase) {
    message2 = "<p>El título debe empezar con mayúscula</p>";
  } else { 
    message2 = "";
  }
  
  //Muestro los mensajes en el div con id=titleAvailability:
  const messageDiv = document.getElementById("titleAvailability"); //Aqui guardo el 'div' con id=titleAvailability en messageDiv
  messageDiv.innerHTML = message1 + message2 + message3; //Aqui escribo dentro del div (guardado en messageDiv) el mensaje que había escrito (<p>titulo disponible...)   
 
  if (responseObj.available) {
    messageDiv.className = 'is-valid';  //Clase para "disponible"
  } else {
    messageDiv.className = 'is-invalid';  //Clase para "no disponible"
  }
  
}