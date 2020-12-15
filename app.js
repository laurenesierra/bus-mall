'use strict';



var allProducts = [];
var maxClicksAllowed = 25;
var actualClicks = 0;

var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultsList = document.getElementById('results');


function Product(name, src) {
this.name = name; 
this.src = `img/${name}.${src}`;
this.views = 0;
this.votes = 0;
allProducts.push(this);
}

new Product('bag', 'jpg');
new Product('banana', 'jpg');
new Product('bathroom', 'jpg');
new Product('boots', 'jpg');
new Product('breakfast', 'jpg');
new Product('bubbleGum', 'jpg');
new Product('chair', 'jpg');
new Product('cthulhu', 'jpg');
new Product('dog-duck', 'jpg');
new Product('dragon', 'jpg');
new Product('pen', 'jpg');
new Product('pet-sweep', 'jpg');
new Product('scissors', 'jpg');
new Product('shark', 'jpg');
new Product('sweep', 'png');
new Product('tauntaun', 'jpg');
new Product('unicorn', 'jpg');
new Product('usb', 'gif');
new Product('water-can', 'jpg');
new Product('wine-glass', 'jpg');

function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function renderProducts() {
  var productOneIndex = getRandomIndex(allProducts.length);
  var productTwoIndex = getRandomIndex(allProducts.length);
  var productThreeIndex = getRandomIndex(allProducts.length);

imageOneElement.src = allProducts[productOneIndex].src;
imageOneElement.alt = allProducts[productOneIndex].name;
imageOneElement.title = allProducts[productOneIndex].name;
allProducts[productOneIndex].views++;

imageTwoElement.src = allProducts[productTwoIndex].src;
imageTwoElement.alt = allProducts[productTwoIndex].name;
imageTwoElement.title = allProducts[productTwoIndex].name;
allProducts[productOneIndex].views++;

imageThreeElement.src = allProducts[productThreeIndex].src;
imageThreeElement.alt = allProducts[productThreeIndex].name;
imageThreeElement.title = allProducts[productThreeIndex].name;
allProducts[productThreeIndex].views++;
}

function handleClick(event) {
  actualClicks++;
  var clickedProduct = event.target.name;
  console.log(event);
  
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
    allProducts[i].votes++;
  }
}

renderProducts();

if (actualClicks === maxClicksAllowed) {
  myContainer.removeEventListener('click', handleClick);
  for (var j = 0; j < allProducts.length; j++) {
    var liElement = document.createElement('li');
    liElement.textContent = `${allProducts[j].name} was viewed ${allProducts[j].views} times and clicked ${allProducts[j].votes} times`;
    resultsList.appendChild(liElement);
  }
}
}