export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoProgress = document.querySelector('.video-progress');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');

  const togglePlayIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.remove('fa-play');
      videoButtonPlay.classList.add('fa-pause');
    }
  };

  const toggleButtonPlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  const addZero = number => number < 10 ? '0' + number : number;

  videoPlayer.addEventListener('click', toggleButtonPlay);
  videoButtonPlay.addEventListener('click', toggleButtonPlay);

  videoPlayer.addEventListener('play', togglePlayIcon);
  videoPlayer.addEventListener('pause', togglePlayIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    // videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
    // videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
  });

  videoProgress.addEventListener('change', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;

  });

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
  });

  videoVolume.value = videoPlayer.volume * 100;
};