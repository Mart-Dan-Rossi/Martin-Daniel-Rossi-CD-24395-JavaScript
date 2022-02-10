//Creo acciones para el botón nuevo juego y continuar juego
//Obtengo los elementos
const nuevoJuego = document.querySelector("#nuevoJuego");
const continuarJuego = document.querySelector("#continuarJuego");

//Creo arrays que serán usados para crear un bucle
const opciones = [nuevoJuego, continuarJuego];
const textoOpciones = ["Nuevo juego","Continunando juego"];

//Creo bucle para crear eventos de botones nuevoJuego y continuarJuego
//Agrego el evento
for(let i=0; i<opciones.length; i++){
    opciones[i].addEventListener("click", ()=>{
        //Acciones realizadas con el evento 
        //Guardo en el localStorage el botón seleccionado en forma de string
        localStorage.setItem("tipoDePartida", textoOpciones[i]);
        //Cambio a la página de juego
        window.location.href="./pages/juego.html";
    });
}