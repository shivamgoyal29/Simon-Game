// game logic
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function currentColor(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function playAudio(key) {
  switch (key) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();

      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();

      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();

      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();

      break;

    default:
      console.log(key);
      break;
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut()
    .fadeIn();
  playAudio(randomChosenColor);
}

$(".btn").click(function () {
  var id = this.id;

  userClickedPattern.push(id);

  playAudio(id);
  currentColor(id);

  checkAnswer(userClickedPattern.length - 1);
});

var gameStarted = false;

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
    $("h1").html("Level 0");
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function checkAnswer(key) {
  if (gamePattern[key] == userClickedPattern[key]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 500);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");

    startOver();
  }
}
