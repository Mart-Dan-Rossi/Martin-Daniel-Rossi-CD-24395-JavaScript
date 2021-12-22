//Inserto los datos
let triplesEncestados = prompt ('Con números, ingrese cantidad de triples encestados');

let triplesIntentados = prompt ('Con números, ingrese cantidad de triples intentados');

//muestro la información
console.log (triplesEncestados + '/' + triplesIntentados);
console.log ('=');

//Calculo el porcentaje
let porcentajeDeTriples = (triplesEncestados / triplesIntentados) * 100;

//muestro la información
console.log ('%' + porcentajeDeTriples);

//Alerta
alert ('%' + porcentajeDeTriples);