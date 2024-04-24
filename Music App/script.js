document.addEventListener('DOMContentLoaded', function() {
    let letsongIndex = 0;
    let audioElement = new Audio(); // Creating an audio element without specifying the source initially
    let themasterPlay = document.getElementById('masterPlay');
    let ProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let songItem = Array.from(document.getElementsByClassName('songItem'));

    let song = [
        { songName: "Deva- Arijit Singh", filepath: "songs/Deva.mp3", coverpath: "covers/Deva.jpg" },
        { songName: "Kesariya- Arijit Singh", filepath: "songs/Kesariya.mp3", coverpath: "covers/Kesariya.jpg" },
        { songName: "Rasiyaa- Arijit Singh", filepath: "songs/Rasiya.mp3", coverpath: "covers/Rasiyaa.jpg" },
        { songName: "Shiva-Bhramstra", filepath: "songs/Shiva.mp3", coverpath: "covers/siva.jpg" },
        { songName: "Dance Ka Bhoot- Bhramstra", filepath: "songs/2.mp3", coverpath: "covers/Dance.jpg" }
    ];

    // Loop through each song item and set cover image and song name
    songItem.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = song[i].coverpath;
        element.getElementsByClassName("songName")[0].innerText = song[i].songName;
    });

    // Function to initialize the audio element with a specific song
    function loadSong(songIndex) {
        audioElement.src = song[songIndex].filepath;
        audioElement.load(); // Load the audio
        audioElement.currentTime = 0; // Reset the playback time
        themasterPlay.classList.remove('fa-circle-play');
        themasterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }

    // Function to handle play/pause button click
    function togglePlayPause() {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            themasterPlay.classList.remove('fa-circle-play');
            themasterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            themasterPlay.classList.remove('fa-circle-pause');
            themasterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    }

    // Initialize the first song in the playlist
    loadSong(letsongIndex);

    // Handle play/pause button click
    themasterPlay.addEventListener('click', togglePlayPause);

    // Listen to timeupdate event of the audio element to update the progress bar
    audioElement.addEventListener('timeupdate', () => {
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        ProgressBar.value = progress;
    });

    // Handle progress bar change event to seek to a specific time in the audio
    ProgressBar.addEventListener('change', () => {
        let seekTime = ProgressBar.value * audioElement.duration / 100;
        audioElement.currentTime = seekTime;
    });

    // Function to reset all play buttons to play state
    function makeAllPlays() {
        Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        });
    }

    // Add click event listeners to song play buttons
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
        element.addEventListener('click', (e) => {
            makeAllPlays(); // Reset all play buttons
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            letsongIndex = index; // Update current song index
            loadSong(letsongIndex); // Load the selected song
        });
    });
});
