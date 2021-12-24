//Hago una valoración respecto a la cantidad de tiros que tomó en relación al porcentaje de tiro (el famoso crítico porque puede jaja)

//Inserto los datos
let triplesEncestados;
let porcentajeDeTriples;
let triplesIntentados = Number(prompt('Con números, ingrese cantidad de triples intentados'));
console.log (triplesIntentados);

//Corroboro que haya introducido un número y no letras
if (isNaN(triplesIntentados)==true) {
    alert ("Datos mal cargados");
    console.log ("Datos mal cargados");
}

//Primera valoración
else if(triplesIntentados==0) {
    alert ("Pudo haber probado cómo estaba su mano");
    console.log ("Pudo haber probado cómo estaba su mano");
}

//Habilito el segundo prompt para que ingresen la cantidad de triples encestados
else {
    triplesEncestados = Number(prompt('Con números, ingrese cantidad de triples encestados'));
    console.log (triplesEncestados);

    //muestro la información
    console.log (triplesEncestados + '/' + triplesIntentados);
    console.log ('=');

    //Calculo el porcentaje
    porcentajeDeTriples = (triplesEncestados / triplesIntentados) * 100;
    
    //muestro la información
    console.log ('%' + porcentajeDeTriples);

    //Más valoraciones
    if (porcentajeDeTriples>100) {
        alert ("Datos mal cargados");
        console.log ("Datos mal cargados");
    }    
    else if ((triplesIntentados==1) && (porcentajeDeTriples==100)) {
        alert ("Arrancó bien, tal vez debió tirar más");
        console.log ("Arrancó bien, tal vez debió tirar más");
    }
    else if ((triplesIntentados==1) && (porcentajeDeTriples==0)) {
        alert ("No arrancó bien pero tal vez pudo probar alguno más");
        console.log ("No arrancó bien pero tal vez pudo probar alguno más");
    }
    else if ((1<triplesIntentados) && (triplesIntentados<=3) && (33<porcentajeDeTriples<=50)) {
        alert ("Arrancó excelente, debió tirar más");
        console.log ("Arrancó excelente, debió tirar más");
    }
    else if ((1<triplesIntentados) && (triplesIntentados<=3) && (porcentajeDeTriples==33)) {
        alert ("Está bien, puede intentar algún tiro más");
        console.log ("Está bien, puede intentar algún tiro más");
    }
    else if ((1<triplesIntentados) && (triplesIntentados<=3) && (porcentajeDeTriples==0)) {
        alert ("Tal vez no debió tirar");
        console.log ("Tal vez no debió tirar");
    }
    else if ((3<triplesIntentados) && (43<=porcentajeDeTriples) && (porcentajeDeTriples<=100)) {        
            alert ("Estaba on fire");
            console.log ("Estaba on fire");
    }
    else if ((3<triplesIntentados) && (38<=porcentajeDeTriples) && (porcentajeDeTriples<=42)) {
            alert ("Pudo tirar más pero fué correcto");
            console.log ("Pudo tirar más pero fué correcto");
    }
    else if ((3<triplesIntentados) && (35<=porcentajeDeTriples) && (porcentajeDeTriples<=37)) {
            alert ("Fué correcto");
            console.log ("Fué correcto");
    }
    else if ((3<triplesIntentados) && (30<=porcentajeDeTriples) && (porcentajeDeTriples<=34)) {
            alert ("Tal vez convenía que tirase un poco menos");
            console.log ("Tal vez convenía que tirase un poco menos");
    }
    else if ((3<triplesIntentados) && (0<porcentajeDeTriples) && (porcentajeDeTriples<=29)) {
            alert ("Debió haber tirado menos");
            console.log ("Debió haber tirado menos");
    }
    else if ((2<triplesIntentados) && (porcentajeDeTriples==0)) {
        alert ("Definitivamente no debió tirar");
        console.log ("Definitivamente no debió tirar");
    }
    else {
        alert ("Datos mal cargados");
        console.log ("Datos mal cargados");
    }
}