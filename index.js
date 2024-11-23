let enterworld = document.getElementById("enterBackground");
let entertext = document.getElementById("clickToEnter");
let backgroundVideo = document.getElementById("backgroundVideo");
let pfp = document.getElementById("pfp");
let pfpContainer = document.getElementById("pfpContainer");
var audio = new Audio("/assets/a2z.mp3");

let audioToggle = true;

audioReactivity = false;

audio.autoplay = false; // Ensure autoplay is off
audio.volume = 0.05; // Set the volume
audio.loop = true;

entertext.onclick = function() {
    entertext.classList.add('fade-out'); // Trigger fade-out on the text
    enterworld.classList.add('fade-out'); // Trigger fade-out on the background
    enterworld.style.pointerEvents = "none";
    if (audioToggle == true) {
        audio.play(); // Play the audio on click
    }
    audioContext.resume(); // Resume the audio context if it was suspended
    backgroundVideo.play();

    if (audioReactivity == true){
        updateBackgroundVideoSize();
    }
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
    if (audioToggle == true) {
        analyser.getByteFrequencyData(dataArray);

        // Calculate the average frequency
        let average = dataArray.reduce((a, b) => a + b) / bufferLength;

        // Scale the size of the video based on the average frequency
        let scale = 1 + (average / 2048); // Adjust this to your liking
        pfp.style.transform = `scale(${scale})`;
        pfp.style.transform = `scale(${scale})`;

        // Call this function on the next animation frame
        requestAnimationFrame(updateBackgroundVideoSize);
    }
}

const phrases = [
    "Hey, i'm Rolo.",
    "\"Roloware Still UD\" - NLE Choppa",
    "Imagine not making your own link page",
    "real/one",
    "I use Arch btw"
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const typingSpeed = 100;
const pauseTime = 2000; // Pause between phrases

const typingText = document.getElementById("typingText");

function type() {
    const current = phrases[currentPhrase];
    const visibleText = isDeleting
        ? current.substring(0, currentChar--)
        : current.substring(0, currentChar++);

    typingText.textContent = visibleText;

    if (!isDeleting && currentChar === current.length) {
        // Pause when the phrase is fully typed
        setTimeout(() => (isDeleting = true), pauseTime);
    } else if (isDeleting && currentChar === 0) {
        // Switch to the next phrase when fully deleted
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
}

type();

// Volume Slider Integration
const volumeSlider = document.getElementById('volumeSlider');

// Set the default value of the slider and audio
volumeSlider.value = 0.05;
audio.volume = parseFloat(volumeSlider.value);

// Update the audio volume when the slider is adjusted
volumeSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volumeSlider.value);
});
