class Operation{
    constructor(price, mortgage,community,communityITP,reformationPrice,commissions,businessModel,rent){
    this.price =price
    this.mortgage=mortgage
    this.community=community
    this.communityITP=communityITP
    this.reformationPrice=reformationPrice
    this.commissions=commissions
    this.businessModel=businessModel
    this.rent=rent
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
        //TODO adaptar a la nueva logica
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
    constructor(basePrice,FinancingAmount,rate,duration,mensualRate) {
        this.basePrice= basePrice,
        this.FinancingAmount = FinancingAmount,
        this.rate= rate,
        this.duration= duration
        this.mensualRate = this.DefineMensualRate(this.rate)
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


}

class ResultsReport{
    constructor(operation){
        this.operation = operation
    }
    
    getReport(grossReturn,netReturn,taxes,finalPrice,cashflow,bussinessModel){

        //TODO mover esta funcion al front
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
//const operation = new Operation()

//report.operation = operation

//console.log(operation);

//Se define el objeto de la hipoteca que luego se enviará a la operación
//const operationMortgage = new Mortgage()


//Genero los datos data del reporte y lo guardo en una variable para desestructurarlos. Por ultimo muestro el reporte
//let reportData = operation.generateReportData();

//console.log(reportData)
//report.getReport(reportData[0], reportData[1], reportData[2], reportData[3], reportData[4], reportData[5]);



//PRE ENTREGA 3
//Procesamiento principal del formulario
let button = document.getElementById("btn-calcular");
button.addEventListener("click", ProcesarOperacion)
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
const businessModels = [
    [1, "Alquiler tradicional"],
    [2, "Alquiler por habitación"],
    [3, "Reforma y venta"]
];


function ProcesarOperacion(){
    //TODO Temporal
    console.log("PROCESAR OPERACIÓN")
    let formData= FormValidation();
    if(formData!=null)
    {

        const mortgage = new Mortgage(
        
            basePrice= formData[0],
            FinancingAmount = formData[4],
            rate= formData[5],
            duration= formData[7],         
        )
        mortgage.DefineMensualRate(formData[5])

            

        const operation = new Operation(
            price = formData[0],
            this.mortgage=mortgage,
            community = formData[1],
            communityITP = GetComunityITP(formData[1]),
            reformationPrice = formData[2],
            commissions = formData[3],
            businessModel = formData[6]
        );

        ;
        console.log(formData)
    }
}

function GetComunityITP(communityId)
{
    const [id, name, itp] = communities.find(([id]) => id === parseInt(communityId))
    return itp;
}

function FormValidation(){
    let errors =[];
    let values = [];
    let hasErrors = false;

    CleanFormError()

    values.push(document.getElementById("buyPrice").value)
    errors.push(PriceValidation(values[0],"precio de compra.",true))

    values.push(document.getElementById("communities").value)
    errors.push(CommunityValidation(values[1]))

    values.push(document.getElementById("reformationPrice").value)
    errors.push(PriceValidation(values[2],"costo de reforma.",false))
    
    values.push(document.getElementById("commissions").value)
    errors.push(PriceValidation(values[3],"costo de gestorias.",false))
    
    //values.push(document.getElementById("mortgagePercentage").value)
    //No lo veo necesario teniendo el amount

    values.push(document.getElementById("mortgageAmount").value)
    errors.push(mortgageAmountValidation(values[0], values[4],false))

    values.push(document.getElementById("rate").value)
    errors.push(PriceValidation(values[5],"tasa de interes de la hipoteca",false))

    values.push(document.getElementById("businessModel").value)
    errors.push(BusinessModelValidation(values[6]))

    values.push(document.getElementById("mortgageDuration").value)

    //Busca a todos los valores de renta. De esta manera se adapta a los diferentes formatos de bussinesModel
    document.querySelectorAll(".rent").forEach(item =>{
        values.push(item.value)
        errors.push(PriceValidation(values[values.length-1],"valor de alquiler",true))
    })
    
    errors.forEach(error =>{
        if(error!=null)
        {
            ShowFormError(error)
            hasErrors=true;
        }
    })

    if(hasErrors)
        return null;
    else
        return values
    
}

//Validación de datos
function PriceValidation(price,detail,obligatory){
    
    let error = null;  
    if(isNaN(price)) {
        error = "Debe ingresar un valor numerico para "+detail
        console.log("price is void or not a number")
        return error;
    }else if(price <=0){
        if(!obligatory && price ==0)
            return error

        error = "Debe ingresar un valor positivo para "+detail
        console.log("price is negative number or 0")
        return error;
    }
    return error;
}

function CommunityValidation(selectedCommunity){

    let error= null;
    
    selectedCommunity = communities.find(([id]) => id === parseInt(selectedCommunity));

    if (!selectedCommunity) { // Si no lo encuentra entra en este if
        error="Opción no válida. Por favor, elija una comunidad de la lista."
    }
    return error
}

function mortgageAmountValidation(price,mortgageAmount){
    let error = null; 

    if(isNaN(mortgageAmount)) {
        error = "Debe ingresar un valor numerico para el monto a financiar."
        console.log("mortgageAmount is void or not a number")
    }
    else if(Number(mortgageAmount)>Number(price)){
        error= "El monto a financiar no puede ser mayor que el precio total de compra."
        console.log("mortgageAmount is not valid.")
    } 
     else if(mortgageAmount <0){
         error = "Debe ingresar un valor positivo o 0 para el monto a financiar."
         console.log("mortgageAmount is negative number or 0")
     }
    //Podria existir la posibilidad de no financiar.
    return error;
}

function BusinessModelValidation(businessModel){
let error = null
    // Valida que sea un numero mayor a cero y menor al meximo de la lista
    while (isNaN(businessModel) || businessModel <= 0 || businessModel > businessModels.length) { 
        console.log("Entrada no válida");
        businessModel = prompt(`Debe ingresar un valor entre 1 y ${businessModels.length}`)
    }
return error
}

function CleanFormError(){
    const errorList = document.getElementById("errors-list");
    
    if(errorList.classList.contains("show"))
        errorList.classList.remove("show")

    errorList.innerHTML = ""
}
function ShowFormError(error){
    const errorList = document.getElementById("errors-list");
    
    if(!errorList.classList.contains("show"))
        errorList.classList.add("show")

    errorList.innerHTML += (`<li>${error}</li>`)
}

//Carga los datos en los selectores
LoadFormSelectors()

function LoadFormSelectors(){
    
    LoadComunitiesSelector();
    LoadBussinessModelSelector();
}

function LoadComunitiesSelector(){

    const communitiesSelector = document.getElementById("communities")
    communitiesSelector.innerHTML=""; //Limpio cualquier dato residuo hardcodeado en el HTML

    communities.forEach(community => {
        communitiesSelector.innerHTML += `<option value="${community[0]}">${community[1]} - ITP: ${(community[2]*100).toFixed(0)}% </option>`
    });
    

}


function LoadBussinessModelSelector(){
    

    const businessModel = document.getElementById("businessModel")
    businessModel.innerHTML=""; //Limpio cualquier dato residuo hardcodeado en el HTML

    businessModels.forEach(element => {
        businessModel.innerHTML += `<option value="${element[0]}">${element[1]}</option>`
    });
}


//Eventos de sincronización de rangos y montos de financiacion
//SynchronizeFinancing(document.getElementById("buyPrice".value)) //la llamada de elementebyid buyprce es temporal

const mortgageAmount = document.getElementById("mortgageAmount")
mortgageAmount.addEventListener("change", () => UpdateOnMortgageAmount(mortgageAmount.value, document.getElementById("buyPrice").value)) 

const mortgagePercentage = document.getElementById("mortgagePercentage")
mortgagePercentage.addEventListener("input", ()=>SynchronizeFinancing(document.getElementById("buyPrice").value))

function SynchronizeFinancing(price){
    let mortgagePercentage = document.getElementById("mortgagePercentage")
    let mortgagePercentageDetail = document.getElementById("mortgagePercentageDetail")
    let mortgageAmount = document.getElementById("mortgageAmount")

    mortgagePercentageDetail.innerText = parseFloat(mortgagePercentage.value).toFixed(0) +"%"
    mortgageAmount.value= Math.round(price*((mortgagePercentage.value)/100))
}

//Actualización de slider por ingreso de monto a financiar
function UpdateOnMortgageAmount(mortgageAmount,price){
    mortgageAmount = Number(mortgageAmount);
    price = Number(price);

    let mortgagePercentage = document.getElementById("mortgagePercentage")
    let mortgagePercentageDetail = document.getElementById("mortgagePercentageDetail")

    if(price!=0 && mortgageAmount!=0 && price>=mortgageAmount){
    mortgagePercentage.value = (mortgageAmount/price)*100
    mortgagePercentageDetail.innerText= (mortgageAmount/price)*100+"%"
    }
    else{
    mortgagePercentage.value = 0
    mortgagePercentageDetail.innerText= 0+"%"
    }

}


const mortgageDuration = document.getElementById("mortgageDuration")
mortgageDuration.addEventListener("input", ()=>UpdateOnMorgageDuration())


function UpdateOnMorgageDuration(){
   
    const mortgageDuration =document.getElementById("mortgageDuration")
    const mortgageDurationDetail=document.getElementById("mortgageDurationDetail")
    mortgageDurationDetail.innerText= `${mortgageDuration.value} años`

}


//Manejo de inputs de habitaciones
const selectedBusinessModel = document.getElementById("businessModel")
const buttonNewRoom = document.getElementById("new-rent-input-btn")
let roomsQuantity=1;

selectedBusinessModel.addEventListener("change",()=>RentTypeControl(selectedBusinessModel.value))
buttonNewRoom.addEventListener("click", ()=> AddNewRoom())


function RentTypeControl(value){
    
    if(value==1){
        document.getElementById("rent-label").textContent="Valor del alquiler"
        buttonNewRoom.classList.add("disabled")
        buttonNewRoom.classList.remove("show")
        DeleteAdditionalRooms()
    }else if(value==2 && !buttonNewRoom.classList.contains("show")){
        document.getElementById("rent-label").textContent="Valor de la habitación"
        buttonNewRoom.classList.remove("disabled")
        buttonNewRoom.classList.add("show")
    }else if(value=3){
        document.getElementById("rent-label").textContent="Valor de venta"
        buttonNewRoom.classList.add("disabled")
        buttonNewRoom.classList.remove("show")
        DeleteAdditionalRooms()
    }
}

function AddNewRoom(){
    const rentListContainer = document.getElementById("rent-container")
    roomsQuantity++
    rentListContainer.innerHTML += `
    <div class="mb-3 added-rent">  
        <label for="extra1" class="form-label rent-label added-rent">Valor de la habitación ${roomsQuantity}</label>
        <input type="text" class="form-control rent added-rent" id="rent${roomsQuantity}" placeholder="Ingrese monto">    
    </div>
    `
}

function DeleteAdditionalRooms(){
    const addedRooms=document.querySelectorAll(".added-rent")
        
    addedRooms.forEach(element =>{
        element.remove()
    })
    roomsQuantity=1;
}