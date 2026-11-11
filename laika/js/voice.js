const lines = {g:'', s:''};
let voiceOn = true, esVoice = null, replayP = 'g', speechToken = 0;
const praise = ["¡Correcto!", "¡Muy bien!", "¡Genial!", "¡Guau, perfecto!", "¡Excelente!"];
const pick = a => a[Math.floor(Math.random() * a.length)];

function pickVoice() {
    const v = speechSynthesis.getVoices();
    esVoice = v.find(x => /^es[-_]ES/i.test(x.lang)) || v.find(x => /^es/i.test(x.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function stopSpeech() {
    speechToken++;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    document.querySelectorAll('.laika-stage').forEach(s => s.classList.remove('talking'));
}

// Returns a Promise that resolves only AFTER Laika has finished talking
// (or after a safety timeout). If speech is cancelled it never resolves.
function speakChunks(textArray, p) {
    return new Promise(resolve => {
        const st = document.getElementById('stage-' + p);
        if (!('speechSynthesis' in window) || !voiceOn || !textArray || !textArray.length) { setTimeout(resolve, 1500); return; }
        speechSynthesis.cancel();
        const my = ++speechToken; let i = 0, done = false;
        const guard = setTimeout(() => finish(), textArray.join(' ').length * 110 + textArray.length * 400 + 2500);
        function finish() {
            if (done || my !== speechToken) return;
            done = true; clearTimeout(guard);
            if (st) st.classList.remove('talking');
            setTimeout(resolve, 500);
        }
        function next() {
            if (my !== speechToken) return;
            if (i >= textArray.length) return finish();
            const u = new SpeechSynthesisUtterance(textArray[i++].replace(/[«»]/g, ''));
            u.lang = 'es-ES'; if (esVoice) u.voice = esVoice; u.rate = 0.9; u.pitch = 1.25;
            u.onstart = () => { if (st) st.classList.add('talking'); };
            u.onend = () => setTimeout(next, 250);
            u.onerror = () => finish();
            speechSynthesis.speak(u);
        }
        next();
    });
}
        function laikaClick(p) { 
            initAudio(); 
            // Split current bubble text into natural conversational chunks with breaks
            const currentText = lines[p] || "¡Hola! ¡Sigamos aprendiendo!";
            let chunks = currentText.split(/([.,?!…—])/).reduce((acc, curr, idx, arr) => {
                if (idx % 2 === 0) {
                    let combined = curr + (arr[idx+1] || '');
                    if (combined.trim()) acc.push(combined.trim());
                }
                return acc;
            }, []);
            if (chunks.length === 0) chunks = [currentText];
            speakChunks(chunks, p); 
        }

        function toggleVoice() {
            voiceOn = !voiceOn;
            if (!voiceOn && 'speechSynthesis' in window) speechSynthesis.cancel();
            document.querySelectorAll('.voice-btn').forEach(b => b.textContent = voiceOn ? '🔊' : '🔇');
        }
