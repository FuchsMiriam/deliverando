let shoppingBasket = [];
let prices = [];

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