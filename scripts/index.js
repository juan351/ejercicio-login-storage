// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};

// ACTIVIDAD
const formulario = document.forms[0];
const inputMail = this.document.getElementById("email-input");
const inputPass = this.document.getElementById("password-input"); 
let smallElement = document.createElement("small");

window.addEventListener("load", function(){ 
    formulario.addEventListener("submit", enviarFormulario);
    renderizarPagina();
    inputMail.addEventListener("blur", function(){
      validarMail(inputMail.value)
    });
});

function enviarFormulario(e){
  e.preventDefault()
    usuario = baseDeDatos["usuarios"].find(usuario => usuario.email === inputMail.value);
    let smallElement = document.createElement("small");
    if(usuario){
      if (usuario.password === inputPass.value){
        delete usuario.password;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        renderizarPagina();        
      }else{
        smallElement.innerText = "Contraseña incorrecta";
        formulario.appendChild(smallElement);
        setTimeout(()=>smallElement.remove(),5000)
    }
  }else{
    if(validarMail(inputMail.value)){
      smallElement.innerText = "Usuario incorrecto";
      formulario.appendChild(smallElement);
      setTimeout(()=>smallElement.remove(),5000)  
    }    
  }
};

function renderizarPagina(){
  if(localStorage["usuario"]){
    usuario = JSON.parse(localStorage["usuario"]);
    formulario.classList.add("hidden");
    document.querySelector("h1").innerHTML = `<h1>Bienvenido al sitio ${usuario.name}</h1>`
    let boton = document.createElement("button");
    boton.id = "cerrar-sesion";
    boton.classList.add("login-btn");
    boton.innerText = "Cerrar sesión";
    document.querySelector("main").appendChild(boton);
    boton.addEventListener("click", function(){
      localStorage.clear();
      location.reload();
    });
  }
}

function validarMail(mail){
  let emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
  if (emailRegex.test(mail)){
    return true;
  }else{
    smallElement.innerText = "La dirección de e-mail no es válida"
    formulario.appendChild(smallElement);
    setTimeout(()=>smallElement.remove(),5000);
    return false;
  }
  
}

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */
