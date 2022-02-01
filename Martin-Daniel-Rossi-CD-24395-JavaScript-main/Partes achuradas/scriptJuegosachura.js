/*this.nuevaPosicion = (equipoYNumero)=>{
            mostrarPosicionesJugadores();
            alert(`Importante recordar que moverse a los lados cuesta 1 "punto de acción" y hacerlo en diagonal cuesta 1,5 "puntos de acción"`);
            //Creo Array que contiene posiciones que están ocupadas por otros jugadores y condiciones para llenar este array.
            const posicionesOcupadas = [];
            //Si el que se mueve es del equipo B
            if (equipoYNumero.slice(0,2).toUpperCase() == "B") {
                if (listaJugadoresB[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion >= 1) {
                    //Corroboro lugares a los que se puede mover el jugador
                    //Primer búcle va a buscar en posiciones X
                    for (let o=-1; o<=1; o++){
                        //Segundo búcle va a buscar en posiciones Y
                        for (let i=-1; i<=1; i++){
                            //Tercer búcle es usado para ir cambiando de jugadores
                            for (let u=0; u<5; u++){
                                //Comparo con posiciones del equipo B
                                if ((listaJugadoresB[u].ubicacionX == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresB[u].ubicacionY == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    let posicion = [listaJugadoresB[u].ubicacionX, listaJugadoresB[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Quito la comparación con el mismo jugador
                                if ((listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o] == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX]) && (listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i] == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY])){
                                    posicionesOcupadas.pop();
                                }
                                //Comparo con posiciones del equipo A
                                if ((listaJugadoresA[u].ubicacionX == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresA[u].ubicacionY == listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    let posicion = [listaJugadoresA[u].ubicacionX, listaJugadoresA[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Si no tiene puntos para ir a las diagonales pero sí a los lados
                                if (listaJugadoresB[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion < 1.5) {
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresB[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                }
                            }
                        }
                    }
                }
                else if (listaJugadoresB[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion > 1){
                    alert(`Usted no dispone de suficientes "puntos de acción" para realizar esta acción`)
                }
            }
            //Si el que se mueve es del equipo A
            else if (equipoYNumero.slice(0,2).toUpperCase() == "A") {
                if (listaJugadoresA[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion >= 1) {
                    //Corroboro lugares a los que se puede mover el jugador
                    //Primer búcle va a buscar en posiciones X
                    for (let o=-1; o<=1; o++){
                        //Segundo búcle va a buscar en posiciones Y
                        for (let i=-1; i<=1; i++){
                            //Tercer búcle es usado para ir cambiando de jugadores
                            for (let u=0; u<5; u++){
                                let posicion;
                                //Comparo con posiciones del equipo B
                                if ((listaJugadoresB[u].ubicacionX == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresB[u].ubicacionY == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    posicion = [listaJugadoresB[u].ubicacionX, listaJugadoresB[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Comparo con posiciones del equipo A
                                if ((listaJugadoresA[u].ubicacionX == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o]) && (listaJugadoresA[u].ubicacionY == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i])){
                                    posicion = [listaJugadoresA[u].ubicacionX, listaJugadoresA[u].ubicacionY];
                                    posicionesOcupadas.push(posicion);
                                }
                                //Quito la comparación con el mismo jugador
                                if ((listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+o] == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX]) && (listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+i] == listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY])){
                                    posicionesOcupadas.pop();
                                }
                                //Si no tiene puntos para ir a las diagonales pero sí a los lados
                                if (listaJugadoresA[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion < 1.5) {
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX+1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY+1]];
                                    posicionesOcupadas.push(posicion);
                                    posicion = [listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionX-1], listaJugadoresA[Number(equipoYNumero.slice(-1)-1)][ubicacionY-1]];
                                    posicionesOcupadas.push(posicion);
                                }
                            }
                        }
                    }
                }
                else if (listaJugadoresA[[Number(equipoYNumero.slice(-1)-1)]].puntosDeAccion > 1){
                    alert(`Usted no dispone de suficientes "puntos de acción" para realizar esta acción`)
                }
            }
            alert(`El jugador se puede mover a cualquier posición de las cercanas exceptuando las siguientes ${posicionesOcupadas} porque están ocupadas o por falta de puntos`);
            const posicionesQueRodeanAlJugador = [];
            
            //A dónde se va a mover?
            
        }*/











































        /*Creo función compuesta que permite a los "coach" ver las habilidades de los jugadores
            //Creo arrays que van a servir para armar una función que simplifique la creación de los filtros.

            //Creo un filtro por cada tipo de habilidad--------------------------------------
            if (respuestaParaFiltros == "ALTURA") {
                let alturaFiltrada = prompt("Introduzca la altura mínima (cm) por la que filtrar (ej. 210)");
                const filtroJugadoresAltosEquipoA = listaJugadoresA.filter(habilidades => habilidades.altura >= alturaFiltrada);
                const filtroJugadoresAltosEquipoB = listaJugadoresB.filter(habilidades => habilidades.altura >= alturaFiltrada);
                filtroJugadoresAltosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que miden más de ${alturaFiltrada}cm del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroJugadoresAltosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que miden más de ${alturaFiltrada}cm del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "PESO") {
                let pesoFiltrado = prompt(`Introduzca el peso mínimo (Kg) por el que filtrar (ej. "98")`);
                const filtroJugadoresPesadosEquipoA = listaJugadoresA.filter(habilidades => habilidades.peso >= pesoFiltrado);
                const filtroJugadoresPesadosEquipoB = listaJugadoresB.filter(habilidades => habilidades.peso >= pesoFiltrado);
                filtroJugadoresPesadosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que pesan más de ${pesoFiltrado}Kg del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroJugadoresPesadosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que pesan más de ${pesoFiltrado}Kg del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "CAPACIDADATLETICA") {
                let capacidadAtleticaFiltrado = prompt(`Introduzca la capacidad atlética mínima por la que filtrar (ej. "80")`);
                const filtroJugadoresAtleticosEquipoA = listaJugadoresA.filter(habilidades => habilidades.capacidadAtletica >= capacidadAtleticaFiltrado);
                const filtroJugadoresAtleticosEquipoB = listaJugadoresB.filter(habilidades => habilidades.capacidadAtletica >= capacidadAtleticaFiltrado);
                filtroJugadoresAtleticosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadAtleticaFiltrado} capacidad atlética del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroJugadoresAtleticosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadAtleticaFiltrado} capacidad atlética del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "DEFENSAPERIMETRAL") {
                let defensaPerimetralFiltrado = prompt(`Introduzca la defensa perimetral mínima por la que filtrar (ej. "80")`);
                const filtroDefensoresPerimetroEquipoA = listaJugadoresA.filter(habilidades => habilidades.defensaPerimetral >= defensaPerimetralFiltrado);
                const filtroDefensoresPerimetroEquipoB = listaJugadoresB.filter(habilidades => habilidades.defensaPerimetral >= defensaPerimetralFiltrado);
                filtroDefensoresPerimetroEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaPerimetralFiltrado} de defensa perimetral del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroDefensoresPerimetroEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaPerimetralFiltrado} de defensa perimetral del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "DEFENSAINTERNA") {
                let defensaInternaFiltrado = prompt(`Introduzca la defensa interna mínima por la que filtrar (ej. "80")`);
                const filtroDefensoresInternosEquipoA = listaJugadoresA.filter(habilidades => habilidades.defensaInterna >= defensaInternaFiltrado);
                const filtroDefensoresInternosEquipoB = listaJugadoresB.filter(habilidades => habilidades.defensaInterna >= defensaInternaFiltrado);
                filtroDefensoresInternosEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaInternaFiltrado} de defensa interna del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroDefensoresInternosEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${defensaInternaFiltrado} de defensa interna del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "CAPACIDADREBOTEADORA") {
                let capacidadReboteadoraFiltrado = prompt(`Introduzca la capacidad reboteadora mínima por la que filtrar (ej. "80")`);
                const filtroCapacidadReboteadoraEquipoA = listaJugadoresA.filter(habilidades => habilidades.capacidadReboteadora >= capacidadReboteadoraFiltrado);
                const filtroCapacidadReboteadoraEquipoB = listaJugadoresB.filter(habilidades => habilidades.capacidadReboteadora >= capacidadReboteadoraFiltrado);
                filtroCapacidadReboteadoraEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadReboteadoraFiltrado} de capacidad reboteadora del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroCapacidadReboteadoraEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${capacidadReboteadoraFiltrado} de capacidad reboteadora del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "ANOTACIONEXTERIOR") {
                let anotacionExteriorFiltrado = prompt(`Introduzca la anotación exterior mínima por la que filtrar (ej. "80")`);
                const filtroAnotacionExteriorEquipoA = listaJugadoresA.filter(habilidades => habilidades.anotacionExterior >= anotacionExteriorFiltrado);
                const filtroAnotacionExteriorEquipoB = listaJugadoresB.filter(habilidades => habilidades.anotacionExterior >= anotacionExteriorFiltrado);
                filtroAnotacionExteriorEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionExteriorFiltrado} de anotación exterior del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroAnotacionExteriorEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionExteriorFiltrado} de anotación exterior del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "ANOTACIONINTERIOR") {
                let anotacionInteriorFiltrado = prompt(`Introduzca la anotación interior mínima por la que filtrar (ej. "80")`);
                const filtroAnotacionInteriorEquipoA = listaJugadoresA.filter(habilidades => habilidades.anotacionInterior >= anotacionInteriorFiltrado);
                const filtroAnotacionInteriorEquipoB = listaJugadoresB.filter(habilidades => habilidades.anotacionInterior >= anotacionInteriorFiltrado);
                filtroAnotacionInteriorEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionInteriorFiltrado} de anotación interior del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroAnotacionInteriorEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${anotacionInteriorFiltrado} de anotación interior del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }
            else if (respuestaParaFiltros == "CREACIONDEJUEGO") {
                let creacionDeJuegoFiltrado = prompt(`Introduzca la creación de juego mínima por la que filtrar (ej. "80")`);
                const filtroCreacionDeJuegoEquipoA = listaJugadoresA.filter(habilidades => habilidades.creacionDeJuego >= creacionDeJuegoFiltrado);
                const filtroCreacionDeJuegoEquipoB = listaJugadoresB.filter(habilidades => habilidades.creacionDeJuego >= creacionDeJuegoFiltrado);
                filtroCreacionDeJuegoEquipoA.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${creacionDeJuegoFiltrado} de creación de juego del equipo A son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
                filtroCreacionDeJuegoEquipoB.forEach((jugador) =>{
                    listaJugadoresFiltrados = listaJugadoresFiltrados + `
                    ${jugador.nombre}`;
                })
                alert(`Los jugadores que tienen una valoración mínima de ${creacionDeJuegoFiltrado} de creación de juego del equipo B son ${listaJugadoresFiltrados}`);
                listaJugadoresFiltrados = "";
            }

            //Cambio la pregunta que se le hará al usuario para que quede mejor redactada
            otraPregunta = "Desea ver los que destacan en una otra habilidad?(Si/No)"
        }
        //Cambio la pregunta que se le hará al usuario para que quede mejor redactada
        laPregunta = "Desea ver las habilidades de los jugadores nuevamente? (Si/No)"
    }
    alert("Continuamos con el encuentro");
}
verJugadores();*/




























/*Creo herramientas que van a servir para que los coach seleccionen al jugador con el que quieren jugar en este "turno"
const herramientaParaElegirJugadorDefensor = ()=>{
    let defensorQueRealizaUnaAccion;
    alert(`El equipo que ataca es el equipo ${queEquipoAtaca()} por lo que el otro equipo comienza eligiendo con qué jugador va a realizar una acción`);
    //Utilizo función creada con anterioridad para comprobar qué jugadores tienen un "turno" aún disponible
    const turnoEnAlgunEquipo = algunoTieneTurno();
    const listaDeJugadoresConTurnoA = `${turnoEnAlgunEquipo[0]}`;
    const listaDeJugadoresConTurnoB = `${turnoEnAlgunEquipo[1]}`;
    //Pido que el defensor, en este caso "B", elija con qué jugador con "turno" disponible quiere jugar
    if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "A")) {
        defensorQueRealizaUnaAccion = prompt(`Los jugadores de equipo B con turno son ${listaDeJugadoresConTurnoB}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "B2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(defensorQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = (defensorQueRealizaUnaAccion.charAt(0));
        if ((defensorQueRealizaUnaAccion.length != 2) || (listaJugadoresB[ultimaLetraPrompt-1] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "B") {
            return "Su equipo es el B, cargue bien el dato por favor";
        }
        else if (listaJugadoresB[ultimaLetraPrompt-1].turnoUsado == true){
            return `Este jugador no cuenta con más "turnos" en este "instante"`;
        }
        //Respuesta jugador seleccionado
        else {
            return defensorQueRealizaUnaAccion;
        }
    }
    //Pido que el defensor, en este caso "A", elija con qué jugador con "turno" disponible quiere jugar
    else if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "B")) {
        defensorQueRealizaUnaAccion = prompt(`Los jugadores de equipo A con turno son ${listaDeJugadoresConTurnoA}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "A2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(defensorQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = defensorQueRealizaUnaAccion.charAt(0);
        if ((defensorQueRealizaUnaAccion.length != 2) || (listaJugadoresA[ultimaLetraPrompt-1] == undefined)){
            return "Dato mal escrito";
        }
        else if (primeraLetraPrompt != "A") {
            return "Su equipo es el A, cargue bien el dato por favor";
        }
        else if (listaJugadoresA[ultimaLetraPrompt-1].turnoUsado == true){
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
}*/
/*const herramientaParaElegirJugadorAtacante = ()=>{
    let atacanteQueRealizaUnaAccion;
    alert(`Ahora es turno del equipo ${queEquipoAtaca()} de que elija con qué jugador va a realizar una acción`);
    //Utilizo función creada con anterioridad para comprobar qué jugadores tienen un "turno" aún disponible
    const turnoEnAlgunEquipo = algunoTieneTurno();
    const listaDeJugadoresConTurnoA = `${turnoEnAlgunEquipo[0]}`;
    const listaDeJugadoresConTurnoB = `${turnoEnAlgunEquipo[1]}`;
    //Pido que el atacante, en este caso "A", elija con qué jugador con "turno" disponible quiere jugar
    if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "A")) {
        atacanteQueRealizaUnaAccion = prompt(`Los jugadores de equipo A con turno son ${listaDeJugadoresConTurnoA}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "A2")`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(atacanteQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = atacanteQueRealizaUnaAccion.charAt(0);
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
    //Pido que el atacante, en este caso "B", elija con qué jugador con "turno" disponible quiere jugar
    else if ((turnoEnAlgunEquipo != undefined) && (queEquipoAtaca() == "B")) {
        atacanteQueRealizaUnaAccion = prompt(`Los jugadores de equipo B con turno son ${listaDeJugadoresConTurnoB}. Por favor seleccione a alguno intoduciendo la letra del equipo y el número que tiene asignado como jugador (ej. "B2").`).toUpperCase();
        //Respuestas a posibles errores
        let ultimaLetraPrompt = Number(atacanteQueRealizaUnaAccion.slice(-1));
        let primeraLetraPrompt = atacanteQueRealizaUnaAccion.charAt(0);
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
    //Respuesta por si ningún equipo tiene "turnos" disponibles
    else {
        return "A ningún jugador de tu equipo le queda turno en este instante";
    }
}*/

/*Creo funciones que pide al coach que corresponda que seleccione con quién va a realizar su próxima acción
const coachDefensorEligeJugador = ()=>{
    //Utilizando funciones previas indico si el "coach" ingresó bien la data pedida
    while (true){
        //Si la info fué mal cargada va a continuar en búcle pidiendo la info y respondiendo que fué mal cargada
        let respuestaSeleccionJugadorEquipoDefensor = herramientaParaElegirJugadorDefensor();
        if ((respuestaSeleccionJugadorEquipoDefensor == "Dato mal escrito") || (respuestaSeleccionJugadorEquipoDefensor == "Su equipo es el A, cargue bien el dato por favor") || (respuestaSeleccionJugadorEquipoDefensor == `Este jugador no cuenta con más "turnos" en este "instante"`) || (respuestaSeleccionJugadorEquipoDefensor == "Su equipo es el B, cargue bien el dato por favor")){
            alert(respuestaSeleccionJugadorEquipoDefensor);
            alert("Por favor cargue de nuevo el dato pedido");
        }
        //Si la info fué cargada de forma correcta respondo cuál fué el jugador elegido y corto el bucle
        else {
            alert(`El jugador elegido por el coach defensor para actuar en este turno es el ${respuestaSeleccionJugadorEquipoDefensor}`);
            return respuestaSeleccionJugadorEquipoDefensor
        }
    }
}
const coachAtacanteEligeJugador = ()=>{
    //Utilizando funciones previas indico si el "coach" ingresó bien la data pedida
    while (true){
        //Si la info fué mal cargada va a continuar en búcle pidiendo la info y respondiendo que fué mal cargada
        let respuestaSeleccionJugadorEquipoAtacante = herramientaParaElegirJugadorAtacante();
        if ((respuestaSeleccionJugadorEquipoAtacante == "Dato mal escrito") || (respuestaSeleccionJugadorEquipoAtacante == "Su equipo es el A, cargue bien el dato por favor") || (respuestaSeleccionJugadorEquipoAtacante == `Este jugador no cuenta con más "turnos" en este "instante"`) || (respuestaSeleccionJugadorEquipoAtacante == "Su equipo es el B, cargue bien el dato por favor")){
            alert(respuestaSeleccionJugadorEquipoAtacante);
            alert("Por favor cargue de nuevo el dato pedido");
        }
        //Si la info fué cargada de forma correcta respondo cuál fué el jugador elegido y corto el bucle
        else {
            alert(`El jugador elegido por el coach atacante para actuar en este turno es el ${respuestaSeleccionJugadorEquipoAtacante}`);
            return respuestaSeleccionJugadorEquipoAtacante
        }
    }
}*/

/*Creo función para que el coach elija la acción que va a realizar
const accionARealizarDefensa = (p)=> {
    let coachElijeAccion = "";//Esto queda vacío para que se inicie el búcle        
    while ((coachElijeAccion != "MOVERSE") && (coachElijeAccion != "INTENTAR UN ROBO AL PORTADOR DE LA PELOTA") && (coachElijeAccion != "INTENTAR INTERCEPTAR PASE") && (coachElijeAccion != "ESPERA ATOSIGANTE") && (coachElijeAccion != "ESPERA CAUTELOSA")) {
        //El búcle pide respuesta de los usuarios
        coachElijeAccion = prompt(p).toUpperCase();
        //Corrobora si la respuesta fue cargada de forma correcta
        if ((coachElijeAccion != "MOVERSE") && (coachElijeAccion != "INTENTAR UN ROBO AL PORTADOR DE LA PELOTA") && (coachElijeAccion != "INTENTAR INTERCEPTAR PASE") && (coachElijeAccion != "ESPERA ATOSIGANTE") && (coachElijeAccion != "ESPERA CAUTELOSA")) {
            alert(`Por favor escriba una acción defensiva de las presentadas para responder a la pregunta`);
        }
        else {
            //Devuelve valor correcto cortando el búcle
            return coachElijeAccion;
        }
    }
}
const turnoJugadorDefensor = (jugador)=>{
    
    if (queEquipoAtaca() == "A") {
        while (listaJugadoresB[Number(jugador.slice(-1)-1)][puntosDeAccion] > 0){
            //Redacto la pregunta que será realizada a los usuarios al correrse "accionARealizarDefensa()"
            let primeraPregunta = `Qué acción defensiva desea realizar? (Dispone de ${listaJugadoresB[Number(jugador.slice(-1)-1)][puntosDeAccion]} pts este turno) (Moverse / Intentar un robo al portador de la pelota / Intentar interceptar pase / Espera atosigante / Espera cautelosa)`;
            //Realizo la pregunta al usuario pasandolo por mi corroborador de escritura
            let queHaceElDefensor = accionARealizarDefensa(primeraPregunta);
            //Respondo en función de lo que decide
            if (queHaceElDefensor == "MOVERSE") {
                    
                }
            }
    }
}*/































/*verJugadores();
    let jugadorDefensorElegido = coachDefensorEligeJugador();
    turnoJugadorDefensor(jugadorDefensorElegido);
    verJugadores();
    let jugadorAtacanteElegido = coachAtacanteEligeJugador();*/
