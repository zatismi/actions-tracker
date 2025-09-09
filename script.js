let historyArray = [""];
let textInputs = document.getElementsByClassName("text-inputs")[0];
let previewBox = document.getElementById("preview-box");
let rangeSlider = document.getElementById("range1");
let playClicked = false;
        console.log(playClicked);

function record(){
    rangeSlider.disabled = false;
    historyArray.push(textInputs.value);
    rangeSlider.setAttribute("max", historyArray.length - 1);
}

function previewHistory(){
    previewBox.innerHTML = historyArray + historyArray.length;
}

function actions(){
    record();
    previewHistory();
}

function play(){
    if(!playClicked && rangeSlider.value != historyArray.length - 1){
        playClicked = true;
        console.log(playClicked);
        console.log("Play Clicked");
        // rangeSlider.value = 0;
        // historyArray.forEach((element, index) => {
        //     setTimeout(()=> {
        //         textInputs.value = element;
        //         rangeSlider.value = index + 1;
        //     }, 100 * index);
        // });
        for(let i = rangeSlider.value; i < historyArray.length; i++) {
            setTimeout(()=> {
                textInputs.value = historyArray[i];
                rangeSlider.value = i;
                if(i == historyArray.length - 1) playClicked = false;
            }, 100 * i);
        }
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

function pause(currentIndex){
    console.log("Pause Clicked");
    clearTimeout();
}