let shoppingBasket = ['Frühlingsrollen', 'Wan-Tan-Suppe', 'Reis mit Gemüse', 'Gebackene Banane'];
let prices = [5.50, 6.50, 11.20, 7.00];

function addToBasket(name, price) {
    shoppingBasket.push(name);
    prices.push(price)
}


function updateShoppingBasket(){

    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }

    let finalSum = sum + 2.50;

    document.getElementById('').innerHTML = sum;
}