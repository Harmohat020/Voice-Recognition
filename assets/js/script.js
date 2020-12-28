const button = document.querySelector('#voice-btn');
const content = document.querySelector('#content');

const greetings = [
    'Hello, how are you?'
];

try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    button.addEventListener('click', () =>{
        content.textContent = "";
    });
    
    recognition.onstart = () => {
        console.log( 'voice is activated, you can talk.');
    };
    
    recognition.onresult = (event) => {
        const current_text = event.resultIndex;

        const transcript = event.results[current_text][0].transcript;

        new TypeIt(content, {strings: transcript, typeSpeed: 100}).go();

        speakMSG(transcript);
    };

    button.addEventListener('click', () => {
        recognition.start();
    });

    function speakMSG(message){
        const speech = new SpeechSynthesisUtterance();

        window.speechSynthesis.onvoiceschanged = () => {
             voice = window.speechSynthesis.getVoices()[0];  

             speech.text = 'What did you say?';
     
             if (message.includes('Hello')) {
                 const response = greetings[Math.floor(Math.random() * greetings.length)];
                 speech.text = response;
             }
             speech.voice = voice;
             speech.volume = 0.8;
             speech.rate = 1;
             speech.pitch = 1;
     
             window.speechSynthesis.speak(speech);
        };

    }

} catch (error) {
    console.log(error);
    new TypeIt('#err_msg_browser', {strings: 'Your browser doesn\'t support voice talk', typeSpeed: 1000}).go();

}