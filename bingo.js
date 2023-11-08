'use strict';

/*
Set the centerFree variable to true if you want a free space in the center
If it's set to false, there will be no free space. You can add a "Free Space"
to the spaceData variable if you want a random Free Space inserted on the card
*/
const centerFree = true;

const emptySpace = 'Dummy Space';
/*
Fill the spaceData variable with a comma separated list for what you want
for your spaces. If there are less than 25 entries, remaining spaces will
be filled with the emptySpace variable set above
*/
const spaceData = [
  'Free Space',
  'Death Stranding 2 Trailer',
  'Kojima Sighting',
  'Facebook/IG Commercial',
  'PS5 to PC port',
  'Movie star presenter',
  'Blame the Teleprompter',
  'Bungie Apology',
  'Zelda: TOTK DLC',
  'Security Guards',
  'Switch 2 Reveal',
  'Alan Wake live performance',
  'Call of Duty',
  'Sonic 3 Trailer',
  'Baldurs Gate DLC',
  'Mass Effect',
  'Resident Evil 9',
  'Elder Scrolls 6',
  'Tekken 8 New Character',
  'Max Payne',
  'Luigi`s Mansion 2',
  'Princess Peach Showtime',
  'Star Wars Outlaws',
  'Resident Evil 5/6',
  'Dino Crisis',
  'FF16 DLC',
  'FF7R Trailer',
  '',
];

//External Code from StackOverflow. Do not touch
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
//End of External Code

//Pads data with dummy spaces if there are less than 25 spaces
function prepareData(griddata) {
  //  console.log(griddata.length);
  if (griddata.length < 25) {
    let filler = 25 - griddata.length;
    for (filler; filler > 0; filler--) {
      griddata.push(emptySpace);
    }
  }
  return griddata;
}

//Function to update a space
const updateSquare = function (target, message) {
  document.querySelector(target).textContent = message;
};

//Code to populate the squares when the Randomize button is pushed
const squares = document.querySelectorAll('.space');
document.querySelector('.randomButt').addEventListener('click', function () {
  prepareData(spaceData);
  shuffle(spaceData);
  for (let s = 0; s < squares.length; s++) {
    let target = `.space-s${s}`;
    if (spaceData[s]) {
      //If free space variable is true, set the center block to "Free Space"
      if (s === 12 && centerFree === true) {
        updateSquare(target, 'Free Space');
      } else {
        updateSquare(target, spaceData[s]);
      }
    } else {
      //Populates any empty entries with the emptySpace value.
      updateSquare(target, emptySpace);
    }
  }
});

//Code to "lock" the card when the lock button is pushed. This just hides the buttons.
document.querySelector('.lockButt').addEventListener('click', function () {
  const butts = document.querySelectorAll('.butt');
  for (let b = 0; b < butts.length; b++) {
    butts[b].classList.add('hidden');
  }
  document.querySelector('.reset').classList.remove('hidden');
});
/*
Creates code to hide a square when clicked. Hiding applies a 20% opacitiy
to the block. Can be adjusted in the CSS fade section
*/
for (let x = 0; x < 25; x++) {
  document.querySelector(`.space-s${x}`).addEventListener('click', function () {
    this.classList.add('fade');
  });
}
/*
Reset button undoes all the hiding on the card. 
Reset button is hidden until the card is locked
*/
document.querySelector('.reset').addEventListener('click', function () {
  for (let x = 0; x < 25; x++) {
    document.querySelector(`.space-s${x}`).classList.remove('fade');
  }
});

//Function to update the color schema from the button panel
function updateScheme(bodyColor, headerColor, squareColor, textColor) {
  document.querySelector('.bingo-card').style.backgroundColor = bodyColor;
  document.querySelector('.card-header').style.backgroundColor = headerColor;
  document.querySelector('.card-header').style.color = textColor;
  const spaces = document.querySelectorAll('.space');
  for (let s = 0; s < spaces.length; s++) {
    document.querySelector(`.space-s${s}`).style.backgroundColor = squareColor;
    document.querySelector(`.space-s${s}`).style.color = textColor;
  }
}
//Different color schema for the radial buttons and their onclick functions.
document.getElementById('original').addEventListener('click', function () {
  updateScheme('#138200', '#b72504', '#6185f8', 'white');
});
document.getElementById('blue').addEventListener('click', function () {
  updateScheme('#ccdaeb', '#032a5d', 'f97444', 'white');
});
document.getElementById('red').addEventListener('click', function () {
  updateScheme('#fcfa73', '#422275', '#d90382', 'white');
});
document.getElementById('green').addEventListener('click', function () {
  updateScheme('#e85d3d', '#2eb19b', '#f2dba4', 'black');
});
