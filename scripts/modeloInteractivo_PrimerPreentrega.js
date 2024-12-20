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

        const communities = [
            [1, "Andalucía", 0.08],
            [2, "Aragón", 0.08],
            [3, "Asturias", 0.08],
            [4, "Baleares", 0.08],
            [5, "Canarias", 0.065],
            [6, "Cantabria", 0.10],
            [7, "Castilla - La Mancha", 0.09],
            [8, "Castilla León", 0.08],
            [9, "Cataluña", 0.10],
            [10, "Ceuta", 0.06],
            [11, "Comunidad de Madrid", 0.06],
            [12, "Comunidad Valenciana", 0.10],
            [13, "Extremadura", 0.08],
            [14, "Galicia", 0.10],
            [15, "La Rioja", 0.07],
            [16, "Melilla", 0.06],
            [17, "Murcia", 0.08],
            [18, "Navarra", 0.06],
            [19, "País Vasco", 0.04]
        ];
    
        let selectedCommunity;
        do {
            //Muestra la lista de comunidades al usuario
            const userSelection = prompt(
                "Seleccione la comunidad autónoma del inmueble:\n" +
                communities.map(([id, name, itp]) => `${id}. ${name} - ITP ${(itp * 100).toFixed(2)}%`).join("\n")
            );
    
            // Buscar el valor ingresado  por el usuario en la lista de comunidades
            selectedCommunity = communities.find(([id]) => id === parseInt(userSelection));
        
            if (!selectedCommunity) { // Si no lo encuentra entra en este if
                alert("Opción no válida. Por favor, elija un número de la lista.");
            }
        } while (!selectedCommunity);
    
        // Asignar los valores finales al objeto operation
        const [id, name, itp] = selectedCommunity;
        this.community = name;
        this.setITP(itp);
    
        console.log("selected community: "+name+" ITP:"+itp)
        alert(`Comunidad seleccionada: ${this.community}, ITP: ${itp * 100}%`);

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
    setBusinessModel() {    
        
        const businessModels = [
            [1, "Alquiler tradicional"],
            [2, "Alquiler por habitación"],
            [3, "Reforma y venta"]
        ];

        //Arma el mensaje para mostrar la lista de modelos de inversión al usuario
        let message = "Seleccione el tipo de operación:\n"+
        businessModels.map(([id, description]) => `${id}. ${description}`).join("\n")

        // Muestra la lista
        let businessModel = prompt(message);

        // Valida que sea un numero mayor a cero y menor al meximo de la lista
        while (isNaN(businessModel) || businessModel <= 0 || businessModel > businessModels.length) { 
            console.log("Entrada no válida");
            businessModel = prompt(`Debe ingresar un valor entre 1 y ${businessModels.length}:\n` + message)
        }

        // Asignar el modelo de negocio seleccionado
        const [id,] = businessModels.find(([id]) => id === parseInt(businessModel, 10))
        this.businessModel = id 

        console.log(`Selected businessModel: ${id}`);
    }


    setRentPrice(bussinessModel){

        switch(bussinessModel){
            case 1:
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
            
            case 2:
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
                    while(isNaN(auxRoomPrice) || auxRoomPrice <= 0) { 
                        
                        if(!isNaN(auxRoomPrice)) {
                            auxRoomPrice = prompt("Debe ingresar un valor numerico mayor a 0 para el precio de la habitacion N°" + (index+1) +".")
                            console.log("roomsQuantity is void or not a number")
                        }else{
                            auxRoomPrice = prompt("Debe ingresar un valor numerico para el precio de la habitacion N°" + (index+1) +".")
                            console.log("roomsQuantity is negative number or 0")
                        }
                    }
                    //Agrega el precio valido a la lista de precios
                    roomsPrices.push(auxRoomPrice)
                    console.log(roomsPrices)
                }

                //Define le lista de precios en la instancia del objeto operation
                this.roomsPrices = roomsPrices
                break;
                
            case 3:
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
                console.log(`businessModel not valid. Value:${bussinessModel}`);
            }
    }

    generateReportData(){
        //let grossReturn, netReturn, taxes, finalPrice, cashflow, businessModel = this.businessModel;

        let result = [];

        switch(this.businessModel){
            case 1:
                result = this.generateReportDataTraditional();
            break;

            case 2:
                result= this.generateReportDataRooms();
            break;

            case 3:   
                result= this.generateReportDataSell();
            break;

            default:
                console.log("businessModel not valid.");
        }

        console.log("Resultado del cálculo:", result);
        
        return result;
    }

    generateReportDataRooms(){
        const roomPricesSum = this.roomsPrices.reduce((total,price) => Number(total)+Number(price),0)
        console.log(roomPricesSum)
        let grossReturn= (roomPricesSum*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
        let taxes = (roomPricesSum*0.3) //30% = aproximación a groso modo. En proximas entregas se va a trabajar mas fino en esta parte.
        let netReturn=((roomPricesSum - taxes)*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
        let finalPrice =((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) 
        let cashflow =(roomPricesSum - taxes)

        return [grossReturn,netReturn,taxes,finalPrice,cashflow, this.businessModel]
    }

    generateReportDataTraditional(){
        let grossReturn= (this.traditionalRentPrice*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) // memo: Number(variable) le defino que lo que estoy operando es si o si un numero. Sin esto los numeros se me rompen.
        let taxes = (this.traditionalRentPrice*0.3) //30% = aproximación a groso modo. En proximas entregas se va a trabajar mas fino en esta parte.
        let netReturn=((this.traditionalRentPrice - taxes)*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
        let finalPrice =((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) 
        let cashflow =(this.traditionalRentPrice - taxes)

        return [grossReturn,netReturn,taxes,finalPrice,cashflow, this.businessModel]
    }
    generateReportDataSell(){
        let grossReturn= (this.sellPrice)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))-1
        let taxes = (this.sellPrice*0.15) //15% = aproximación a groso modo. En proximas entregas se va a trabajar mas fino en esta parte.
        let netReturn=(this.sellPrice - taxes)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))-1
        let finalPrice =((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)).toFixed(2)

        return [grossReturn,netReturn,taxes,finalPrice,0, this.businessModel]
    }

    getTotalCost(){
        let result = this.price*(1+this.communityITP)+this.reformationPrice+this.commissions
        return result
    }
    
}

class Mortgage{
    constructor(basePrice,rate,duration,mensualRate) {
        this.basePrice= basePrice,
        this.rate= rate,
        this.duration= duration
        this.mensualRate = mensualRate
    }

    DefineMensualRate(rate){
        this.mensualRate = rate/12
    }
    
    DefineTotalCost() {
        // Q total de pagos
        let paymentsQuantity = this.duration * 12;

        //Calculamos la tasa mensual en formato 0.01 = 1%
        let mensualRate = this.mensualRate/100

        // calculo del pago mensual nominal
        let mensualPaymentAmount = this.basePrice * (mensualRate * Math.pow(1 + mensualRate, paymentsQuantity))/
                                            (Math.pow(1 + mensualRate, paymentsQuantity) - 1);
    
        
        let totalCost = mensualPaymentAmount * paymentsQuantity;
    
        return totalCost.toFixed(2); 
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
            (2)
        if(bussinessModel != 3){
            alertMessage += "\nAproximación de cashflow mensual: €"+ Number(cashflow).toFixed(2) +
                            "\nAproximación de impuestos a pagar mensual: €"+ Number(taxes).toFixed(2)
        }else{
            alertMessage += "\nAproximación de impuestos a pagar: €"+ Number(taxes).toFixed(2)
        }

        alert(alertMessage)
    }
}
 


//Se crea el objeto reporte
const report = new ResultsReport()

//Se crea el objeto de la operación y se relaciona con el reporte
const operation = new Operation()

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
const operationMortgage = new Mortgage()
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
    //Se define el monto a cobrir por la hipoteca. //TODO: Hay que desarrollar la opción de poner un porcentaje o monto y no el total.
    operationMortgage.basePrice = operation.price

    //Se define la duración
    operationMortgage.setDuration()

    //Define las tasas de interes
    operationMortgage.setRate()

    //Creo la relación entre el objeto de la hipoteca y la operación
    operation.mortgage = operationMortgage

    console.log(mortgage.DefineTotalCost)
    console.log(operationMortgage)
    console.log(operation.mortgage)
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

//Genero los datos data del reporte y lo guardo en una variable para desestructurarlos. Por ultimo muestro el reporte
let reportData = operation.generateReportData();

console.log(reportData)
report.getReport(reportData[0], reportData[1], reportData[2], reportData[3], reportData[4], reportData[5]);

alert("Hasta aca llega la segunda entrega.. Me falta algunos conocimiento del uso de formulas matematicas en javascript para poder hacer los calculos de hipotecas")
alert("Voy a dejar en el README del proyecto el alcance que tengo previsto!")