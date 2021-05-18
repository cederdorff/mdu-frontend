"use strict"; // to enable strict mode and modern JavaScript functionality

// global variables: video, playPauseBtn
let video = document.getElementById("header-video");
let playPauseBtn = document.querySelector("#play-pause-btn");

// Pause and play the video, and change the button text
function playPauseVideo() {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = "Pause";
  } else {
    video.pause();
    playPauseBtn.innerHTML = "Play";
  }
}