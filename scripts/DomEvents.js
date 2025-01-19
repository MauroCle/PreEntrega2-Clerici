

//Procesamiento principal del formulario
let button = document.getElementById("btn-calcular");
button.addEventListener("click", ProcesarOperacion)


function ProcesarOperacion(){
    console.log("PROCESAR OPERACIÓN")
    let values = [];

    values.push(document.getElementById("buyPrice").value)
    values.push(document.getElementById("communities").value)
    values.push(document.getElementById("reformationPrice").value)
    values.push(document.getElementById("mortgagePercentage").value)
    values.push(document.getElementById("mortgageAmount").value)
    values.push(document.getElementById("rate").value)
    values.push(document.getElementById("businessModel").value)

    console.log(values);
}

//Carga los datos en los selectores
LoadFormSelectors()

function LoadFormSelectors(){
    LoadComunitiesSelector();
    LoadBussinessModelSelector();
}

function LoadComunitiesSelector(){
    const communitiesList = [
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

    const communities = document.getElementById("communities")
    communities.innerHTML=""; //Limpio cualquier dato residuo hardcodeado en el HTML

    communitiesList.forEach(community => {
        communities.innerHTML += `<option value="${community[0]}">${community[1]}</option>`
    });
}


function LoadBussinessModelSelector(){
    
    const businessModels = [
        [1, "Alquiler tradicional"],
        [2, "Alquiler por habitación"],
        [3, "Reforma y venta"]
    ];

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
    console.log("entré")
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

