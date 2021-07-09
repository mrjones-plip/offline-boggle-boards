
// set dice as a global that we can update and reset
let dice
// set rotateStates to be global so it can be shared between functions
let rotateStates = shuffle(['','rotated90', 'rotated180','rotated270']);
// set a globally accessible timer that can be reset w/i different functions
let countdownTimer;
// create a new NoSleep object that will be used in the click hanlder
const noSleep = new NoSleep();
// reset the board on first page load to make sure it's ready for
// the first new game
cleanBoard('board1')

/**
 * Populate the board
 * @param board string ID of the DOM element to render the board
 */
function populateBoard(board){
  console.log('start')
  let die;
  let position = 0;

  cleanBoard(board)
  resetDice();
  while(dice.length > 0){
    die = getDie();
    placeDie(die, position, board);
    position++;
  }

  ProgressCountdown(180 , 'board1' );
}

// add click handler for the button to start the game and enable no sleep
$('#newGame').click(function (){
  populateBoard('board1')
  noSleep.enable()
})

/**
 * Update a progress bar timer
 * thanks https://stackoverflow.com/a/50846458
 * @param timeleft seconds left of timer
 * @constructor
 */
function ProgressCountdown(timeleft, board) {
  document.getElementById('timer').value = timeleft;
  document.getElementById('timer').setAttribute('max', timeleft);
  if(typeof countdownTimer === 'number'){
    clearInterval(countdownTimer);
  }
  countdownTimer = setInterval(function() {
    timeleft--;

    document.getElementById('timer').value = timeleft;

    if (timeleft <= 0) {
      console.log('done!')
      endGame(board)
      clearInterval(countdownTimer);
    }
  }, 1000);
}

function endGame(board) {
  $('#' + board + ' .die' ).addClass('done');
}


/**
 * Reset the board to be empty
 * @param board
 */
function cleanBoard(board){
  rotateStates.forEach(rotateState => {
    $('#' + board + ' .die' ).removeClass(rotateState);
  });
  $('#' + board + ' .die' )
    .removeClass('underline')
    .removeClass('done');
  document.getElementById('timer').value = 0;
}

/**
 * Reset the dice variable to have 16 die in it
 */
function resetDice() {
  dice = [
    "eegnaa", "soiset", "abbooj", "ldexir",
    "wrethv", "wtoota", "muqhni", "wegnhe",
    "tstidy", "verldy", "ienues", "zhrlnn",
    "fskfap", "rettyl", "iotmcu", "ahspoc"
  ];
}

/**
 * Given a selected die side and position in the board,
 * place the letter
 * @param die string letter to show
 * @param position position in the 4 x 4 board
 * @param board DOM ID location of the board
 */
function placeDie(die, position, board){
  let extraClass;
  if( die === 'M' || die === 'W' || die === 'Z' ){
    extraClass = 'underline';
  }
  // shuffle the rotate states so the zeroeth position is
  // random to rotate the die a random amount
  rotateStates = shuffle(rotateStates)
  $('#' + board + ' #die' + position)
    .html(die)
    .addClass(rotateStates[0])
    .addClass(extraClass);
}

/**
 * Choose a random die out of dice, select randome side to reutrn
 * @returns {string}
 */
function getDie() {
  const die = shuffle(dice).pop();
  const randomSide = Math.floor((Math.random() * 5))
  let side = die[randomSide].toUpperCase();
  if(side === 'Q'){
    side = 'Qu'
  }
  return side;
}

/**
 * Given a 1 dimensional array, shuffle it and return it
 * thanks https://stackoverflow.com/a/2450976
 * @param array
 * @returns array
 */
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
