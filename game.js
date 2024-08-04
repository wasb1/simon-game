const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 1;
let gameIsOn = false;

$(document).keydown(function (event) {
    if (level === 1 && event.key == "a") {
        gameIsOn = true;
        nextSequence();
    }
})


for (let i = 0; i < buttonColours.length; i++) {
    $("#" + buttonColours[i]).on("click", function () {
        playEffects(buttonColours[i])
        userPattern.push(buttonColours[i]);
        if (gamePattern[userPattern.length - 1] !== buttonColours[i] && gameIsOn) {
            gameIsOn = false;
            let failAudio = new Audio("./sounds/wrong.mp3");
            failAudio.play()
            $("h1").text("GAME OVER! Press A to restart");
            level = 1;
        } else if (gamePattern.length === userPattern.length && gameIsOn) {
            setTimeout(() => { nextSequence() }, 1100);
        }
    })
}

function playEffects(color) {
    $("#" + color).fadeOut();
    $("#" + color).fadeIn();

    let audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function nextColor() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    playEffects(randomChosenColour);
    gamePattern.push(randomChosenColour);
}

function nextSequence() {
    $("h1").text("Level " + level);
    for (let i = 0; i < level; i++) {
        setTimeout(() => { nextColor() }, 1100 * i);
    }
    level++;
    gamePattern = [];
    userPattern = [];
}
