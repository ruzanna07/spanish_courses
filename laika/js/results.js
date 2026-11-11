let modalMode = 'next';
function showResults(p) {
    replayP = p;
    const fresh = p === 'g' && !ST.g.n, snap = Object.assign({}, ST[p]);
    if (p === 'g' && !fresh) Progress.newBlock();
    const o = fresh ? {ok: Progress.correct(), bad: Progress.answered() - Progress.correct(), n: Progress.answered(), best: Progress.d.best, score: Progress.d.score} : snap;
    const pct = o.n ? Math.round(o.ok / o.n * 100) : 0;
    const all = p === 'g' && Progress.answered() >= Progress.total;
    const catDone = p === 'g' && !all && !Progress.next(currentCategory);
    const bd = pct >= 90 ? ['🥇', 'Astronauta de Oro', '¡Eres una superestrella del espacio!']
        : pct >= 70 ? ['⭐', 'Exploradora Estelar', '¡Muy bien! Casi llegas a la luna.']
        : pct >= 50 ? ['🚀', 'Cadete Espacial', '¡Vas despegando! Sigue practicando.']
        : ['🐾', 'Cachorro Valiente', '¡Cada error nos enseña algo! Inténtalo otra vez.'];
    modalMode = all ? (Progress.correct() < Progress.total ? 'retry' : 'reset') : catDone ? 'all' : 'next';
    const label = p === 's' ? '🔁 Jugar otra vez' : {next: '➡️ Siguientes 10', retry: '🔁 Practicar las falladas', reset: '🔁 Empezar de nuevo', all: '✨ Todas las palabras'}[modalMode];
    document.getElementById('rm-img').src = LAIKA_IMG;
    document.getElementById('rm-badge').textContent = bd[0];
    document.getElementById('rm-title').textContent = all ? `¡Completaste las ${Progress.total} palabras!` : bd[1];
    document.getElementById('rm-pct').textContent = pct + '%';
    document.getElementById('rm-stats').textContent = `✅ ${o.ok} correctas · ❌ ${o.bad} por practicar · 🏆 racha: ${o.best} · ⭐ ${o.score}`;
    document.getElementById('rm-total').textContent = p === 'g' ? `📚 Llevas ${Progress.answered()} de ${Progress.total} palabras (${Progress.correct()} correctas)` : '';
    document.getElementById('rm-msg').textContent = '🐕 ' + bd[2];
    document.getElementById('rm-next').textContent = label;
    document.getElementById('result-modal').classList.remove('hidden');
    playFanfare();
    for (let i = 0; i < 3; i++) setTimeout(() => confetti({particleCount: 80, spread: 85, origin: {x: Math.random(), y: 0.5}, zIndex: 300}), i * 350);
    setTimeout(() => speakChunks([`¡Ronda lista! ${pct} por ciento.`, all ? '¡Todas las palabras!' : bd[1]], p), 500);
}
function resumeAfterModal() { if (replayP === 'g') loadNextQuestion(); else initStarsGame(); }
function closeModal(resume) {
    document.getElementById('result-modal').classList.add('hidden');
    stopSpeech(); gameRun++;
    if (resume !== false) resumeAfterModal();
}
function modalNext() {
    if (replayP === 'g') {
        if (modalMode === 'retry') Progress.retryWrong();
        else if (modalMode === 'reset') Progress.reset();
        else if (modalMode === 'all') { closeModal(false); setCategory('all'); return; }
    }
    closeModal();
}
