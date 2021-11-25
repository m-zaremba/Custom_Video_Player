window.addEventListener("DOMContentLoaded", () => {
  const player = document.querySelector(".player");
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
  const speedSelector = document.querySelector(".player-speed");

  let lastVolume = 1;
  let fullscreen = false;

  const showPlayIcon = (showPlay) => {
    showPlay ? playBtn.classList.replace("fa-pause", "fa-play") : playBtn.classList.replace("fa-play", "fa-pause");
    showPlay ? playBtn.setAttribute("title", "Play") : playBtn.setAttribute("title", "Pause");
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
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
  };

  const setVolumeIcon = (volume) => {
    volumeIcon.className = ""; //clear class name before applying a new class
    if (volume > 0.5) {
      volumeIcon.classList.add("fas", "fa-volume-up");
    } else if (volume < 0.5 && volume > 0) {
      volumeIcon.classList.add("fas", "fa-volume-down");
    } else if (volume === 0) {
      volumeIcon.classList.add("fas", "fa-volume-off");
    }
  }

  const changeVolume = (event) => {
    let volume = event.offsetX / volumeRange.offsetWidth;
    volume < 0.1 && (volume = 0);
    volume > 0.9 && (volume = 1);
    
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    lastVolume = volume; //set volume level 'cache' for toggleMute function 

    setVolumeIcon(volume);
  };

  const setMuteIcon = () => {
    volumeIcon.className = "";
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  }

  const toggleMute = () => {
    if (video.volume) {
      lastVolume = video.volume;
      video.volume = 0;
      volumeBar.style.width = 0;
      setMuteIcon();
    } else {
      video.volume = lastVolume;
      volumeBar.style.width = `${lastVolume * 100}%`;
      setVolumeIcon(lastVolume);
      volumeIcon.setAttribute("title", "Mute");
    }
  };

  const changeSpeed = () => {
    video.playbackRate = speedSelector.value;
  };

  // View video in fullscreen
  const openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add("video-fullscreen");
  };

  // Close fullscreen mode
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove("video-fullscreen");
  };

  const toggleFullscreen = () => {
    !fullscreen ? openFullscreen(player) : closeFullscreen();
    fullscreen = !fullscreen;
  };

  playBtn.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);
  video.addEventListener("ended", showPlayIcon); //Show play button when video ends playing
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("canplay", updateProgress);
  progressRange.addEventListener("click", setProgress);
  volumeRange.addEventListener("click", changeVolume);
  volumeIcon.addEventListener("click", toggleMute);
  speedSelector.addEventListener("change", changeSpeed);
  fullscreenBtn.addEventListener("click", toggleFullscreen);
});
