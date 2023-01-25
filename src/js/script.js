$(document).ready(() => {
  let gamePattern = [];
  let userClickedPattern = [];
  let buttonColors = ["red", "blue", "green", "yellow"];
  let level = 0;
  let started = false;
  let clicks = 0;
  const gameTitle = $("#level-title");

  $(document).keydown((e) => {
    if (!started) {
      nextSequence();

      gameTitle.text("Level " + level);
      started = true;
    }
  });

  $(".btn").click((e) => {
    let idOfClicked = e.target.id;
    userChosenColor = idOfClicked;
    userClickedPattern.push(userChosenColor);

    clicks++;

    if (clicks === gamePattern.length) {
      checkUserSequence(userClickedPattern, gamePattern);
    }

    playAudio(idOfClicked);
    flashBtn(idOfClicked);
  });

  function nextSequence() {
    userClickedPattern = [];

    let randomChosenColor = buttonColors[setRandomNum()];
    gamePattern.push(randomChosenColor);

    flashBtn(gamePattern[gamePattern.length - 1]);
    playAudio(gamePattern[gamePattern.length - 1]);

    gameTitle.text("Level " + level);
  }

  function checkUserSequence(userArr, gameArr) {
    if (userArr.toString() === gameArr.toString()) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    } else {
      $("body").addClass("game-over");
      gameTitle.text("Game Over");
      playAudio("wrong");

      setTimeout(() => {
        gameOver();
      }, 1000);
    }

    clicks = 0;
    level++;
  }

  function gameOver() {
    $("body").removeClass("game-over");
    started = false;
    level = 0;
    gameTitle.text("Press A Key to Start");
    gamePattern = [];
    userClickedPattern = [];
  }

  function flashBtn(id) {
    $("#" + id).addClass("pressed");

    setTimeout(() => {
      $("#" + id).removeClass("pressed");
    }, 100);
  }

  function setRandomNum() {
    return Math.floor(Math.random() * 4);
  }

  function playAudio(id) {
    let sound = new Audio(`./sounds/${id}.mp3`);
    sound.play();
  }
});
