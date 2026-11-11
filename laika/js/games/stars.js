let starsRound = 0, currentStarItem = null, starsAnswered = false;

function initStarsGame() {
    ST.s = mk(); starsRound = 0; gameRun++;
    starsSentencesData.sort(() => Math.random() - 0.5);
    loadNextStarRound();
}

function loadNextStarRound() {
    starsAnswered = false;
    document.getElementById('star-feedback').innerText = "";
    if (starsRound >= starsSentencesData.length) { starsSentencesData.sort(() => Math.random() - 0.5); starsRound = 0; }
    currentStarItem = starsSentencesData[starsRound];
    document.getElementById('star-sentence-text').innerHTML = currentStarItem.sentence;
    laikaSay('s', '¿Qué artículo falta?', 'idle', true, ['¿Qué artículo falta?']);
    document.getElementById('falling-options-container').innerHTML = ['el', 'la', 'los', 'las'].map((art, idx) => `
        <button onclick="checkStarAnswer('${art}')" class="star-option-btn relative bg-gradient-to-b from-indigo-900/90 to-purple-950/90 hover:from-pink-600 hover:to-purple-700 border-2 border-indigo-500/50 p-4 rounded-2xl font-black text-xl text-white shadow-xl transition transform hover:scale-105 active:scale-95 animate-[float_3s_ease-in-out_infinite]" style="animation-delay:${idx * 0.4}s;">
            <span class="block text-2xl mb-1">${idx % 2 === 1 ? '🐕🐾' : '🌠'}</span><span class="uppercase tracking-widest">${art}</span>
        </button>`).join('');
    renderDash('s');
}

function checkStarAnswer(sel) {
    if (starsAnswered) return;
    starsAnswered = true;
    const a = ST.s, it = currentStarItem, fb = document.getElementById('star-feedback'), run = gameRun, ok = sel === it.article;
    a.n++; markBtns('.star-option-btn', it.article, sel);
    let say;
    if (ok) {
        a.score += 15; a.streak++; a.ok++; a.best = Math.max(a.best, a.streak);
        playCorrectSound();
        fb.className = "mt-3 text-sm font-bold text-emerald-400 animate-bounce";
        fb.innerText = `🎉 ¡Perfecto! ${sel.toUpperCase()}`;
        confetti({particleCount: 50, spread: 60, origin: {y: 0.7}, zIndex: 300});
        const w = pick(praise); say = laikaSay('s', `${w} Es «${it.article}».`, 'happy', true, [`${w} Es ${it.article}.`]);
    } else {
        a.streak = 0; a.bad++;
        playIncorrectSound();
        fb.className = "mt-3 text-sm font-bold text-rose-400";
        fb.innerText = `❌ ¡Ups! Era: ${it.article.toUpperCase()}`;
        say = laikaSay('s', `¡Casi! Es «${it.article}».`, 'sad', true, [`¡Casi! Es ${it.article}.`]);
    }
    renderDash('s'); starsRound++;
    say.then(() => { if (run !== gameRun) return; if (ST.s.n >= ROUND) showResults('s'); else loadNextStarRound(); });
}
