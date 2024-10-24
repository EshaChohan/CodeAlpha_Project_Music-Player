var musicContainer = document.getElementById('music-section');
var playBtn = document.getElementById('play-btn');
var prevBtn = document.getElementById('previous-btn');
var nextBtn = document.getElementById('next-btn');

var audio = document.getElementById('audio');
var progress = document.getElementById('progress-bar');
var progressContainer = document.getElementById('container');
var title = document.getElementById('music-name');
var cover = document.getElementById('music-img');

var songs = ['Humdard', 'Ae Dil Hai Mushkil', 'Zindagi Kuch To Bta','jo tum mere ho', 'Agar Tum Saath Ho'];
var songIndex = 0;
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  var { duration, currentTime } = e.srcElement;
  var progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  var width = this.clientWidth;
  var clickX = e.offsetX;
  var duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function playPause (){
	var isPlaying = musicContainer.classList.contains('play');

 if (isPlaying) {
    pauseSong();
  } else {
   playSong();
 }
}

playBtn.addEventListener('click', playPause)
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
