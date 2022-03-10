import VoiceRSS from './voice.js';
import { audioElement } from './voice.js';

const button = document.getElementById('button');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '82c7af3b636c4b7e8aa7009c0c702080',
        src: joke,
        hl: 'en-us',
        v: 'John',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        //Text-to-Speech
        tellMe(joke);

        // Disable Button
        toggleButton();

    } catch(error) {
        // Catch Errors
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);