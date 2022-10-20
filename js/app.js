'use strict';

let myContainer = document.querySelector('section');
let resultsButton = document.querySelector('section + div');
let resultsList = document.querySelector('ul');

let timesUserVoted = 0;
let maxNumVotes = 25;

let allOddDucks = [];
let indexArray = [];

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

function OddDuck(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${fileExtension}`;
  this.score = 0;
  this.views = 0;
  allOddDucks.push(this);
}

new OddDuck('sweep', 'png');
new OddDuck('bag');
new OddDuck('banana');
new OddDuck('bathroom');
new OddDuck('boots');
new OddDuck('breakfast');
new OddDuck('bubblegum');
new OddDuck('chair');
new OddDuck('cthulhu');
new OddDuck('dog-duck');
new OddDuck('dragon');
new OddDuck('pen');
new OddDuck('pet-sweep');
new OddDuck('scissors');
new OddDuck('shark');
new OddDuck('tauntaun');
new OddDuck('unicorn');
new OddDuck('water-can');
new OddDuck('wine-glass');

function selectRandomDuck() {
  return Math.floor(Math.random() * allOddDucks.length);
}

function renderDuck() {

  while ( indexArray.length < 6) {
    let ranNum = selectRandomDuck();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }

  let duck1 = indexArray.shift();
  let duck2 = indexArray.shift();
  let duck3 = indexArray.shift();

  console.log(indexArray);

  image1.src = allOddDucks[duck1].src;
  image1.alt = allOddDucks[duck1].name;
  allOddDucks[duck1].views++;
  image2.src = allOddDucks[duck2].src;
  image2.alt = allOddDucks[duck2].name;
  allOddDucks[duck2].views++;
  image3.src = allOddDucks[duck3].src;
  image3.alt = allOddDucks[duck3].name;
  allOddDucks[duck3].views++;
}

function renderResults() {
  for (let i = 0; i < allOddDucks.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allOddDucks[i].name} had ${allOddDucks[i].score} votes, and was seen ${allOddDucks[i].views} times.`;
    resultsList.appendChild(li);
  }
}

function storeDuckData() {
  let stringifiedDuckData = JSON.stringify(allOddDucks);
  localStorage.setItem('duckData', stringifiedDuckData);
}

function getDuckData() {
  let oldDucks = localStorage.getItem('duckData');

  if (oldDucks) {
    let parsedDucks = JSON.parse(oldDucks);
    allOddDucks = parsedDucks;
    console.log(parsedDucks);
  }
}

function handleClicks(e) {
  if (e.target === myContainer) {
    alert('Please click an Image!');
  }
  console.log(e.target.alt);
  timesUserVoted++;

  let clickedDuck = e.target.alt;

  for (let i = 0; i < allOddDucks.length; i++) {
    if (clickedDuck === allOddDucks[i].name) {
      allOddDucks[i].score++;
      break;
    }
  }
  if (timesUserVoted === maxNumVotes){
    myContainer.removeEventListener('click',handleClicks);
    resultsButton.className = 'results';
    resultsButton.addEventListener('click', renderChart);
    resultsButton.addEventListener('click', renderResults);
    storeDuckData();
  } else {
    renderDuck();
    storeDuckData();
  }
}

function renderChart() {

  let duckNames = [];
  let duckViews = [];
  let duckScore = [];
  for (let i = 0; i < allOddDucks.length; i++) {
    duckNames.push(allOddDucks[i].name);
    duckViews.push(allOddDucks[i].views);
    duckScore.push(allOddDucks[i].score);
  }

  const data = {
    labels: duckNames,
    datasets: [{
      label: 'Number of Views',
      data: duckViews,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1
    },
    {
      label: 'Number of Votes',
      data: duckScore,
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgb(153, 102, 255)',
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      // indexAxis: 'y',
      scales: {
        x: {
          // stacked: true
        },
        y: {
          // stacked: true,
          beginAtZero: true
        }
      }
    },
  };
  const duckChart = new Chart(document.getElementById('duckChart'), config);
}

getDuckData();

myContainer.addEventListener('click', handleClicks);

renderDuck();
