let currentCategory = 'all', currentQuestion = null, isAnswered = false;
const CAT_ON = "px-4 py-2 rounded-xl text-xs font-bold transition bg-pink-600 text-white shadow";
const CAT_OFF = "px-4 py-2 rounded-xl text-xs font-bold transition bg-indigo-900 text-indigo-200 hover:bg-indigo-800";

function initGame() { gameRun++; stopSpeech(); loadNextQuestion(); }
function setCategory(cat) {
    currentCategory = cat;
    ['all', 'laika', 'animales', 'juguetes', 'comida', 'escuela'].forEach(c => document.getElementById(`cat-btn-${c}`).className = c === cat ? CAT_ON : CAT_OFF);
    gameRun++; stopSpeech(); loadNextQuestion();
}

function loadNextQuestion() {
    isAnswered = false;
    document.getElementById('feedback-banner').classList.add('hidden');
    markBtns('#section-game .article-btn', null, null);
    currentQuestion = Progress.next(currentCategory);
    if (!currentQuestion) { renderDash('g'); return showResults('g'); }
    const q = currentQuestion;
    document.getElementById('word-icon').innerText = q.icon;
    document.getElementById('word-text').innerText = q.word;
    document.getElementById('word-category-label').innerText = `Categoría: ${q.category.toUpperCase()}`;
    laikaSay('g', `¿Qué artículo va con «${q.word}»?`, 'idle', true, [`¿Qué artículo va con ${q.word}?`]);
    renderDash('g');
}

function checkAnswer(sel) {
    if (isAnswered || !currentQuestion) return;
    isAnswered = true;
    const q = currentQuestion, ok = sel === q.article, run = gameRun, fb = document.getElementById('feedback-banner');
    Progress.record(q.id, ok);
    fb.classList.remove('hidden');
    markBtns('#section-game .article-btn', q.article, sel);
    let say;
    if (ok) {
        playCorrectSound();
        fb.className = "mb-4 p-3 rounded-2xl text-sm font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-bounce";
        fb.innerHTML = `🎉 ¡Excelente! Es <span class="uppercase underline">${q.article} ${q.word}</span>. ¡+10 puntos!`;
        confetti({particleCount: 60, spread: 70, origin: {y: 0.6}, zIndex: 300});
        const w = pick(praise);
        say = laikaSay('g', `${w} «${q.article} ${q.word}».`, 'happy', true, [`${w} ${q.article} ${q.word}.`]);
    } else {
        playIncorrectSound();
        fb.className = "mb-4 p-3 rounded-2xl text-sm font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40";
        fb.innerHTML = `❌ ¡Casi! Lo correcto era: <span class="uppercase underline font-black">${q.article} ${q.word}</span>`;
        say = laikaSay('g', `¡Casi! Es «${q.article} ${q.word}».`, 'sad', true, [`¡Casi! Es ${q.article} ${q.word}.`]);
    }
    renderDash('g');
    // Wait until Laika has finished talking, then continue
    say.then(() => {
        if (run !== gameRun) return;
        if (ST.g.n >= ROUND || !Progress.next(currentCategory)) showResults('g'); else loadNextQuestion();
    });
}
