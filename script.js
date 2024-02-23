let dishes = [
    {
        "name": "Frühlingsrollen",
        "description": "Beliebter Klassiker der chinesischen Küche. Wahlweise mit süß-saurer Sauce.",
        "price": 5.50
    },
    {
        "name": "Tofu mit Broccoli in Knoblauchsoße",
        "description": "Gebratener Tofu und frischer Broccoli in einer würzigen Knoblauchsoße, serviert mit Reis.",
        "price": 9.00
    },
    {
        "name": "Wan-Tan-Suppe",
        "description": "Feine Teigtaschen gefüllt mit würziger Füllung, serviert in einer klaren Brühe mit frischen Gemüsestreifen.",
        "price": 6.50
    },
    {
        "name": "Gebratener Reis mit Gemüse",
        "description": "Zarter, aromatischer Reis kombiniert mit einer bunten Auswahl an frischem Gemüse.",
        "price": 11.20
    },
    {
        "name": "Pekingente",
        "description": "Knusprig gebratene Ente mit dünner Haut und zartem Fleisch, serviert mit Pfannkuchen, Gemüse und Hoisin-Sauce.",
        "price": 12.90
    },
    {
        "name": "Kung Pao Hühnchen",
        "description": "Geschmackvolles Hühnchen, mariniert in einer würzigen Sauce mit knackigen Erdnüssen, Paprika und Frühlingszwiebeln.",
        "price": 9.80
    },
    {
        "name": "Gedämpfter Fisch mit Ingwer und Frühlingszwiebeln",
        "description": "Zarter Fisch, schonend gedämpft und mit frischem Ingwer sowie Frühlingszwiebeln aromatisiert.",
        "price": 10.50
    },
    {
        "name": "Gebackene Banane",
        "description": "Reife Bananen, umhüllt von knusprigem Teig und goldbraun frittiert.",
        "price": 7.00
    },
    {
        "name": "Mango Sticky Rice",
        "description": "Süßer klebriger Reis, serviert mit frischen Mangoscheiben und einer Kokosmilchsoße.",
        "price": 6.50
    }
];


let basketItems = [];
let amount = [];
let addedPrices = [];


document.addEventListener("DOMContentLoaded", function () {
    loadBasket();
    showDishes();
    showBasket();
});


function showDishes() {
    var container = document.getElementById('dishContainer');
    if (container) {
        container.innerHTML = ``;

        renderDishes(container);
    } else {
        console.error("Das Element mit der ID 'dishContainer' wurde nicht gefunden.");
    }
}


function renderDishes(container) {
    dishes.forEach(function (dish, index) {
        container.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <div class="addSection">
                        <img onclick="addToBasket(${index})" class="addImage" src="./img/add.png" alt="Hinzufügen">
                    </div>
                    <span class="dishName">${dish.name}</span>
                    <br>
                    <span class="dishDescription">${dish.description}</span>
                    <br>
                    <span class="dishPrice">${dish.price.toFixed(2).replace('.', ',')} €</span>
                </div>
            </div>
        `;
    });
}


function addToBasket(i) {
    let existingItemIndex = basketItems.findIndex(item => item.name === dishes[i].name);
    if (existingItemIndex !== -1) {
        let existingItem = basketItems[existingItemIndex];
        existingItem.amount++;
        amount[existingItemIndex] = existingItem.amount;
        addedPrices[existingItemIndex] += existingItem.price;
    } else {
        let newItem = Object.assign({}, dishes[i]);
        newItem.amount = 1;
        basketItems.push(newItem);
        amount.push(1);
        addedPrices.push(newItem.price);
    }
    saveBasket();
    showBasket();
}


function showBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = ``;
    if (basketItems.length > 0) {
        addedItems();
        showCosts();
    } else {
        emptyBasket();
    }
}


function addedItems() {
    basketItems.forEach(function (item, i) {
        basket.innerHTML += `<div class="card card-body cardDistance">
              <div class="basketContent">
              <p class="mediaqueryItem">${item.name}</p>
              <p>${item.price.toFixed(2).replace('.', ',')} €</p></div>
              <div class="deleteContainer">
                  <img class="garbageImage" src="./img/minusknopf.png" alt="Entfernen" onclick="deleteAmount(${i})">
                  <span class="amountCounter">${amount[i]}</span>
                  <img class="garbageImage" src="./img/plus.png" alt="Hinzufügen" onclick="addAmount(${i})">
              </div>
              </div>`;
    });
}


function showCosts() {
    basket.innerHTML += `<div class="totalSumArea">
          <p>Zwischensumme: ${calculateSubtotal().toFixed(2).replace('.', ',')} €</p>
          <p>Lieferkosten: ${calculateDeliveryCosts().toFixed(2).replace('.', ',')} €</p>
          <p><b><u>Gesamt: ${calculateTotal().toFixed(2).replace('.', ',')} €</u></b></p>
          <p class="deliveryCost">${deliveryCostText()}</p>
      </div>`;
    basket.innerHTML += `<div class="orderButton">
          <button class="orderButtonBackground">Bestellen</button>
      </div>`;
}


function emptyBasket() {
    basket.innerHTML = `
              <div class="basketStyle">
                  <img class="basketImage" src="./img/shopping-cart.png" alt="Warenkorb">
                  <h1 class="cartHeadline"><b>Fülle deinen Warenkorb</b></h1>
                  <h2 class="cartH2">Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</h2>
              </div>
          `;
}


// Calculationg subtotal

function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < basketItems.length; i++) {
        subtotal += basketItems[i].price * amount[i];
    }
    return subtotal;
}


// Calculating delivery costs

function calculateDeliveryCosts() {
    if (calculateSubtotal() > 15) {
        return 0;
    } else {
        return 2.50;
    }
}


// Calculating total sum

function calculateTotal() {
    return calculateSubtotal() + calculateDeliveryCosts();
}


function deliveryCostText() {
    if (calculateSubtotal() > 15) {
        return ``;
    } else {
        return `<i>Bestelle für min. 15 Euro für eine kostenlose Lieferung</i>`;
    }
}


//Local Storage

function saveBasket() {
    const basketData = {
        items: basketItems,
        amounts: amount
    };
    localStorage.setItem('basketData', JSON.stringify(basketData));
    localStorage.setItem('addedPrices', JSON.stringify(addedPrices));
}


function loadBasket() {
    let savedBasketData = localStorage.getItem('basketData');
    let savedAddedPrices = localStorage.getItem('addedPrices');
    if (savedBasketData && savedAddedPrices) {
        const basketData = JSON.parse(savedBasketData);
        const savedPrices = JSON.parse(savedAddedPrices);
        basketItems = basketData.items;
        amount = basketData.amounts;
        addedPrices = savedPrices;
    }
}


//Adding and deleting

function addAmount(i) {
    basketItems[i].amount++;
    amount[i] = basketItems[i].amount;
    addedPrices[i] += basketItems[i].price;
    saveBasket();
    showBasket();
}


function deleteAmount(i) {
    basketItems[i].amount--;
    amount[i]--;
    if (basketItems[i].amount === 0) {
        basketItems.splice(i, 1);
        amount.splice(i, 1);
    }
    saveBasket();
    showBasket();
}



