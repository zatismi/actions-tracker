let historyArray = [""];
let textInputs = document.getElementsByClassName("text-inputs")[0];
let previewBox = document.getElementById("preview-box");
let rangeSlider = document.getElementById("range1");
let rangeSliderContainer = document.getElementById("range-slider-container");
let playClicked = false;
let interval = null;

// Buttons
let fastBackwardButton = document.getElementById("fast-backward-btn");
let stepBackwardButton = document.getElementById("step-backward-btn");
let pauseButton = document.getElementById("pause-btn" );
let playButton = document.getElementById("play-btn" );
let stepForwardButton = document.getElementById("step-forward-btn");
let fastForwardButton = document.getElementById("fast-forward-btn");

function record(){
    rangeSlider.disabled = false;
    rangeSliderContainer.classList.remove("bg-colorish");
    rangeSliderContainer.classList.add("bg-info");
    historyArray.push(textInputs.value);
    rangeSlider.setAttribute("max", historyArray.length - 1);
}

function previewHistory(){
    previewBox.innerHTML = historyArray + historyArray.length;
    rangeSlider.setAttribute("value", historyArray.length);
}

function actions(){
    record();
    previewHistory();
}

function play(){
    if(!playClicked && rangeSlider.value != historyArray.length - 1){
        replaceButton(playButton, pauseButton);
        playClicked = true;
        console.log("Play Clicked");
        let i = rangeSlider.value;
        interval = setInterval(() => {
            textInputs.value = historyArray[i];
            rangeSlider.value = i;
            if(i == historyArray.length - 1){
                clearInterval(interval);
                playClicked = false;
                replaceButton(pauseButton, playButton);
            }
            i++
        }, 100);
    }
}

function sliderPlay(){
    if(historyArray.length > 0){
        console.log("slider changed")
        textInputs.value = historyArray[rangeSlider.value];
        console.log(rangeSlider.value)
        previewHistory();
    }
}

function pause(){
    clearInterval(interval);
    interval = null;
    playClicked = false;
    replaceButton(pauseButton, playButton);
}

function forwardFast(){
    rangeSlider.value = historyArray.length - 1;
    textInputs.value = historyArray[historyArray.length - 1];
}

function backwardFast(){
    rangeSlider.value = 0;
    textInputs.value = historyArray[0];
}

function forwardStep(){
    if(rangeSlider.value != historyArray.length - 1){
        // funny implementation of the meme of js when 1-1=0 but 1+1=11 hhhhhh
        let rs = parseInt(rangeSlider.value);
        textInputs.value = historyArray[rs + 1];
        rangeSlider.value = rs + 1;
    }
}

function backwardStep(){
    if(rangeSlider.value > 0){
        textInputs.value = historyArray[rangeSlider.value - 1];
        rangeSlider.value -= 1;
    }
}

// function replaceButton(currentButton, replacingButton){
//     // currentButton.classList.add("visually-hidden");
//     currentButton.classList.remove("show");
//     currentButton.classList.add("hide");
//     // replacingButton.classList.remove("visually-hidden");
//     replacingButton.classList.remove("hide");
//     replacingButton.classList.add("show");
// }

function replaceButton(currentButton, replacingButton){
  currentButton.classList.remove("shown");
  currentButton.classList.add("hidden");
  replacingButton.classList.remove("hidden");
  replacingButton.classList.add("shown");
}