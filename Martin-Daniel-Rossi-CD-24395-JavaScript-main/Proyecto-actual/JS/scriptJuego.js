//El punto final de este proyecto es conseguir desarrollar un juego de rol de baloncesto.


/*Muestro si es una partida nueva o una continuada en un p*/
//Creo el p
const p = document.createElement("p");
//Le pongo contenido al p
p.innerText = localStorage.getItem("tipoDePartida");
//Ubico el p en el HTML
document.querySelector("header").appendChild(p);
//Pongo el "tipoDePartida" del local storage como continuar juego. En un futuro voy a permitir reanudar partidas y por defecto quiero que se continúe por si entran a este html andes de pasar por la página de inicio.
localStorage.setItem("tipoDePartida", "Continuar juego");



/*Defino valiables necesarias*/
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
    constructor(nombre, altura, peso, capacidadAtletica, defensaPerimetral, defensaInterna, capacidadReboteadora, anotacionExterior, anotacionInterior, creacionDeJuego) {
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
    }
}
class EstadoDelJugador {
    constructor(ubicacionX, ubicacionY) {
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
        //AGREGAR terminar método para mover jugadores
        
    }
}

//Contruyo habilidades jugadores
const jugadorA1 = new Jugador(`(A1)`,180, 80, 70, 100, 10, 20, 70, 60, 95);
const jugadorA2 = new Jugador(`(A2)`,198, 98, 90, 80, 30, 40, 90, 50, 70);
const jugadorA3 = new Jugador(`(A3)`,206, 106, 70, 60, 60, 60, 60, 60, 40);
const jugadorA4 = new Jugador(`(A4)`,208, 108, 50, 40, 75, 80, 30, 80, 30);
const jugadorA5 = new Jugador(`(A5)`,218, 120, 50, 5, 95, 95, 10, 100, 15);

const jugadorB1 = new Jugador(`(B1)`,180, 80, 70, 100, 10, 20, 70, 60, 95);
const jugadorB2 = new Jugador(`(B2)`,198, 98, 90, 80, 30, 40, 90, 50, 70);
const jugadorB3 = new Jugador(`(B3)`,206, 106, 70, 60, 60, 60, 60, 60, 40);
const jugadorB4 = new Jugador(`(B4)`,208, 108, 50, 40, 75, 80, 30, 80, 30);
const jugadorB5 = new Jugador(`(B5)`,218, 120, 50, 5, 95, 95, 10, 100, 15);

//Creo arrays para guardar información de los equipos
const listaJugadoresA = [jugadorA1, jugadorA2, jugadorA3, jugadorA4, jugadorA5];
const listaJugadoresB = [jugadorB1, jugadorB2, jugadorB3, jugadorB4, jugadorB5];




//Contruyo estados de jugadores
const estadoJugadorA1 = new EstadoDelJugador(14, 1);
const estadoJugadorA2 = new EstadoDelJugador(14, 5);
const estadoJugadorA3 = new EstadoDelJugador(14, 10);
const estadoJugadorA4 = new EstadoDelJugador(14, 14);
const estadoJugadorA5 = new EstadoDelJugador(14, 7);

const estadoJugadorB1 = new EstadoDelJugador(15, 2);
const estadoJugadorB2 = new EstadoDelJugador(15, 6);
const estadoJugadorB3 = new EstadoDelJugador(15, 11);
const estadoJugadorB4 = new EstadoDelJugador(15, 15);
const estadoJugadorB5 = new EstadoDelJugador(15, 8);

//Creo arraus para guardar esta infomación por equipo
const listaEstadosJugadoresA = [estadoJugadorA1, estadoJugadorA2, estadoJugadorA3, estadoJugadorA4, estadoJugadorA5];
const listaEstadosJugadoresB = [estadoJugadorB1, estadoJugadorB2, estadoJugadorB3, estadoJugadorB4, estadoJugadorB5];

//Creo objeto para costos de "puntos de acción" para cada acción
const costeAccionesDefensa = {moverseRecto: 1, moverseDiagonal: 1.5, intentarUnRoboAlPortadorDeLaPelota: 1, intentarInterceptarPase: 1, esperaAtosigante: 1, esperaCautelosa: 0.5}
const costeAccionesAtaque = {moverseRecto: 1, moverseDiagonal: 1.5, pase: 0.5, dribblingRecto: 1, dribblingDiagonal: 1.5, esperarSinBalon: 1, esperarEnTripleAmenaza: 0.5}



//Funciones para los dados
// Retorna un número aleatorio entre min (incluido) y max (excluido);
/*function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}*/
/*Función que sirve para lanzar un dado de 20 caras*/
function dadoDe20(){
    return Math.random() * (21-1)+1;
}


/*Muestro habilidades de los jugadores*/
//Creo arrays que van a servir para hacer esto
const habilidadesResumidas = ["Nombre", "Alt", "Peso", "Cap atl", "Def per", "Def int", "Cap reb", "3ple", "Anot int", "Creación"];
const rangosHabilidad = ["puntosMuyBajos", "puntosBajos", "puntosMediosBajos", "puntosMedios", "puntosMediosAltos", "puntosAltos", "puntosMuyAltos", "sobreHumano"];
const rangosAlturas = [0, 164, 175, 184, 194, 203, 213, 222, 232];
const rangosPesos = [0, 73, 82, 91, 99, 108, 116, 125, 140];
const rangosSobreCien = [0, 14, 29, 43, 57, 71, 86, 100, 115];

let dataTablaA = document.getElementById("idTablaA");
let dataTablaB = document.getElementById("idTablaB");


//Hago tabla A
dataTablaA.innerHTML = "";

let tabla = `<table class="tablaHabilidades"><tr>`;
//Creo títulos
for (titulos of habilidadesResumidas){
    //Cada título
    tabla += `<th class="thHabilidades" colspan="2">${titulos}</th>`;
}
tabla += `</tr>`;
//Creo filas de stats
for (jugador in listaJugadoresA) {
    tabla += `<tr>`;
    //Inserto cada dato a cada espacio
    for (habilidades in listaJugadoresA[jugador]){
        //Pongo condicionales para que los distintos puntos tomen distintos colores dependiendo el valor
        if (habilidades == "nombre"){
            tabla += `<td class="tdHabilidades" colspan="2">`;
            tabla += `${listaJugadoresA[jugador][habilidades]}`;
            tabla += `</td>`;
        }
        else if (habilidades == "altura") {
            for (let i=0; i < 8; i++){
                if ((rangosAlturas[i] < listaJugadoresA[jugador][habilidades]) && (listaJugadoresA[jugador][habilidades] <= rangosAlturas[i+1])) {
                    tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                    tabla += `${listaJugadoresA[jugador][habilidades]}`;
                    tabla += `</td>`;
                }
            }
        }
        else if (habilidades == "peso") {
            for (let i=0; i < 8; i++){
                if ((rangosPesos[i] < listaJugadoresA[jugador][habilidades]) && (listaJugadoresA[jugador][habilidades] <= rangosPesos[i+1])) {
                    tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                    tabla += `${listaJugadoresA[jugador][habilidades]}`;
                    tabla += `</td>`;
                }
            }
        }
        else if ((habilidades != "nombre") && (habilidades != "altura") && (habilidades != "peso")){
            for (let i=0; i < 8; i++){
                if ((rangosSobreCien[i] < listaJugadoresA[jugador][habilidades]) && (listaJugadoresA[jugador][habilidades] <= rangosSobreCien[i+1])) {
                    tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                    tabla += `${listaJugadoresA[jugador][habilidades]}`;
                    tabla += `</td>`;
                }
            }
        }
    }
    tabla += `</tr>`;
}
tabla +="</table>";
//Imprimo la tabla A
dataTablaA.innerHTML = tabla;




//Hago tabla B
dataTablaB.innerHTML = "";

tabla = `<table class="tablaHabilidades"><tr>`;
//Creo títulos
for (titulos of habilidadesResumidas){
    //Cada título
    tabla += `<th class="thHabilidades" colspan="2">${titulos}</th>`;
}
tabla += `</tr>`;
//Creo filas de stats
for (jugador in listaJugadoresB) {
    tabla += `<tr>`;
    //Inserto cada dato a cada espacio
    for (habilidades in listaJugadoresB[jugador]){
        //Pongo condicionales para que los distintos puntos tomen distintos colores dependiendo el valor
        if (habilidades == "nombre"){
            tabla += `<td class="tdHabilidades" colspan="2">`;
            tabla += `${listaJugadoresB[jugador][habilidades]}`;
            tabla += `</td>`;
        }
        else if (habilidades == "altura") {
            for (let i=0; i < 8; i++){
                if ((rangosAlturas[i] < listaJugadoresB[jugador][habilidades]) && (listaJugadoresB[jugador][habilidades] <= rangosAlturas[i+1])) {
                    tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                    tabla += `${listaJugadoresB[jugador][habilidades]}`;
                    tabla += `</td>`;
                }
            }
        }
        else if (habilidades == "peso") {
            for (let i=0; i < 8; i++){
                if ((rangosPesos[i] < listaJugadoresB[jugador][habilidades]) && (listaJugadoresB[jugador][habilidades] <= rangosPesos[i+1])) {
                    tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                    tabla += `${listaJugadoresB[jugador][habilidades]}`;
                    tabla += `</td>`;
                }
            }
        }
        else if ((habilidades != "nombre") && (habilidades != "altura") && (habilidades != "peso")){
            for (let i=0; i < 8; i++){
                if ((rangosSobreCien[i] < listaJugadoresB[jugador][habilidades]) && (listaJugadoresB[jugador][habilidades] <= rangosSobreCien[i+1])) {
                    tabla += `<td class="tdHabilidades ${rangosHabilidad[i]}" colspan="2">`;
                    tabla += `${listaJugadoresB[jugador][habilidades]}`;
                    tabla += `</td>`;
                }
            }
        }
    }
    tabla += `</tr>`;
}
tabla +="</table>";
//Imprimo la tabla B
dataTablaB.innerHTML = tabla;


/*Se disputa el salto entre 2 para comenzar el partido*/
alert("El árbitro se dispone en mitad de cancha a lanzar el balón hacia arriba para iniciar del encuentro. Lo lanza y..");
//Creo un bucle para resolver quién consigue más puntos considerando las estadísticas que influyen en esta acción y lo que sacan con el dado
let saltoA = 0;
let saltoB = 0;
//Si empatan vuelve a comenzar el ciclo
while (saltoA == saltoB){
    //Calculo cuántos puntos consigue cada jugador para esta acción
    saltoA = dadoDe20() + listaJugadoresA[4].altura+listaJugadoresA[4].capacidadAtletica;
    alert(`${listaJugadoresA[4].nombre} consigue ${saltoA} puntos en el salto`);
    saltoB = dadoDe20() + listaJugadoresB[4].altura+listaJugadoresB[4].capacidadAtletica;
    alert(`${listaJugadoresB[4].nombre} consigue ${saltoB} puntos en el salto`);
    //Comparo el desempeño de los jugadores y devuelvo lo que ocurre considerando los resultados
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
/*Creo función que calcule los puntos de acción que tendrán los jugadores en el próximo "instante"*/
const comienzaInstante = ()=>{
    for (let i=0; i<=4; i++){
        listaEstadosJugadoresA[i].nuevospuntosDeAccion();
        listaEstadosJugadoresB[i].nuevospuntosDeAccion();
    }
}

/*Creo funcion para comprobar quién tiene la posesión del balón*/
const queEquipoAtaca = ()=> {
    for (let i=0; i < 5; i++) {
        if (listaEstadosJugadoresA[i].conPelota == true) {
            return "A";
        }
        else if (listaEstadosJugadoresB[i].conPelota == true) {
            return "B";
        }
    }
}

/*Creo función para determinar si algún jugador aún tiene su "turno" sin usar en este "instante"*/
const algunoTieneTurno = () => {
    //Creo arrays que van a llenarse con los jugadores que cumplan con la condición
    const jugadoresAConTurno = [];
    const jugadoresBConTurno = [];
    //Creo búcle que se fijará si los jugadores cumplen con la condición o no
    for (let i=0; i < 5; i++) {
        if (listaEstadosJugadoresA[i].turnoUsado == false){
            //Si se cumple la condición se guarda la información en los nuevos arrays
            jugadoresAConTurno.push(`${listaJugadoresA[i].nombre}`);
        }
        if (listaEstadosJugadoresB[i].turnoUsado == false){
            //Si se cumple la condición se guarda la información en los nuevos arrays
            jugadoresBConTurno.push(`${listaJugadoresB[i].nombre}`);
        }
    }
    //Devuelvo ambos array como otro array (que los contiene a ambos) para poder exportar ambos equipos con una única función
    const turnoEnAlgunEquipo = [jugadoresAConTurno, jugadoresBConTurno];
    //Devuelvo este {ultinmo array}
    return turnoEnAlgunEquipo;
}

//Continúa el partido luego del salto lo pongo en búcle puesto que la dinámica del juego es cíclica
while (finDePartido == false) {
    comienzaInstante();
    //AGREGAR bucle de:
        //AGREGAR función que compara iniciativas
        //AGREGAR función que selecciona jugador que realiza una acción en este turno
        //AGREGAR función que elije la acción a realizar por parte de cada jugador elegido
        //AGREGAR función que realiza acción y sus consecuencias (Si es una acción de implementación inmediata o supeditada y ya se puede calcular)
    //AGREGAR función que calcula consecuencias de acciones de implementación tardía
    //AGREGAR función que cuenta cuánto tiempo de juego transcurrió
    finDePartido = true;
}
