let community;
let ITP;
let reformation;
let mortgageDuration;
let mortgage;
let mortgageRate;
let mortgageMensualRate;
let commissions;

//Se define el precio de compra
let price = prompt("¡Hola! ¿Cual es el precio de compra el inmueble?")
while(isNaN(price) || price <= 0) { //memo: isNaN me devuelve true si price no es un numero, falso si si lo es. Como las validaciones con try parse de C#
    
    if(!isNaN(price)) {
        price = prompt("Debe ingresar un valor numerico para el precio de compra del inmueble.")
        console.log("price is void or not a number")
    }else{
        price = prompt("Debe ingresar un precio de compra para el inmueble.")
        console.log("price is negative number or 0")
    }
}


//Se define la comunidad autonoma del inmueble y el valor de su ITP
do {
    community = prompt("Seleccione la comunidad autónoma del inmueble:\n" +
        "1. Andalucía - ITP 8.0%\n" +
        "2. Aragón - ITP 8.0%\n" +
        "3. Asturias - ITP 8.0%\n" +
        "4. Baleares - ITP 8.0%\n" +
        "5. Canarias - ITP 6.5%\n" +
        "6. Cantabria - ITP 10.0%\n" +
        "7. Castilla - La Mancha - ITP 9.0%\n" +
        "8. Castilla León - ITP 8.0%\n" +
        "9. Cataluña - ITP 10.0%\n" +
        "10. Ceuta - ITP 6.0%\n" +
        "11. Comunidad de Madrid - ITP 6.0%\n" +
        "12. Comunidad Valenciana - ITP 10.0%\n" +
        "13. Extremadura - ITP 8.0%\n" +
        "14. Galicia - ITP 10.0%\n" +
        "15. La Rioja - ITP 7.0%\n" +
        "16. Melilla - ITP 6.0%\n" +
        "17. Murcia - ITP 8.0%\n" +
        "18. Navarra - ITP 6.0%\n" +
        "19. País Vasco - ITP 4.0%")

    switch (community) {
        case "1":
            ITP = 0.08; 
            break;
        case "2":
            ITP = 0.08; 
            break;
        case "3":
            ITP = 0.08;
            break;
        case "4":
            ITP = 0.08; 
            break;
        case "5":
            ITP = 0.065; 
            break;
        case "6":
            ITP = 0.10; 
            break;
        case "7":
            ITP = 0.09; 
            break;
        case "8":
            ITP = 0.08; 
            break;
        case "9":
            ITP = 0.10; 
            break;
        case "10":
            ITP = 0.06;
            break;
        case "11":
            ITP = 0.06; 
            break;
        case "12":
            ITP = 0.10; 
            break;
        case "13":
            ITP = 0.08; 
            break;
        case "14":
            ITP = 0.10; 
            break;
        case "15":
            ITP = 0.07; 
            break;
        case "16":
            ITP = 0.06; 
            break;
        case "17":
            ITP = 0.08; 
            break;
        case "18":
            ITP = 0.06; 
            break;
        case "19":
            ITP = 0.04; 
            break;
        default:
            ITP = -1; 
            alert("Opción no válida.");
    }
} while (ITP==-1);

price = price*(1+ITP)
alert("El precio de compra + impuestos es: €"+price)

//Se define costo de reforma
reformation = prompt("¿Cual es el monto estimado a gastar en reformas del inmueble?")

while(isNaN(reformation)) { 
    reformation = prompt("Debe ingresar un valor numerico para el monto estimado a gastar en reformas.")
    console.log("reformation is not a number")
}

//Se define comissiones (notaria, inmobiliaria, etc) Solo el total por el momento.
commissions = prompt("¿Cual es el monto de comisiones a pagar por la operación?")

while(isNaN(commissions)) {
    commissions = prompt("Debe ingresar un valor numerico para el precio de compra del inmueble.")
    console.log("commissions is not a number")
}


//Se define las caracterisiticas de la hipoteca
mortgage = prompt("¿Utilizará hipoteca? Responder con la palabra 'Si' o 'No'")

while(!(mortgage.toLowerCase()=="si") && !(mortgage.toLowerCase()=="no")) {
    mortgage = prompt("¿Utilizará hipoteca? Debe responder con la palabra 'Si' o 'No'")
}

if(mortgage.toLowerCase()=="si")
{
    mortgage=true;
}else{
    mortgage=false;
}

if(mortgage)
{
    mortgageDuration = prompt("¿Cuantos años durará la hipoteca?")

    while(isNaN(mortgageDuration) || mortgageDuration <= 0) { 

        if(!isNaN(mortgageDuration)) {
            mortgageDuration = prompt("Debe ingresar un valor numerico para la cantidad de años de la hipoteca.")
            console.log("mortgageDuration is void or not a number")
        }else{
            mortgageDuration = prompt("Debe ingresar una cantidad de años mayor a 0 para la hipoteca.")
            console.log("mortgage is true but mortgageDuration is negative number or 0")
        }
    }

    mortgageRate = prompt("¿Cual es el interes anual de la hipoteca?")    
    while(isNaN(mortgageRate) || mortgageRate <= 0) { 

        if(!isNaN(mortgageRate)) {
            mortgageRate = prompt("Debe ingresar un valor numerico para la tasa de interes de la hipoteca.")
            console.log("mortgageRate is void or not a number")
        }else{
            mortgageRate = prompt("Debe ingresar una tasa de interes mayor a 0 para la hipoteca.")
            console.log("mortgage is true but mortgageRate is negative number or 0")
        }
    }
    
}else{
    mortgageDuration=0
}


alert("Hasta aca llega la primer entrega.. Me falta algunos conocimiento del uso de formulas matematicas en javascript para poder hacer los calculos de hipotecas")
alert("Creo que con lo que vamos a ir viendo en las clases que vienen me va a resultar mas facil y comodo desarrollar el resto de la app")
alert("Voy a dejar en el README del proyecto el alcance que tengo previsto!")