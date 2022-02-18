const Cryptos = [{ nombre: "Ethereum", precio: 2712.37, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "Bitcoin", precio: 37651.36, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "Solana", precio: 111.44, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "Cardano", precio: 1.06, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "XMR", precio: 0.75, compraUsd: 0, compraDeCrypto: 0 },
{ nombre: "BNB", precio: 376.73, compraUsd: 0, compraDeCrypto: 0 }];


const plataFiat = [{ pais: "Argentina", moneda: "ARS", valorDolar: 200 },
{ pais: "Chile", moneda: "CLP", valorDolar: 813 },
{ pais: "Brasil", moneda: "BRL", valorDolar: 5 },
{ pais: "Colombia", moneda: "COP", valorDolar: 3933 },]

// C O N S T R U C T O R

class cryptomoneda {
    constructor(id,nombre, precio, compraUsd, compraCrypto) {
        this.id=id
        this.nombre = nombre; // nombre de la cripto, a sacar por API
        this.precio = parseFloat(precio); // precio de la cripto, a sacar por API
        this.compraUsd = compraUsd;
        this.compraCrypto = compraCrypto;
    }
}

// F U N C I O N E S   B A S I C A S

const dividir = (num1, num2) => {
    let resultadoDivision;
    resultadoDivision = num1 / num2;
    return resultadoDivision; // DIVIDIR
}

const restar = (num1, num2) => {
    let resultadoResta;
    resultadoResta = num1 - num2;
    return resultadoResta; // RESTAR
}

// C A L C U L A R   D O L A R E S

const fiatSelected = document.querySelector('#monedaFiat');

fiatSelected.addEventListener('change', (moneda) => {

    let valorDolar = plataFiat[moneda.target.value].valorDolar;
    let cantidadPesos = document.querySelector("#cantidadPesos").value;
    const cantidadDolares = dividir(cantidadPesos, valorDolar);
    const resultado = document.querySelector('.resultadoDolares');
    resultado.textContent = `${cantidadDolares.toFixed(2)}`;
});


// C A L C U L A D O R A

const nombreCrypto = document.querySelector('#selectCrypto').nombre;

const cryptoSelected = document.querySelector('#selectCrypto');

cryptoSelected.addEventListener('change', (seleccionCrypto) => {
    let precioCryptomoneda = Cryptos[seleccionCrypto.target.value].precio;
    document.querySelector("#precioCrypto").value = precioCryptomoneda;
})

const calcularCompra = () => {
    let precioCrypto = document.querySelector("#precioCrypto").value;
    let inversionEnDolares = document.querySelector("#usdCrypto").value;
    let cantidadComprada = dividir(inversionEnDolares, precioCrypto);
    document.querySelector("#tuCompra").value = cantidadComprada;

    Cryptos[cryptoSelected.value].compraUsd = inversionEnDolares;
    Cryptos[cryptoSelected.value].compraDeCrypto = cantidadComprada;
}

let calcularCrypto = document.getElementById('calcularCrypto');

calcularCrypto.addEventListener('click', () => {
    calcularCompra();
})

// C R E A D O R    D E    C A R D S

let ShoppingCart = [];

const cardsCryptos = document.querySelector("#cryptoShoppingCart");

let id = 0
const agregarCarrito = () => {
    ShoppingCart.push(new cryptomoneda(id+=1, Cryptos[cryptoSelected.value].nombre, Cryptos[cryptoSelected.value].precio, Cryptos[cryptoSelected.value].compraUsd, Cryptos[cryptoSelected.value].compraDeCrypto));
    
        var divCrypto = document.createElement("div");
            divCrypto.classList.add("customCard", "cardShadow");
    
    
            divCrypto.innerHTML += `
                                        <h5 class="card-title">${Cryptos[cryptoSelected.value].nombre}</h5>
                                        <ul>
                                            <li>
                                            precio: ${Cryptos[cryptoSelected.value].precio}
                                            </li>
                                            <li>
                                            tu compra en dolares: ${Cryptos[cryptoSelected.value].compraUsd}
                                            </li>
                                            <li>
                                            tendrias ${Cryptos[cryptoSelected.value].compraDeCrypto.toFixed(5)} ${Cryptos[cryptoSelected.value].nombre}
                                            </li>
                                        </ul>
    
                                        <input type="button" class="btn btn-danger" id="${id}" value="Eliminar"></input>
                                    `
    
            cardsCryptos.appendChild(divCrypto);

            

            let btnEliminar= document.getElementById(`${id}`)

            btnEliminar.addEventListener('click', ()=>{
                btnEliminar.parentElement.remove()
                
                ShoppingCart = ShoppingCart.filter(item => item.id != btnEliminar.id)

            })

            document.getElementById('addCryptoForm').reset();
}

let addPortfolio = document.getElementById('agregarCrypto');

addPortfolio.addEventListener('click', () => {
    agregarCarrito();
})

// A G R E G A R   A   P O R T F O L I O   P E R M A N E N T E
var today = new Date();
var date = `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;


const HistorialCompras = () => {
    localStorage.setItem(`${date}`, JSON.stringify(ShoppingCart));
}

let guardarHistorico = document.getElementById('guardarHistorico');

guardarHistorico.addEventListener('click', () => {
    HistorialCompras();

    ShoppingCart = [];
    cardsCryptos.innerHTML = ``;
});

let borrarHistorial = document.getElementById("borrarHistorial");

borrarHistorial.addEventListener('click', () => {
    localStorage.clear();

    let modalBody = document.querySelector("#modalHistorialBody");
    modalBody.innerHTML = '';
});

// C O M P R A S   H I S T O R I C A S

const historialDeCompras = [];


const mostrarTodoHistorial = () => {
    var historialCompleto = [],
    keysHistorial = Object.keys(localStorage);
    i = keysHistorial.length;
    while (i--) {
        historialCompleto.push(JSON.parse(localStorage.getItem(keysHistorial[i])));
    }
    const modalHistorial = document.querySelector("#modalHistorialBody");
    
    modalHistorial.innerHTML = ``;
    historialCompleto.forEach(compra => {
        compra.forEach(monedaComprada => {
            modalHistorial.innerHTML += `
                                        <div class="card cardShadow">
                                        <div class="card-body">
                                        <h5 class="card-title">${monedaComprada.nombre}</h5>
                                        <p class="card-text">compraste ${monedaComprada.compraCrypto} de ${monedaComprada.nombre} que equivale a $${monedaComprada.compraUsd} usd</p>
                                        </div>
                                        </div>`
        })
    })
}

const verHistorialCompleto = document.querySelector("#verComprasHistoricas");

verHistorialCompleto.addEventListener('click', () => {
    mostrarTodoHistorial();
})


