        function sparkle(p, set, n) {
            const l = document.getElementById('sp-' + p);
            for (let i = 0; i < n; i++) {
                const s = document.createElement('span');
                s.className = 'sp'; s.textContent = set[i % set.length];
                s.style.left = (5 + Math.random() * 90) + '%'; s.style.top = (25 + Math.random() * 65) + '%';
                s.style.animationDelay = (Math.random() * 0.4) + 's';
                l.appendChild(s); setTimeout(() => s.remove(), 1900);
            }
        }

        function laikaSay(p, text, state = 'idle', doSpeak = false, chunkArray) {
            lines[p] = text;
            document.getElementById('bt-' + p).textContent = text;
            const bb = document.getElementById('bubble-' + p);
            bb.classList.remove('pop'); void bb.offsetWidth; bb.classList.add('pop');
            const stg = document.getElementById('stage-' + p), r = document.getElementById('react-' + p);
            stg.classList.remove('st-happy', 'st-sad'); r.className = 'laika-react'; void r.offsetWidth;
            if (state === 'happy') { stg.classList.add('st-happy'); r.classList.add('do-happy'); sparkle(p, ['✨', '⭐', '💚', '🌟'], 14); }
            if (state === 'sad') { stg.classList.add('st-sad'); r.classList.add('do-sad'); sparkle(p, ['💙', '💫'], 6); }
            
            return doSpeak ? speakChunks(chunkArray || [text], p) : Promise.resolve();
        }

        function laikaHTML(p) {
            return `<div class="laika-card"><div class="laika-inner">
                <div class="flex items-center justify-between mb-2"><span class="font-extrabold text-amber-300">🐾 Profesora Laika</span><button onclick="toggleVoice()" class="voice-btn text-xl" title="Voz">🔊</button></div>
                <div id="bubble-${p}" class="bubble"><span id="bt-${p}">¡Hola!</span></div>
                <div id="stage-${p}" class="laika-stage" onclick="laikaClick('${p}')" title="¡Toca a Laika para escucharla!">
                    <div id="tilt-${p}" class="laika-tilt"><div class="laika-float"><div id="react-${p}" class="laika-react">
                        <div class="laika-frame"><img src="${LAIKA_IMG}" alt="Profesora Laika, la perrita astronauta"><span class="glint">✨</span></div>
                    </div></div></div>
                    <div id="sp-${p}" class="sparkle-layer"></div>
                </div>
                <button onclick="laikaClick('${p}')" class="mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition">🔊 Escuchar a Laika</button>
            </div></div>`;
        }

