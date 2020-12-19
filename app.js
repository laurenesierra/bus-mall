'use strict';

//Global Variables
var allProducts = [];
var renderQueue = [];
var maxClicksAllowed = 25;
var actualClicks = 0;

//DOM ID's
var myContainer = document.getElementById('container');
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var resultsList = document.getElementById('results');

//Image Constructor
function Product(name, src) {
  this.name = name;
  this.src = `img/${name}.${src}`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

//Saves survey results to local storage
var retrieveProducts = localStorage.getItem('products');
if (retrieveProducts) {
  allProducts = JSON.parse(retrieveProducts);
} else {

  //Instantiations
  new Product('usb', 'gif');
  new Product('pen', 'jpg');
  new Product('bag', 'jpg');
  new Product('shark', 'jpg');
  new Product('sweep', 'png');
  new Product('boots', 'jpg');
  new Product('chair', 'jpg');
  new Product('dragon', 'jpg');
  new Product('banana', 'jpg');
  new Product('cthulhu', 'jpg');
  new Product('unicorn', 'jpg');
  new Product('dog-duck', 'jpg');
  new Product('bathroom', 'jpg');
  new Product('tauntaun', 'jpg');
  new Product('scissors', 'jpg');
  new Product('breakfast', 'jpg');
  new Product('bubbleGum', 'jpg');
  new Product('water-can', 'jpg');
  new Product('pet-sweep', 'jpg');
  new Product('wine-glass', 'jpg');
}

//Chooses which items will be displayed on page
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Validates that both images are unique when displayed
function renderProducts() {
  while (renderQueue.length < 6) {
    var tempindex = getRandomIndex(allProducts.length);
    while (renderQueue.includes(tempindex)) {
      tempindex = getRandomIndex(allProducts.length);
    }
    renderQueue.push(tempindex);
  }

  //Ensures images don't repeat in the same scenario twice 
  var productOneIndex = renderQueue.shift();
  var productTwoIndex = renderQueue.shift();
  var productThreeIndex = renderQueue.shift();

  //Asigning image info
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

//Event Handler
function handleClick(event) {
  actualClicks++;
  var clickedProduct = event.target.title;

  //Keeps track of which images are clicked and number of times clicked
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }

  renderProducts();

  //Validation for hitting max number of clicks
  if (actualClicks === maxClicksAllowed) {
    myContainer.removeEventListener('click', handleClick);

    renderChart();
    var stringifyProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifyProducts);
  }
}

renderProducts();

//Renders chart with results on page
function renderChart() {
  var namesArray = [];
  var votesArray = [];
  var viewsArray = [];

  for (var i = 0; i < allProducts.length; i++) {
    namesArray.push(allProducts[i].name);
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
  }

  //Chart displaying survey results
  var ctx = document.getElementById('myChart').getContext('2d');
  var dataObject = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Number of Votes',
        data: votesArray,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(229, 43, 80)',
        borderWidth: 3
      },
      {

        label: 'Number of Views',
        data: viewsArray,
        backroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(39, 59, 226)',
        borderWidth: 3
      }]
    },

    options: {
      resposive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  var myChart = new Chart(ctx, dataObject);
}

//Event listener added to container
myContainer.addEventListener('click', handleClick);
