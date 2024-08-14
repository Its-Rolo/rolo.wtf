let enterworld = document.getElementById("enterBackground");
let entertext = document.getElementById("clickToEnter");
let backgroundVideo = document.getElementById("backgroundVideo");
let girl = document.getElementById("girl");
var audio = new Audio("/assets/song.mp3");

let audioToggle = true;

audio.autoplay = false; // Ensure autoplay is off
audio.volume = 0.1; // Set the volume
audio.loop = true;

entertext.onclick = function() {
    entertext.classList.add('fade-out'); // Trigger fade-out on the text
    enterworld.classList.add('fade-out'); // Trigger fade-out on the background
    enterworld.style.pointerEvents = "none";
    if (audioToggle == true){
        audio.play(); // Play the audio on click
    }
    audioContext.resume(); // Resume the audio context if it was suspended
    backgroundVideo.play();
    // Start the animation loop
    updateBackgroundVideoSize();
};
enterworld.onclick = function() {
    entertext.classList.add('fade-out'); // Trigger fade-out on the text
    enterworld.classList.add('fade-out'); // Trigger fade-out on the background
    enterworld.style.pointerEvents = "none";
    if (audioToggle == true){
        audio.play(); // Play the audio on click
    }
    audioContext.resume(); // Resume the audio context if it was suspended
    backgroundVideo.play();
    // Start the animation loop
    updateBackgroundVideoSize();
};


// Create an audio context
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioContext.createAnalyser();

// Connect the audio element to the audio context
let source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Configure the analyser
analyser.fftSize = 256;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

function updateBackgroundVideoSize() {
    if (audioToggle == true){
        analyser.getByteFrequencyData(dataArray);

    // Calculate the average frequency
    let average = dataArray.reduce((a, b) => a + b) / bufferLength;

    // Scale the size of the video based on the average frequency
    let scale = 1 + (average / 8192 ); // Adjust this to your liking
    backgroundVideo.style.transform = `scale(${scale})`;
    backgroundVideo.style.transform = `scale(${scale})`;

    // Call this function on the next animation frame
    requestAnimationFrame(updateBackgroundVideoSize);
    } 
}




