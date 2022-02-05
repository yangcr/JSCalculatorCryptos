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


const ShoppingCart = [];


const cardsCryptos = document.querySelector("#cryptoShoppingCart");


//funcion

crearCards();

function crearCards() {
    Cryptos.forEach((crypto) => {
        const divCrypto = document.createElement("div");
        divCrypto.classList.add("card", "cardShadow");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.textContent = crypto.nombre;
        cardTitle.classList.add("card-title");

        const cryptoDetails = document.createElement("ul");

        const liPrecio = document.createElement("li");
        liPrecio.textContent = `precio: ${crypto.precio}`;

        const liUsd = document.createElement("li");
        liUsd.textContent = `tu compra: ${crypto.compraUsd}`;

        const liCryptoAmount = document.createElement("li");
        liCryptoAmount.textContent = `cantidad: ${crypto.compraDeCrypto}`;

        divCrypto.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cryptoDetails);
        cryptoDetails.appendChild(liPrecio);
        cryptoDetails.appendChild(liUsd);
        cryptoDetails.appendChild(liCryptoAmount);
        cardsCryptos.appendChild(divCrypto);
    })
}