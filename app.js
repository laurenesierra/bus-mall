'use strict';



var allProducts = [];
var renderQueue = [];
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
  while (renderQueue.length < 3) {
    var tempindex = getRandomIndex(allProducts.length);
    while (renderQueue.includes(tempindex)) {
      tempindex = getRandomIndex(allProducts.length);
    }
    renderQueue.push(tempindex);
  }

  var productOneIndex = renderQueue.pop();
  var productTwoIndex = renderQueue.pop();
  var productThreeIndex = renderQueue.pop();

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
  var clickedProduct = event.target.title;

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

renderProducts();

function renderChart() {
  var namesArray = [];
  var votesArray = [];
  var viewsArray = [];

  for (var i = 0; i < allProducts.length; i++){
    namesArray.push(allGoats[i].name);
    votesArray.push(allGoats[i].votes);
    viewsArray.push(allGoats[i].views);
  }

var ctx = document.getElementById('myChart').getContext('2d');
var dataObject = {
    type: 'bar',
    data: {
        labels: namesArray,
        datasets: [{
            label: 'Number of Votes',
            data: votesArray,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(54, 99, 132, 1)',
            borderWidth: 5
        },
        {
          label: 'NumberOfVotes',
          data: votesArray,
          backroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 5
        },
    {

      label: 'NumberOfViews',
      data: votesArray,
      backroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2
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

myContainer.addEventListener('click', handleClick);
