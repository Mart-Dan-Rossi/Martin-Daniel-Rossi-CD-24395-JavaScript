//Creo acciones para el botón nuevo juego y continuar juego
//Obtengo los elementos
const nuevoJuego = document.querySelector("#nuevoJuego");
const continuarJuego = document.querySelector("#continuarJuego");

//Creo arrays que serán usados para crear un bucle
const opciones = [nuevoJuego, continuarJuego];
const textoOpciones = ["Nuevo juego","Continuar juego"];

//Creo bucle para crear eventos de botones nuevoJuego y continuarJuego
//Agrego el evento
for(opcion in opciones){
    opciones[opcion].addEventListener("click", ()=>{
    //Acciones realizadas con el evento 
    //Guardo en el localStorage el botón seleccionado en forma de string
    localStorage.setItem("tipoDePartida", textoOpciones[opcion]);
    console.log(localStorage.getItem("tipoDePartida"))
    //Cambio a la página de juego
    window.location.href="./juego.html";
    });
}