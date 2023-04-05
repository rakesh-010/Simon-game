
// Main js file for functioning of the game.s

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;

document.addEventListener("keydown",  (event)=> {
  if (!started) {
    nextSequence();
    document.querySelector("h1").innerHTML = "Level " + level;
    started = true;
  }
}); //pressing a key to start the game.. so when the user
//presses the key we call next sequence to start the game.

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 3);
  randomNumber += 1; //generating a random number

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  level += 1;
  document.querySelector("h1").innerHTML = "Level " + level; //updatig h1 so that everytime the game is
  //played the level inreases.

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //blink karwane ke liye hai ye

  playSound(randomChosenColour);
}

var userChosenColour;
for (var i = 0; i < 4; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    userChosenColour = this.id;
    console.log(this); //this returns the div statement so usmese id le lo.
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //ye check karega ki the most
    //recent jo entry hai wo user entry aur jo randomly aya(computer generated) hai wo same hai ki nahi

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      //ye length check ho raha hai taaki pata
      //chale ki user apna pura sequence enter kar chuka hai ki nahi... agar kar chuka hai to next
      //level pe jaenge nhi to user ka sara entry dene ka wait karenge

      setTimeout(function () {
        nextSequence();
      }, 1000); //wapas  nextSequence ko call karega baar baar naya levels ke liye
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    var activeButton = document.querySelector("body");
    activeButton.classList.add("game-over"); //game over hone ke wajah se game-over wala class aa
    // jaega aur pura red ho jaega

    setTimeout(function () {
      activeButton.classList.remove("game-over");
    }, 200); //200 mili secs ke  baad hatt jaega wo red bg-color.
    document.querySelector("h1").innerHTML =
      "Game Over, Press Any Key to Restart";

    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = []; //for making it start over.
}

function playSound(name) {
  var aud = new Audio("sounds/" + name + ".mp3");
  aud.play(); //jo bhi button user click karega uske corresponding sound bajega
}

function animatePress(currentColour) {
  var activeButton = document.querySelector("#" + currentColour); //element which is pressed.
  activeButton.classList.add("pressed"); //adding class pressed to the button which was pressed.

  setTimeout(function () {
    activeButton.classList.remove("pressed"); //code to remove the pressed button after 100 ms.
  }, 100);
}
