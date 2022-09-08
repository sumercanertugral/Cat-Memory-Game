var cardsArray = [
    { 'name': 'Number1', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT89IoAV3urlfpIZQLmWaJcZ8pahpCeh4DWdg&usqp=CAU' },
    { 'name': 'Number2', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrZWNgG-uFIHdFLJq2ECPUL8lXmdN2lmTPA&usqp=CAU' },
    { 'name': 'Number3', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbYpJK0GCortI1idR-_zury6VsgTJN9uxlJw&usqp=CAU' },
    { 'name': 'Number4', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-extfTrT_yY5m2lsDB9HlVdgSUVDGcVFFcA&usqp=CAU' },
    { 'name': 'Number5', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJMRvMpDHj3hIWP8RksfRXE2d9IfmSxEUAWQ&usqp=CAU' },
    { 'name': 'Number6', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSspoyykuoWEV7lhE4iK5NZwGmyRsem6U1WIA&usqp=CAU' },
    { 'name': 'Number7', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyz1ijeacvTZ9OobxIrzqCcHIZJKF9wKCZJQ&usqp=CAU' },
    { 'name': 'Number8', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZohHWxSh7a0pxpZE54zv31ms41-QcK54ieQ&usqp=CAU' },
    { 'name': 'Number9', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgXQBwlHdxT9O92lyr4tJaByT7eS1uadApeA&usqp=CAU' },
    { 'name': 'Number10', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vY4kwa-DglLM08nBIxFgUIytNZCHOFZP7g&usqp=CAU' },
    { 'name': 'Number11', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3VjdzrsDm_IBeEqTzhi5CRgE1fEXXSh5TRg&usqp=CAU' },
    { 'name': 'Number12', 'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SfLgNWy1fWsoVB5GVmrzxNvr7TyGFkdfwg&usqp=CAU' }


];

// duplicte card
var gameGrid = cardsArray.concat(cardsArray);

// more shuffle
gameGrid.sort(function() {
    return 0.5 - Math.random();
})

// div with assign to a  game variable
var game = document.getElementById('game-board');

// new section, assign grid variable
var grid = document.createElement('section');

// Give section  class of grid.
grid.setAttribute('class', 'grid');

// Append the grid section to the div-'game-board'
game.appendChild(grid);

for (i = 0; i < gameGrid.length; i++) {
    // create a div 
    // assign to variable 'card'
    var card = document.createElement('div');

    // Apply a card class to that div..............
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;

    // front of card
    var front = document.createElement('div');
    front.classList.add('front');

    // back of card with image cats
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    // add cards to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

var firstGuess = '';
var secondGuess = '';

var count = 0;

var previousTarget = null; //click and click must be null

var delay = 1200;

// with from  match CSS , , , grey . . . . .  .
var match = function() {
    var selected = document.querySelectorAll('.selected');
    // selected içerisindekiler
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
};

// Reset guesses after two attempts !
var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    //tekrar selected içeris
    for (i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};

if (grid.length == 0) {
    alert("oyun bitti");
}
// Add event listener to grid. . . .  .
grid.addEventListener('click', function(event) {
    // Declare variable to target our clicked item
    var clicked = event.target;
    //console.log(clicked.nodeName);
    //console.log(previousTarget);
    //console.log(clicked);

    // only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }
    //just 2 'selected' class
    if (count < 2) {
        count++;

        if (count === 1) {
            // first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            // second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        //condition 
        if (firstGuess !== '' && secondGuess !== '') {

            if (firstGuess === secondGuess) {
                // match function
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
                alert("Congrats!");
            } else {
                setTimeout(resetGuesses, delay);
                alert("You can do it!\nYou can close that alert message from box :)");
            }
        }
        previousTarget = clicked;
    }

});