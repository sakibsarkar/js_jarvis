/* eslint-disable @typescript-eslint/no-explicit-any */
const synth = window.speechSynthesis;

function response(text: string, onclick: (...arg: any) => void | any) {
  const voiceName = "Google UK English Male";
  let voices = synth.getVoices();

  if (voices.length === 0) {
    // Voices aren't loaded yet, listen for voiceschanged event
    synth.onvoiceschanged = function () {
      voices = synth.getVoices();
      // Select voice by name
      const voice = voices.find((v) => v.name === voiceName);
      if (voice) {
        speakWithVoice(text, voice, onclick);
      } else {
        console.error("Voice not found:", voiceName);
      }
    };
  } else {
    // Voices are already loaded, select voice by name
    const voice = voices.find((v) => v.name === voiceName);
    if (voice) {
      speakWithVoice(text, voice, onclick);
    } else {
      console.error("Voice not found:", voiceName);
    }
  }
}

// Function to speak text with a given voice
function speakWithVoice(
  text: string,
  voice: any,
  onclick: (...arg: any) => void | any
) {
  // Create a SpeechSynthesisUtterance object
  const utterance = new SpeechSynthesisUtterance(text);
  const stopBtn = document.getElementById("stop") as HTMLElement;
  const startBtn = document.getElementById("start") as HTMLElement;

  // Optionally configure the utterance
  utterance.volume = 1; // 0 to 1
  utterance.rate = 1.1; // 0.1 to 10
  utterance.pitch = 0.8; // 0 to 2
  utterance.onend = () => {
    onclick();
    startBtn.click();
    // recognitionInstance.start();
  };
  utterance.onstart = () => {
    stopBtn.click();
  };

  // Set voice
  utterance.voice = voice;

  // Speak the utterance
  synth.speak(utterance);
}

export default response;
