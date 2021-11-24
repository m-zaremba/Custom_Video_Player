window.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  const progressRange = document.querySelector(".progress-range");
  const progressBar = document.querySelector(".progress-bar");
  const playBtn = document.getElementById("play-button");
  const volumeIcon = document.getElementById("volume-icon");
  const volumeRange = document.querySelector(".volume-range");
  const volumeBar = document.querySelector(".volume-bar");
  const currentTime = document.querySelector(".time-elapsed");
  const duration = document.querySelector(".time-duration");
  const fullscreenBtn = document.querySelector(".fullscreen");

  const showPlayIcon = (showPlay) => {
    showPlay
      ? playBtn.classList.replace("fa-pause", "fa-play")
      : playBtn.classList.replace("fa-play", "fa-pause");
    showPlay
      ? playBtn.setAttribute("title", "Play")
      : playBtn.setAttribute("title", "Pause");
  };

  const togglePlay = () => {
    if (video.paused) {
      video.play();
      showPlayIcon(false);
    } else {
      video.pause();
      showPlayIcon(true);
    }
  };

  const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  // Update progress bar width and video display time
  const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
  };

  // Use progress bar to navigate video
  const setProgress = (event) => {
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration;
  }

  playBtn.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);
  video.addEventListener("ended", showPlayIcon); //Show play button when video ends playing
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("canplay", updateProgress);
  progressRange.addEventListener("click", setProgress);
});
