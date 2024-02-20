let dishes = [
    {
        "name": "Frühlingsrollen",
        "description": "Beliebter Klassiker der chinesischen Küche. Wahlweise mit süß-saurer Sauce.",
        "price": "5,50 €"
    },
    {
        "name": "Tofu mit Broccoli in Knoblauchsoße",
        "description": "Gebratener Tofu und frischer Broccoli in einer würzigen Knoblauchsoße, serviert mit Reis.",
        "price": "9,00 €"
    },
    {
        "name": "Wan-Tan-Suppe",
        "description": "Feine Teigtaschen gefüllt mit würziger Füllung, serviert in einer klaren Brühe mit frischen Gemüsestreifen.",
        "price": "6,50 €"
    },
    {
        "name": "Gebratener Reis mit Gemüse",
        "description": "Zarter, aromatischer Reis kombiniert mit einer bunten Auswahl an frischem Gemüse.",
        "price": "11,20 €"
    },
    {
        "name": "Pekingente",
        "description": "Knusprig gebratene Ente mit dünner Haut und zartem Fleisch, serviert mit Pfannkuchen, Gemüse und Hoisin-Sauce.",
        "price": "12,90 €"
    },
    {
        "name": "Kung Pao Hühnchen",
        "description": "Geschmackvolles Hühnchen, mariniert in einer würzigen Sauce mit knackigen Erdnüssen, Paprika und Frühlingszwiebeln.",
        "price": "9,80 €"
    },
    {
        "name": "Gedämpfter Fisch mit Ingwer und Frühlingszwiebeln",
        "description": "Zarter Fisch, schonend gedämpft und mit frischem Ingwer sowie Frühlingszwiebeln aromatisiert.",
        "price": "10,50 €"
    },
    {
        "name": "Gebackene Banane",
        "description": "Reife Bananen, umhüllt von knusprigem Teig und goldbraun frittiert.",
        "price": "7,00 €"
    },
    {
        "name": "Mango Sticky Rice",
        "description": "Süßer klebriger Reis, serviert mit frischen Mangoscheiben und einer Kokosmilchsoße.",
        "price": "6,50 €"
    }
];


let basketItems = [];


document.addEventListener("DOMContentLoaded", function () {
    showDishes();
});


function showDishes() {
    var container = document.getElementById('dishContainer');
    if (container) {
        container.innerHTML = ``;

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
                        <span class="dishPrice">${dish.price}</span>
                    </div>
                </div>
            `;
        });
    } else {
        console.error("Das Element mit der ID 'dishContainer' wurde nicht gefunden.");
    }
}


function addToBasket(index) {
    basketItems.push(dishes[index]);
    showBasket();
}


function showBasket() {
    let basket = document.getElementById('basket');
    basket.innerHTML = ``;

    if (basketItems.length > 0) {
        basketItems.forEach(function (item, i) {
            basket.innerHTML += `<div class="card card-body cardDistance">
                <div class="basketContent">
                <p>${item.name}</p>
                <p>${item.price}</p></div>
                <div class="deleteContainer">
                    <img class="garbageImage" src="./img/garbage.png" alt="Mülleimer" onclick="deleteDish(${i})">
                </div>
            </div>`;
        });
    } else {
        basket.innerHTML = `
            <div class="basketStyle">
                <img class="basketImage" src="./img/shopping-cart.png" alt="Warenkorb">
                <h1 class="cartHeadline"><b>Fülle deinen Warenkorb</b></h1>
                <h2 class="cartH2">Füge leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</h2>
            </div>
        `;
    }
}


function deleteDish(i) {
    basketItems.splice(i, 1);
    showBasket();
}