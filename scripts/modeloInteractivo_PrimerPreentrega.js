class Operation{
    contructor(price, mortgage,community,communityITP,reformationPrice,commissions,businessModel,traditionalRentPrice,roomsPrices,sellPrice){
    this.price =price
    this.mortgage=mortgage
    this.community=community
    this.communityITP=communityITP
    this.reformationPrice=reformationPrice
    this.commissions=commissions
    this.businessModel=businessModel
    this.traditionalRentPrice=traditionalRentPrice
    this.roomsPrices=roomsPrices
    this.sellPrice=sellPrice
    }

    setPrice(){
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

    this.price = price
    }

//TODO: Convertir esto en una array const y recorrerlo en el prompt
    setCommunity(){
        do {
            let community = prompt("Seleccione la comunidad autónoma del inmueble:\n" +
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
                "19. Pais Vasco - ITP 4.0%")
        
            switch (community) {
                    case "1":
                        this.community= "Andalucia"
                        this.setITP(0.08); 
                        break;
                    case "2":
                        this.community= "Aragon"
                        this.setITP(0.08); 
                        break;
                    case "3":
                        this.community= "Asturias"
                        this.setITP(0.08); 
                        break;
                    case "4":
                        this.community= "Baleares"
                        this.setITP(0.08); 
                        break;
                    case "5":
                        this.community= "Canarias"
                        this.setITP(0.065); 
                        break;
                    case "6":
                        this.community= "Cantabria"
                        this.setITP(0.10); 
                        break;
                    case "7":
                        this.community= "Castilla - La Mancha"
                        this.setITP(0.09); 
                        break;
                    case "8":
                        this.community= "Castilla Leon"
                        this.setITP(0.08); 
                        break;
                    case "9":
                        this.community= "Catalunia"
                        this.setITP(0.10); 
                        break;
                    case "10":
                        this.community= "Ceuta"
                        this.setITP(0.06); 
                        break;
                    case "11":
                        this.community= "Comunidad de Madrid"
                        this.setITP(0.06); 
                        break;
                    case "12":
                        this.community= "Comunidad Valenciana"
                        this.setITP(0.10); 
                        break;
                    case "13":
                        this.community= "Extremadura"
                        this.setITP(0.08); 
                        break;
                    case "14":
                        this.community= "Galicia"
                        this.setITP(0.10); 
                        break;
                    case "15":
                        this.community= "La Rioja"
                        this.setITP(0.07); 
                        break;
                    case "16":
                        this.community= "Melilla"
                        this.setITP(0.06); 
                        break;
                    case "17":
                        this.community= "Murcia"
                        this.setITP(0.08); 
                        break;
                    case "18":
                        this.community= "Navarra"
                        this.setITP(0.06); 
                        break;
                    case "19":
                        this.community= "Pais Vasco"
                        this.setITP(0.04); 
                        break;
                default:
                    community = -1; 
                    alert("Opción no válida.");
            }
        } while (community==-1);
        
        
    }

    setITP(itp){
        this.communityITP=itp
    }

    informPriceITP(){
        alert("El precio de compra + impuestos es: €"+(this.price*(1+this.communityITP)).toFixed(2))
    }

    setReformationPrice(){
        let reformation = prompt("¿Cual es el monto estimado a gastar en reformas del inmueble?")

        while(isNaN(reformation)) { 
            reformation = prompt("Debe ingresar un valor numerico para el monto estimado a gastar en reformas.")
            console.log("reformation is not a number")
        }
        if(reformation===""){
            this.reformationPrice=0}
        else(
            this.reformationPrice=reformation
        )


    }

    setCommissions(){
        let commissions = prompt("¿Cual es el monto de comisiones a pagar por la operación?")

        while(isNaN(commissions)) {
            commissions = prompt("Debe ingresar un valor numerico para el monto de comisiones a pagar.")
            console.log("commissions is not a number")
        }
        if(commissions===""){
            this.commissions=0
        }else{
            this.commissions=commissions
        }
    }

//TODO: Convertir esto en una array const y recorrerlo en el prompt
    setBusinessModel(){    
        //Se define el tipo de operación a utilizar en los calculos
        let businessModel= prompt("Seleccione el tipo de operación:\n" +
            "1. Alquiler tradicional\n" +
            "2. Alquiler por habitacion\n" +
            "3. Reforma y venta\n")

        while(isNaN(businessModel) || businessModel <= 0 || businessModel >=4) { 

            if(!isNaN(businessModel)) {
                businessModel = prompt("Debe ingresar un valor valor mayor entre 1 y 3 para identificar el tipo de operación:\n" +
                                        "1. Alquiler tradicional\n" +
                                        "2. Alquiler por habitacion\n" +
                                        "3. Reforma y venta\n")
                console.log("businessModel is void or not a number")
            }else{
                businessModel = prompt("Debe ingresar un valor mayor entre 1 y 3 para identificar el tipo de operación:\n" +
                                        "1. Alquiler tradicional\n" +
                                        "2. Alquiler por habitacion\n" +
                                        "3. Reforma y venta\n")
                console.log("businessModel is negative number or 0")
            }
        }
        this.businessModel=businessModel
    }

    setRentPrice(bussinessModel){

        switch(bussinessModel){
            case "1":
                //Define el valor del alquiler tradicional
                let traditionalRentPrice = prompt("Ingrese el precio de alquiler:")

                while(isNaN(traditionalRentPrice) || traditionalRentPrice <= 0) { 
            
                    if(!isNaN(traditionalRentPrice)) {
                        traditionalRentPrice = prompt("Debe ingresar un valor numerico para el precio de alquiler del inmueble.")
                        console.log("price is void or not a number")
                    }else{
                        traditionalRentPrice = prompt("Debe ingresar un precio de alquiler para el inmueble.")
                        console.log("price is negative number or 0")
                    }10000
                }
                this.traditionalRentPrice=traditionalRentPrice
                break;
            
            case "2":
                //Define el comportamiento del alquiler por habitaciones
                const roomsPrices = []

                let roomsQuantity = prompt("Ingrese la cantidad de las habitaciones")

                //Define la cantidadde habitaciones
                while(isNaN(roomsQuantity) || roomsQuantity <= 0) { 
            
                    if(!isNaN(roomsQuantity)) {
                        roomsQuantity = prompt("Debe ingresar un valor numerico para la cantidad de habitaciones.")
                        console.log("roomsQuantity is void or not a number")
                    }else{
                        roomsQuantity = prompt("Debe ingresar un valor numerico la cantidad de habitaciones.")
                        console.log("roomsQuantity is negative number or 0")
                    }
                }
                
                //Define el precio de cada habitacion
                for (let index = 0; index < roomsQuantity; index++) {
                    let auxRoomPrice =  prompt("Ingrese el precio de la habitacion N°"+(index+1))

                    //Verifica que el precio sea valido
                    if(!isNaN(auxRoomPrice)) {
                        auxRoomPrice = prompt("Debe ingresar un valor numerico para el precio de la habitacion N°" + (index+1) +".")
                        console.log("roomsQuantity is void or not a number")
                    }else{
                        auxRoomPrice = prompt("Debe ingresar un valor numerico para el precio de la habitacion N°" + (index+1) +".")
                        console.log("roomsQuantity is negative number or 0")
                    }

                    //Agrega el precio valido a la lista de precios
                    roomsPrices.push(auxRoomPrice)
                    console.log(roomsPrices)
                }

                //Define le lista de precios en la instancia del objeto operation
                this.roomsPrices = roomsPrices
                break;
                
            case "3":
                //Define el comportamiento por reforma y venta
                let sellPrice = prompt("Ingrese el precio de venta:") 

                while(isNaN(sellPrice) || sellPrice <= 0) { 
            
                    if(!isNaN(sellPrice)) {
                        sellPrice = prompt("Debe ingresar un valor numerico para el precio de venta del inmueble.")
                        console.log("price is void or not a number")
                    }else{
                        sellPrice = prompt("Debe ingresar un precio de venta para el inmueble.")
                        console.log("price is negative number or 0")
                    }
                }
                this.sellPrice=sellPrice
                break;

            default:
                alert("Modelo de negocio no reconocido")
                console.log("businessModel not valid.");
            }
    }

    generateReportData(){
        let grossReturn
        let netReturn
        let taxes
        let finalPrice
        let cashflow

        switch(this.businessModel){
            case "1":
                //Define el comportamiento por alquiler tradicional
                grossReturn= (this.traditionalRentPrice*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) // memo: Number(variable) le defino que lo que estoy operando es si o si un numero. Sin esto los numeros se me rompen.
                taxes = (this.traditionalRentPrice*0.3)
                netReturn=((this.traditionalRentPrice - taxes)*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
                finalPrice =((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) 
                cashflow =(this.traditionalRentPrice - taxes)
            break;

            case "2":
                grossReturn= (this.traditionalRentPrice*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
                taxes = (this.traditionalRentPrice*0.3) //30% = aproximación a groso modo. En proximas entregas se va a trabajar mas fino en esta parte.
                netReturn=((this.traditionalRentPrice - taxes)*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
                finalPrice =(price+Number(this.reformationPrice)+Number(this.commissions)) 
                cashflow =(this.traditionalRentPrice - taxes)

                break;
            case "3":
                
                
                grossReturn= (this.sellPrice)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))-1
                taxes = (this.sellPrice*0.15) //15% = aproximación a groso modo. En proximas entregas se va a trabajar mas fino en esta parte.
                netReturn=(this.sellPrice - taxes)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))-1
                finalPrice =((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) 

                break;
            default:
                console.log("businessModel not valid.");
        }
        return {
            grossReturn: grossReturn,
            netReturn: netReturn,
            taxes: taxes,
            finalPrice: finalPrice,
            cashflow: cashflow,
            businessModel: this.businessModel
        };
    }

    
}


class Mortgage{
    constructor(basePrice,rate,duration,mensualRate) {
        this.basePrice= basePrice,
        this.rate= rate,
        this.duration= duration
        this.mensualRate = this.DefineMensualRate(rate)
    }

    DefineMensualRate(rate){
        this.mensualRate = rate/12
    }

    setDuration(){
        let mortgageDuration = prompt("¿Cuantos años durará la hipoteca?")

        while(isNaN(mortgageDuration) || mortgageDuration <= 0) { 

            if(!isNaN(mortgageDuration)) {
                mortgageDuration = prompt("Debe ingresar un valor numerico para la cantidad de años de la hipoteca.")
                console.log("mortgageDuration is void or not a number")
            }else{
                mortgageDuration = prompt("Debe ingresar una cantidad de años mayor a 0 para la hipoteca.")
                console.log("mortgage is true but mortgageDuration is negative number or 0")
            }
        }
        this.duration = mortgageDuration
    }

    setRate(){
        let mortgageRate = prompt("¿Cual es el interes anual de la hipoteca?")    
        while(isNaN(mortgageRate) || mortgageRate <= 0) { 
    
            if(!isNaN(mortgageRate)) {
                mortgageRate = prompt("Debe ingresar un valor numerico para la tasa de interes de la hipoteca.")
                console.log("mortgageRate is void or not a number")
            }else{
                mortgageRate = prompt("Debe ingresar una tasa de interes mayor a 0 para la hipoteca.")
                console.log("mortgage is true but mortgageRate is negative number or 0")
            }
        }
        this.rate=mortgageRate;
        this.DefineMensualRate(mortgageRate);
    }

}

class ResultsReport{
    constructor(operation){
        this.operation = operation
    }
    
    getReport(grossReturn,netReturn,taxes,finalPrice,cashflow,bussinessModel){
        let alertMessage=""

        alertMessage= "Información de la operación:\n"+
            "Rentabilidad Bruta: "+ (grossReturn*100).toFixed(2)  + " %" +
            "\nRentabilidad Neta: "+ (netReturn*100).toFixed(2)  + " %" +
            "\nPrecio final de compra: €"+Number(finalPrice).toFixed(2) +
            "\nAproximación de impuestos a pagar mensual: €"+ Number(taxes).toFixed(2)
        if(bussinessModel != 3)
            alertMessage += "\nAproximación de cashflow mensual: €"+ Number(cashflow).toFixed(2)

        alert(alertMessage)
    }
}


let community;
let ITP;
let reformation;
let mortgageDuration;
//let mortgage;
let mortgageRate;
//let mortgageMensualRate;
let commissions;
let businessModel
let traditionalRentPrice
let sellPrice

//utilizadas para el informe final
let grossReturn
let netReturn
let finalPrice
let taxes
let cashflow 

//Se crea el objeto reporte
let report = new ResultsReport()

//Se crea el objeto de la operación y se relaciona con el reporte
let operation = new Operation()

report.operation = operation

//Se define el precio de compra
operation.setPrice()

//Se define la comunidad autonoma del inmueble y el valor de su ITP
operation.setCommunity()

//Envio un alter informando el  precio considerando el ITP de la comunidad seleccionada
operation.informPriceITP()

//Se define el costo de reforma
operation.setReformationPrice()

//Se define comissiones (notaria, inmobiliaria, etc) Solo el total por el momento.
operation.setCommissions()

console.log(operation);

//Se define el objeto de la hipoteca que luego se enviará a la operación
let operationMortgage = new Mortgage()
//Se define las caracterisiticas de la hipoteca, aun falta considerar el porcentaje de financiación.
let mortgage = prompt("¿Utilizará hipoteca? Responder con la palabra 'Si' o 'No'")

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
    //Se define la duración
    operationMortgage.setDuration()

    //Define las tasas de interes
    operationMortgage.setRate()

    //Creo la relación entre el objeto de la hipoteca y la operación
    operation.mortgage = operationMortgage
}
else{

    //Si no se usa hipoteca, le doy valor false para usarlo en validaciones. 
    //TODO: Creo que deberia agregar un valor mas solo para definir esto y en todo caso dejar la hipoteca como null.
    operation.mortgage = false;
}

//Defino el modelo de inversión
operation.setBusinessModel();

//Defino los precios segun el modelo de inversión
operation.setRentPrice(operation.businessModel);

let reportData = operation.generateReportData();
report.getReport(reportData.grossReturn, reportData.netReturn, reportData.taxes, reportData.finalPrice, reportData.cashflow, reportData.businessModel);

alert("Hasta aca llega la segunda entrega.. Me falta algunos conocimiento del uso de formulas matematicas en javascript para poder hacer los calculos de hipotecas")
alert("Voy a dejar en el README del proyecto el alcance que tengo previsto!")