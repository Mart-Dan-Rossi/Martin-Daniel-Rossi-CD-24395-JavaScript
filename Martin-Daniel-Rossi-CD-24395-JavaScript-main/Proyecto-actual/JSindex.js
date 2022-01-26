//Creo acciones para el botón nuevo juego y continuar juego
//Obtengo los elementos
const nuevoJuego = document.querySelector("#nuevoJuego");
const continuarJuego = document.querySelector("#continuarJuego");
//AGREGAR Creo arrays que serán usados para crear un bucle
const opciones = [nuevoJuego, continuarJuego];
const textoOpciones = {
    textoNuevoJuego: "Nuevo juego",
    textoContinuarJuego: "Continuar juego"
};
//AGREGAR Creo bucle para crear eventos
//Agrego el evento
for(opcion in opciones){
    let i=0;
    opciones[i].addEventListener("click", ()=>{
    //Acciones realizadas con el evento 
    //Guardo en el localStorage el botón seleccionado en forma de string
    localStorage.setItem(`TipoDePartida`, textoOpciones[i]);
    //Cambio a la página de juego
    window.location.href="./juego.html";
    i++;
    });
}