const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const volumeInput = document.getElementById('volume');
const rateValue = document.getElementById('rate-value');
const pitchValue = document.getElementById('pitch-value');
const volumeValue = document.getElementById('volume-value');
const speakBtn = document.getElementById('speak-btn');
const pauseBtn = document.getElementById('pause-btn');
const resumeBtn = document.getElementById('resume-btn');
const stopBtn = document.getElementById('stop-btn');
const highlightedText = document.getElementById('highlighted-text');



let voices = [];
let utterance = null;
let isSpeaking = false;
let wordIndex = 0;




// Load available voices into the select menu
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}



// Function to start speaking the text
function speak() {
    if (textInput.value.trim() !== '') {
        utterance = new SpeechSynthesisUtterance(textInput.value);
        utterance.voice = voices[voiceSelect.value];
        utterance.rate = rateInput.value;
        utterance.pitch = pitchInput.value;
        utterance.volume = volumeInput.value;

        wordIndex = 0;
        utterance.onboundary = handleBoundary;
        utterance.onstart = () => isSpeaking = true;
        utterance.onend = () => {
            isSpeaking = false;
            highlightedText.innerHTML = textInput.value;
        };

        speechSynthesis.speak(utterance);
    }
}


// Highlight text as it's spoken
function handleBoundary(event) {
    if (event.name === 'word') {
        const words = textInput.value.split(/\s+/);
        const currentWord = event.charIndex;
        
        // Update highlighted text
        highlightedText.innerHTML = words
            .map((word, i) => i < wordIndex ? `<span style="background-color: yellow;">${word}</span>` : word)
            .join(' ');

        wordIndex++;
    }
}


// Update the speech parameters in real-time
function updateSpeech() {
    if (utterance && isSpeaking) {
        speechSynthesis.cancel();
        speak();
    }
}


// Pause the speech
function pauseSpeech() {
    if (isSpeaking) {
        speechSynthesis.pause();
    }
}


// Resume the speech
function resumeSpeech() {
    if (isSpeaking) {
        speechSynthesis.resume();
    }
}


// Stop the speech
function stopSpeech() {
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        highlightedText.innerHTML = textInput.value;
    }
}





// Event listeners for user interactions
speakBtn.addEventListener('click', speak);
pauseBtn.addEventListener('click', pauseSpeech);
resumeBtn.addEventListener('click', resumeSpeech);
stopBtn.addEventListener('click', stopSpeech);

rateInput.addEventListener('input', () => {
    rateValue.textContent = rateInput.value;
    updateSpeech();
});

pitchInput.addEventListener('input', () => {
    pitchValue.textContent = pitchInput.value;
    updateSpeech();
});

volumeInput.addEventListener('input', () => {
    volumeValue.textContent = volumeInput.value;
    updateSpeech();
});
// Load voices when available
speechSynthesis.addEventListener('voiceschanged', loadVoices);
window.onload = loadVoices;


















































































































































