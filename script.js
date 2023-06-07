const musicContainer = document.getElementById('music-container');
const title = document.getElementById('title');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
//Buttons
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Song titles
const songs = ['hey', 'summer', 'ukulele'];

//Keep track of song
let songIndex = 2;

//initially load song details
loadSong = (song) => {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
};

loadSong(songs[songIndex]);

playSong = () => {
	musicContainer.classList.add('play');
	playBtn.querySelector('.fas').classList.remove('fa-play');
	playBtn.querySelector('.fas').classList.add('fa-pause');
	audio.play();
};

pauseSong = () => {
	musicContainer.classList.remove('play');
	playBtn.querySelector('.fas').classList.add('fa-play');
	playBtn.querySelector('.fas').classList.remove('fa-pause');
	audio.pause();
};

nextSong = () => {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
};

prevSong = () => {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
};

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	console.log(currentTime);
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

//Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
