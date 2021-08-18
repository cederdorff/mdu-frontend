"use strict"; // to enable strict mode and modern JavaScript functionality

// Global Variable
let myAudioElement;

document.addEventListener("DOMContentLoaded", function () {
  initAudio();
  // appendButtons();
});

function initAudio(){
  document.querySelector("#content").innerHTML += /*html*/`
    <audio id="my-audio" controls>
      <source src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3" type="audio/mpeg">
    </audio>
  `;

  myAudioElement = document.querySelector("#my-audio");
}

function playAudio() {
  myAudioElement.play();
}

function pauseAudio() {
  myAudioElement.pause();
}

// function appendButtons(){
//   document.querySelector("#content").innerHTML += /*html*/`
//     <button onclick="playAudio()">Play</button>
//     <button onclick="pauseAudio()">Pause</button>
//   `;
// }

