//El punto final de este juego es conseguir desarrollar un juego de rol de baloncesto.
//De momento este proyecto 


//Defino valiables necesarias
let altura;
let peso;
let capacidadAtletica;
let defensaPerimetral;
let defensaInterna;
let capacidadReboteadora ;
let anotacionExterior;
let anotacionInterior;
let creacionDeJuego;
let ubicacionX;
let ubicacionY;
let conPelota;
let turnoUsado;
let ultimaAccion = "Todavía no realizó ninguna acción";
let puntosDeAccion;


let finDePartido = false;
let resultadoDado;




//Creación de jugadores
class Jugador {
    constructor(nombre, altura, peso, capacidadAtletica, defensaPerimetral, defensaInterna, capacidadReboteadora, anotacionExterior, anotacionInterior, creacionDeJuego, ubicacionX, ubicacionY) {
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
        this.capacidadAtletica = capacidadAtletica;
        this.defensaPerimetral = defensaPerimetral;
        this.defensaInterna = defensaInterna;
        this.capacidadReboteadora = capacidadReboteadora;
        this.anotacionExterior = anotacionExterior;
        this.anotacionInterior = anotacionInterior;
        this.creacionDeJuego = creacionDeJuego;
        this.ubicacionX = ubicacionX;/*Utilizo la ubicación X para determinar en que punto del largo de la cancha se encuentran los jugadores*/
        this.ubicacionY = ubicacionY;/*Utilizo la ubicación Y para determinar en que punto del ancho de la cancha se encuentran los jugadores*/
        this.conPelota = false;/*Determina si el jugador tiene la posesión de la pelota*/
        this.turnoUsado = false;/*Determina si el jugador ya ha realizado una acción en este "Instante"*/
        this.ultimaAccion = "Todavía no realizó ninguna acción";/*Recuerda cuál fué la última acción realizada por el jugador*/
        this.puntosDeAccion = 0;/*Determina de cuántos puntos de acción dispone el jugador en su turno*/
        this.nuevospuntosDeAccion = ()=>{
            if (this.altura <= 192) {
                resultadoDado = dadoDe20();
                this.puntosDeAccion = 2;
                if (resultadoDado > 6) {
                    ++this.puntosDeAccion;
                }
            }
            else if ((this.altura > 192) && (this.altura <= 208)) {
                resultadoDado = dadoDe20();
                this.puntosDeAccion = 2;
                if (resultadoDado > 10) {
                    ++this.puntosDeAccion;
                }
            }
            else if (this.altura > 208) {
                resultadoDado = dadoDe20();
                this.puntosDeAccion = 1;
                if ((resultadoDado > 3) && (resultadoDado <16)) {
                    ++this.puntosDeAccion;
                }
                else if (resultadoDado >=16) {
                    ++this.puntosDeAccion;
                }
            }
        };
    }
}

const jugadorA1 = new Jugador(`${prompt("Introduzca el nombre y apellido del base del equipo A")}(A1)`,180, 180, 70, 100, 10, 20, 70, 60, 95, 14, 1);
const jugadorA2 = new Jugador(`${prompt("Introduzca el nombre y apellido del del escolta equipo A")}(A2)`,198, 205, 90, 80, 30, 40, 90, 50, 70, 14, 5);
const jugadorA3 = new Jugador(`${prompt("Introduzca el nombre y apellido del del alero equipo A")}(A3)`,206, 195, 70, 60, 60, 60, 60, 60, 40, 14, 10);
const jugadorA4 = new Jugador(`${prompt("Introduzca el nombre y apellido del del ala-pivot equipo A")}(A4)`,208, 205, 50, 40, 75, 80, 30, 80, 30, 14, 14);
const jugadorA5 = new Jugador(`${prompt("Introduzca el nombre y apellido del del pivot equipo A")}(A5)`,218, 225, 50, 5, 95, 95, 10, 100, 15, 14, 7);

const jugadorB1 = new Jugador(`${prompt("Introduzca el nombre y apellido del base del equipo B")}(B1)`,180, 180, 70, 100, 10, 20, 70, 60, 95, 15, 2);
const jugadorB2 = new Jugador(`${prompt("Introduzca el nombre y apellido del escolta del equipo B")}(B2)`,198, 205, 90, 80, 30, 40, 90, 50, 70, 15, 6);
const jugadorB3 = new Jugador(`${prompt("Introduzca el nombre y apellido del alero del equipo B")}(B3)`,206, 195, 70, 60, 60, 60, 60, 60, 40, 15, 11);
const jugadorB4 = new Jugador(`${prompt("Introduzca el nombre y apellido del ala-pivot del equipo B")}(B4)`,208, 205, 50, 40, 75, 80, 30, 80, 30, 15, 15);
const jugadorB5 = new Jugador(`${prompt("Introduzca el nombre y apellido del pivot del equipo B")}(B5)`,218, 225, 50, 5, 95, 95, 10, 100, 15, 15, 8);

//Creo arrays para guardar información de los equipos
const listaJugadoresA = [jugadorA1, jugadorA2, jugadorA3, jugadorA4, jugadorA5];
const listaJugadoresB = [jugadorB1, jugadorB2, jugadorB3, jugadorB4, jugadorB5];

//Funciones para los dados
// Retorna un número aleatorio entre min (incluido) y max (excluido);
/*function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}*/
//Función que sirve para lanzar un dado de 20 caras
function dadoDe20(){
    return Math.random() * (21-1)+1;
}

//Se disputa el salto entre 2 para comenzar el partido
alert("El árbitro se dispone en mitad de cancha a lanzar el balón hacia arriba para iniciar del encuentro. Lo lanza y..");
//Creo un bucle para resolver quién consigue más puntos considerando las estadísticas que influyen en esta acción y lo que sacan con el dado
let saltoA = 0;
let saltoB = 0;
while (saltoA == saltoB){
    saltoA = dadoDe20() + listaJugadoresA[4].altura+listaJugadoresA[4].capacidadAtletica;
    alert(`${listaJugadoresA[4].nombre} consigue ${saltoA} puntos en el salto`);
    saltoB = dadoDe20() + listaJugadoresB[4].altura+listaJugadoresB[4].capacidadAtletica;
    alert(`${listaJugadoresB[4].nombre} consigue ${saltoB} puntos en el salto`);
    let resultadoSalto = saltoA-saltoB;
    if (resultadoSalto > 0){
        alert(`El salto lo gana el equipo A y la pelota ahora está en posesión de ${listaJugadoresA[0].nombre}`);
        listaJugadoresA[0].conPelota = true;
        listaJugadoresA[0].ultimaAccion = `${listaJugadoresA[0].nombre} recibe un pase`;
        console.log(`${listaJugadoresA[0].ultimaAccion}`);
        listaJugadoresA[4].ultimaAccion = `${listaJugadoresA[4].nombre} gana el salto`;
        console.log(`${listaJugadoresA[4].ultimaAccion}`);
    }
    else if (resultadoSalto < 0){
        alert(`El salto lo gana el equipo B y la pelota ahora está en posesión de ${listaJugadoresB[0].nombre}`);
        listaJugadoresB[0].conPelota = true;
        listaJugadoresB[0].ultimaAccion = `${listaJugadoresB[0].nombre} recibe un pase`;
        console.log(`${listaJugadoresB[0].ultimaAccion}`);
        listaJugadoresB[4].ultimaAccion = `${listaJugadoresB[4].nombre} gana el salto`;
        console.log(`${listaJugadoresB[4].ultimaAccion}`);
    }
    else{
        alert("Ambos jugadores alcanzan el balón al mismo tiempo, la disputa por el salto sigue!");
    }
};
//Creo función que calcule los puntos de acción que tendrán los jugadores en el próximo "instante"
const comienzaInstante = ()=>{
    for (i=0; i<=4; i++){
        listaJugadoresA[i].nuevospuntosDeAccion();
        listaJugadoresB[i].nuevospuntosDeAccion();
    }
}

//Creo funcion para comprobar quién tiene la posesión del balón
const queEquipoAtaca = ()=> {
    for (i=0; i < 5; i++) {
        if (listaJugadoresA[i].conPelota == true) {
            return "A";
        }
        else if (listaJugadoresB[i].conPelota == true) {
            return "B";
        }
    }
}

//Creo función para determinar si algún jugador aún tiene su "turno" sin usar en este "instante"
const algunoTieneTurno = () => {
    const jugadoresAConTurno = [];
    const jugadoresBConTurno = [];
    for (i=0; i < 5; i++) {
        if (listaJugadoresA[i].turnoUsado == false){
            jugadoresAConTurno.push(`${listaJugadoresA[i].nombre}`);
        }
        if (listaJugadoresB[i].turnoUsado == false){
            jugadoresBConTurno.push(`${listaJugadoresB[i].nombre}`);
        }
    }
    const turnoEnAlgunEquipo = [jugadoresAConTurno, jugadoresBConTurno];
    return turnoEnAlgunEquipo;
}
//Creo herramientas que van a servir para que los coach seleccionen al jugador con el que quieren jugar en este "turno"
const herramientaParaElegirJugadorDefensor = ()=>{
    let defensorQueRealizaUnaAccion;
    alert(`El equipo que ataca es el equipo ${queEquipoAtaca()} por lo que el otro equipo comienza eligiendo con qué jugador va a realizar una acción`);
    const turnoEnAlgunEquipo = algunoTieneTurno();
    const listaDeJugadoresConTurnoA = `${turnoEnAlgunEquipo[0]}`;
    const listaDeJugadoresConTurnoB = `${turnoEnAlgunEquipo[1]}`;
    if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "A")) {
        defensorQueRealizaUnaAccion = prompt(`Los jugadores de equipo B con turno son ${listaDeJugadoresConTurnoB}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "B2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(defensorQueRealizaUnaAccion.slice(-1));
        console.log(ultimaLetraPrompt);
        let primeraLetraPrompt = (defensorQueRealizaUnaAccion.charAt(0));
        console.log(primeraLetraPrompt);
        if ((defensorQueRealizaUnaAccion.length != 2) || (listaJugadoresB[ultimaLetraPrompt] == undefined)){
            console.log(defensorQueRealizaUnaAccion.lengt);
            console.log(listaJugadoresB[ultimaLetraPrompt]);
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "B") {
            return "Su equipo es el B, cargue bien el dato por favor";
        }
        else if (listaJugadoresB[ultimaLetraPrompt].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`;
        }
        //Respuesta jugador seleccionado
        else {
            return defensorQueRealizaUnaAccion;
        }
    }
    else if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "B")) {
        defensorQueRealizaUnaAccion = prompt(`Los jugadores de equipo A con turno son ${listaDeJugadoresConTurnoA}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "A2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(defensorQueRealizaUnaAccion.slice(-1));
        console.log(ultimaLetraPrompt);
        let primeraLetraPrompt = defensorQueRealizaUnaAccion.charAt(0);
        console.log(primeraLetraPrompt);
        if ((defensorQueRealizaUnaAccion.length != 2) || (listaJugadoresA[ultimaLetraPrompt] == undefined)){
            console.log(defensorQueRealizaUnaAccion.lengt);
            console.log(listaJugadoresB[ultimaLetraPrompt]);
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "A") {
            return "Su equipo es el A, cargue bien el dato por favor";
        }
        else if (listaJugadoresA[ultimaLetraPrompt].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`
        }
        //Respuesta jugador seleccionado
        else {
            return defensorQueRealizaUnaAccion;
        }
    }
    else {
        return "A ningún jugador de tu equipo le queda turno en este instante";
    }
}
const herramientaParaElegirJugadorAtacante = ()=>{
    let atacanteQueRealizaUnaAccion;
    alert(`Ahora es turno del equipo ${queEquipoAtaca()} de que elija con qué jugador va a realizar una acción`);
    const turnoEnAlgunEquipo = algunoTieneTurno();
    const listaDeJugadoresConTurnoA = `${turnoEnAlgunEquipo[0]}`;
    const listaDeJugadoresConTurnoB = `${turnoEnAlgunEquipo[1]}`;
    if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "A")) {
        atacanteQueRealizaUnaAccion = prompt(`Los jugadores de equipo A con turno son ${listaDeJugadoresConTurnoA}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "A2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(atacanteQueRealizaUnaAccion.slice(-1));
        console.log(ultimaLetraPrompt);
        let primeraLetraPrompt = atacanteQueRealizaUnaAccion.charAt(0);
        console.log(primeraLetraPrompt);
        if ((atacanteQueRealizaUnaAccion.length != 2) || (listaJugadoresA[ultimaLetraPrompt] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "A") {
            return "Su equipo es el A, cargue bien el dato por favor";
        }
        else if (listaJugadoresA[ultimaLetraPrompt].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`
        }
        //Respuesta jugador seleccionado
        else {
            return atacanteQueRealizaUnaAccion;
        }
    }
    else if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "B")) {
        atacanteQueRealizaUnaAccion = prompt(`Los jugadores de equipo B con turno son ${listaDeJugadoresConTurnoB}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "B2").`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(atacanteQueRealizaUnaAccion.slice(-1));
        console.log(ultimaLetraPrompt);
        let primeraLetraPrompt = atacanteQueRealizaUnaAccion.charAt(0);
        console.log(primeraLetraPrompt);
        if ((atacanteQueRealizaUnaAccion.length != 2) || (listaJugadoresB[ultimaLetraPrompt] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "B") {
            return "Su equipo es el B, cargue bien el dato por favor";
        }
        else if (listaJugadoresB[ultimaLetraPrompt].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`
        }
        //Respuesta jugador seleccionado
        else {
            return atacanteQueRealizaUnaAccion;
        }
    }
    else {
        return "A ningún jugador de tu equipo le queda turno en este instante";
    }
}

//Creo funciones que pide al coach que corresponda que seleccione con quién va a realizar su próxima acción
const coachDefensorEligeJugador = ()=>{
    let repetir = "Si";
    while (repetir == "Si"){
        let respuestaSeleccionJugadorEquipoDefensor = herramientaParaElegirJugadorDefensor();
        if ((respuestaSeleccionJugadorEquipoDefensor == "Dato mal escrito") || (respuestaSeleccionJugadorEquipoDefensor == "Su equipo es el A, cargue bien el dato por favor") || (respuestaSeleccionJugadorEquipoDefensor == `Este jugador no cuenta con más "turnos" en este "instante"`) || (respuestaSeleccionJugadorEquipoDefensor == "Su equipo es el B, cargue bien el dato por favor")){
            alert(respuestaSeleccionJugadorEquipoDefensor);
            alert("Por favor cargue de nuevo el dato pedido");
        }
        else {
            alert(`El jugador elegido por el coach defensor para actuar en este turno es el ${respuestaSeleccionJugadorEquipoDefensor}`);
            repetir = "No";
        }
    }
}
const coachAtacanteEligeJugador = ()=>{
    let repetir = "Si";
    while (repetir == "Si"){
        let respuestaSeleccionJugadorEquipoAtacante = herramientaParaElegirJugadorAtacante();
        if ((respuestaSeleccionJugadorEquipoAtacante == "Dato mal escrito") || (respuestaSeleccionJugadorEquipoAtacante == "Su equipo es el A, cargue bien el dato por favor") || (respuestaSeleccionJugadorEquipoAtacante == `Este jugador no cuenta con más "turnos" en este "instante"`) || (respuestaSeleccionJugadorEquipoAtacante == "Su equipo es el B, cargue bien el dato por favor")){
            alert(respuestaSeleccionJugadorEquipoAtacante);
            alert("Por favor cargue de nuevo el dato pedido");
        }
        else {
            alert(`El jugador elegido por el coach atacante para actuar en este turno es el ${respuestaSeleccionJugadorEquipoAtacante}`);
            repetir = "No";
        }
    }
}
//Continúa el partido
while (finDePartido == false) {
    comienzaInstante();
    coachDefensorEligeJugador();
    coachAtacanteEligeJugador();
    
    
    finDePartido = true;
}