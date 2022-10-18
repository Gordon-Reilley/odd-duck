'use strict';

let myContainer = document.querySelector('section');
let resultsButton = document.querySelector('section + div');
let resultsList = document.querySelector('ul');

let timesUserVoted = 0;
let maxNumVotes = 25;

// console.log(resultsList);
// console.log(myContainer);

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

// console.log(image1, image2.src, image3);
// image2.src = 'img/boots.jpg';

function OddDuck(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${fileExtension}`;
  this.score = 0;
  this.views = 0;
}

let sweep = new OddDuck('sweep', 'png');
let bag = new OddDuck('bag');
let banana = new OddDuck('banana');
let bathroom = new OddDuck('bathroom');
let boots = new OddDuck('boots');
let breakfast = new OddDuck('breakfast');
let bubblegum = new OddDuck('bubblegum');
let chair = new OddDuck('chair');
let cthulhu = new OddDuck('cthulhu');
let dogDuck = new OddDuck('dog-duck');
let dragon = new OddDuck('dragon');
let pen = new OddDuck('pen');
let petSweep = new OddDuck('pet-sweep');
let scissors = new OddDuck('scissors');
let shark = new OddDuck('shark');
let tauntaun = new OddDuck('tauntaun');
let unicorn = new OddDuck('unicorn');
let waterCan = new OddDuck('water-can');
let wineGlass = new OddDuck('wine-glass');

let allOddDucks = [sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass];

// function selectRandomDuck() {
//   return Math.floor(Math.random() * allOddDucks.length);
// }

function shuffleDucks(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i],array[j]] = [array[j], array[i]];
  }
  return array.slice(0,3);
}

// shuffleDucks();

function renderDuck() {
  // let duck1 = selectRandomDuck();
  // let duck2 = selectRandomDuck();
  // let duck3 = selectRandomDuck();
  // console.log(duck1, duck2, duck3);

  // while (duck1 !== duck2 !== duck3) {
  //   duck2 = selectRandomDuck();
  //   duck3 = selectRandomDuck();
  //   // console.log(duck1, duck2, duck3);
  // }
  const duckItems = shuffleDucks(allOddDucks);
  console.log(duckItems);
  image1.src = duckItems[0].src;
  image1.alt = duckItems[0].name;
  allOddDucks[0].views++;
  image2.src = duckItems[1].src;
  image2.alt = duckItems[1].name;
  allOddDucks[1].views++;
  image3.src = duckItems[2].src;
  image3.alt = duckItems[2].name;
  allOddDucks[2].views++;
}

function renderResults() {
  for (let i = 0; i < allOddDucks.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allOddDucks[i].name} had ${allOddDucks[i].score} votes, and was seen ${allOddDucks[i].views} times.`;
    resultsList.appendChild(li);
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
    resultsButton.addEventListener('click', renderResults);
  } else {
    renderDuck();
  }
}

myContainer.addEventListener('click', handleClicks);

renderDuck();
