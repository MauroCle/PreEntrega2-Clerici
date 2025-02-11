// import Swal from 'sweetalert2'

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
        debugger
        console.log(this.rent)
        let grossReturn= (this.rent*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
        let taxes = (this.rent*0.3) 
        let netReturn=((this.rent - taxes)*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
        let finalPrice = (Number(this.price) + (Number(this.mortgage.basePrice) * Number(this.communityITP)) + Number(this.reformationPrice) + Number(this.commissions))
        let cashflow =(this.rent - taxes - Number(this.mortgage.DefineMensualPaymentAmount()))

        return [grossReturn,netReturn,taxes,finalPrice,cashflow, this.businessModel]
    }

    generateReportDataTraditional(){
        
        let grossReturn= (this.rent*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions)) // memo: Number(variable) le defino que lo que estoy operando es si o si un numero. Sin esto los numeros se me rompen.
        let taxes = (this.rent*0.3) 
        let netReturn=((this.rent - taxes)*12)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))
        let finalPrice = (Number(this.price) + (Number(this.mortgage.basePrice) * Number(this.communityITP)) + Number(this.reformationPrice) + Number(this.commissions))
        let cashflow =(this.rent - taxes - Number(this.mortgage.DefineMensualPaymentAmount()))

        return [grossReturn,netReturn,taxes,finalPrice,cashflow, this.businessModel]
    }
    generateReportDataSell(){
        
        let grossReturn= (this.rent)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))-1
        let taxes = (this.rent*0.15) 
        let netReturn=(this.rent - taxes)/((this.price*(1+this.communityITP))+Number(this.reformationPrice)+Number(this.commissions))-1
        let finalPrice = (Number(this.price) + (Number(this.mortgage.basePrice) * Number(this.communityITP)) + Number(this.reformationPrice) + Number(this.commissions)).toFixed(2)

        return [grossReturn,netReturn,taxes,finalPrice,0, this.businessModel]
    }

    getTotalCost(){
        let result = this.price*(1+this.communityITP)+this.reformationPrice+this.commissions
        return result
    }
    
}

class Mortgage{
    constructor(basePrice,FinancingAmount,rate,duration,mensualRate,mensualPaymentAmount) {
        this.basePrice= basePrice,
        this.FinancingAmount = FinancingAmount,
        this.rate= rate,
        this.duration= duration,
        this.mensualRate = this.DefineMensualRate(this.rate),
        this.mensualPaymentAmount= this.DefineMensualPaymentAmount()
    }

    DefineMensualRate(rate){
        this.mensualRate = rate/12
    }
    DefineMensualPaymentAmount(){
        // Q total de pagos
        let paymentsQuantity = this.duration * 12;

        //Calculamos la tasa mensual en formato 0.01 = 1%
        let mensualRate = this.mensualRate/100

        // calculo del pago mensual nominal
        this.mensualPaymentAmount= this.FinancingAmount * (mensualRate * Math.pow(1 + mensualRate, paymentsQuantity))/
                                                  (Math.pow(1 + mensualRate, paymentsQuantity) - 1);
        return this.mensualPaymentAmount
    }
    
    DefineTotalCost() {
        
        // Q total de pagos
        let paymentsQuantity = this.duration * 12;

        //Calculamos la tasa mensual en formato 0.01 = 1%
        let mensualRate = this.mensualRate/100

        // calculo del pago mensual nominal
        let mensualPaymentAmount = this.DefineMensualPaymentAmount()
        
        let totalCost = mensualPaymentAmount * paymentsQuantity + (this.basePrice-this.FinancingAmount);
    
        return totalCost.toFixed(2); 
    }


}

class ResultsReport{
    constructor(operation){
        this.operation = operation
    }
    
    getReport(grossReturn,netReturn,taxes,finalPrice,cashflow,bussinessModel){

        let reportMessage = `
            <div class="alert alert-info" role="alert">
                <h4 class="alert-heading">Información de la operación.</h4>
                <p><strong>Rentabilidad bruta anual:</strong> ${(grossReturn * 100).toFixed(2)} %</p>
                <p><strong>Rentabilidad neta anual:</strong> ${(netReturn * 100).toFixed(2)} %</p>
                <p><strong>Precio final de compra:</strong> €${Number(finalPrice).toFixed(2)}</p>`;

        if (bussinessModel != 3) {
            reportMessage += `
                <p><strong>Aproximación de cashflow mensual:</strong> €${Number(cashflow).toFixed(2)}</p>
                <p><strong>Aproximación de impuestos a pagar mensual:</strong> €${Number(taxes).toFixed(2)}</p>`;
        } else {
            reportMessage += `
                <p><strong>Aproximación de impuestos a pagar:</strong> €${Number(taxes).toFixed(2)}</p>`;
        }

        reportMessage += `
            <hr>
            <p class="mb-0">Información aproximada. Utilizar unicamente como guia.</p>
        </div>`;

        document.getElementById("reportContainer").innerHTML = reportMessage;
        document.getElementById("reportContainer").scrollIntoView({ behavior: "smooth" });// Scrollea hasta el reporte
    }
}

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
]
const businessModels = [
    [1, "Alquiler tradicional"],
    [2, "Alquiler por habitación"],
    [3, "Reforma y venta"]
]

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
    // Valida que sea un numero mayor a cero y menor al maximo de la lista
    while (isNaN(businessModel) || businessModel <= 0 || businessModel > businessModels.length) { 
        console.log("Entrada no válida");
        error= `Debe ingresar un valor entre 1 y ${businessModels.length}`
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
LoadFormDefaults()

function LoadFormDefaults(){
    
    LoadComunitiesSelector();
    LoadBussinessModelSelector();
    LoadLastOperation();
    LoadOperationsHistory();
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

function LoadLastOperation(){

    //Recupero la información del storage y lo parseo para crear los objetos correspondientes
    const lastOperation = localStorage.getItem("lastOperation")
    const retrievedJSONOperation = JSON.parse(lastOperation)
    
    let retrieveOperation = new Operation(
        price =Number(retrievedJSONOperation.price),
        mortgage= new Mortgage(
            basePrice=Number(retrievedJSONOperation.mortgage.basePrice),
            FinancingAmount = Number(retrievedJSONOperation.mortgage.FinancingAmount),
            rate= Number(retrievedJSONOperation.mortgage.rate),
            duration= Number(retrievedJSONOperation.mortgage.duration),
        ),
        community=Number(retrievedJSONOperation.community),
        communityITP=Number(retrievedJSONOperation.communityITP),
        reformationPrice=Number(retrievedJSONOperation.reformationPrice),
        commissions=Number(retrievedJSONOperation.commissions),
        businessModel=Number(retrievedJSONOperation.businessModel),
        rent=Number(retrievedJSONOperation.rent),
    )

    document.getElementById("buyPrice").value = retrieveOperation.price
    
    document.getElementById("communities").value = retrieveOperation.community
    
    document.getElementById("reformationPrice").value = retrieveOperation.reformationPrice
    
    document.getElementById("commissions").value = retrieveOperation.commissions
    
    document.getElementById("mortgageAmount").value = retrieveOperation.mortgage.FinancingAmount

    //Actualiza el slider
    UpdateOnMortgageAmount(retrieveOperation.mortgage.FinancingAmount,retrieveOperation.price)
    
    document.getElementById("rate").value = retrieveOperation.mortgage.rate
    
    document.getElementById("businessModel").value = retrieveOperation.businessModel
    
    document.getElementById("mortgageDuration").value = retrieveOperation.mortgage.duration

    document.getElementById("rent").value = retrieveOperation.rent

    // UpdateOnMortgageAmount(retrieveOperation.FinancingAmount,retrieveOperation.price)

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

//Guardo la ultima operacion valida en el storage
function SaveLastOperation(operation){

    //Primero limpio el storage por si ya hay una guardada anterior
    localStorage.removeItem("lastOperation")

    //Creo el JSON y lo almaceno
    const lastOperation = JSON.stringify(operation)
    localStorage.setItem("lastOperation", lastOperation)
}

// Se queda afuera, aparentemente hay algun problema con live server y el guardado local de info en json
// function SaveJsonOperation(operation) {
//     fetch('./mocks/data.json', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(operation)
//     })
//     .then(response => response.json())
//     .then(data => console.log("Operación guardada:", data))
//     .catch(error => console.error("Error al guardar la operación:", error));
// }

async function LoadOperationsHistory() {
    try {
        const response = await fetch('./mocks/data.json');
        const data = await response.json();

        let container = document.getElementById('operations-result');
        container.innerHTML = ''; //Limpio el contenido previo (no deberia hbaer ninguno de todas formas)
        
        let row = document.createElement('div');
        row.className = 'row';

        data.forEach((operation, index) => {
            let col = document.createElement('div');
            col.className = 'col-md-4 mb-4'; //3 columnas por fila

            col.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Operación ${index + 1}</h5>
                        <p><strong>Precio:</strong> ${operation.price}</p>
                        <p><strong>Modelo de Negocio:</strong> ${operation.businessModel}</p>
                        <p><strong>Comisiones:</strong> ${operation.commissions}</p>
                        <p><strong>Renta Total:</strong> ${operation.rent}</p>
                        <p><strong>Rentabilidad:</strong> ${operation.profitability}%</p>
                    </div>
                </div>
            `;
            
            row.appendChild(col);
        });

        container.appendChild(row); //Agrego fila con las tarjetas al contenedor
    } catch (error) {
        console.error("Error al cargar operaciones:", error);
    }
}


function ProcesarOperacion(){
    let formData= FormValidation();
    if(formData!=null)
    {
        Swal.fire({
            title:'OK!',
            text:'Operación procesada con exito.',
            icon:'success',
            confirmButtonText:'Cerrar',
            timer:1700
        })

        const mortgage = new Mortgage(
        
            basePrice= formData[0],
            FinancingAmount = formData[4],
            rate= formData[5],
            duration= formData[7],         
        )
        mortgage.DefineMensualRate(formData[5])

        const operation = new Operation(
            price = mortgage.DefineTotalCost(),
            this.mortgage=mortgage,
            community = formData[1],
            communityITP = GetComunityITP(formData[1]),
            reformationPrice = formData[2],
            commissions = formData[3],
            businessModel = Number(formData[6]),
            rent = formData.slice(8).reduce((acc, curr) => acc + Number(curr), 0) // Suma desde el índice 8 en adelante
        );

        //Genero los datos data del reporte y lo guardo en una variable para desestructurarlos. Por ultimo muestro el reporte
        let reportData = operation.generateReportData();
        
        const report = new ResultsReport()
        report.getReport(reportData[0], reportData[1], reportData[2], reportData[3], reportData[4], reportData[5]);

        operation.price= formData[0]
        SaveLastOperation(operation)
  

        console.log(formData)
    }
}
