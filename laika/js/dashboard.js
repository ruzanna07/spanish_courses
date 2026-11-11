function dashHTML(p) {
    const tile = (i, l, id, c) => `<div class="dash-tile"><div class="text-[11px] uppercase font-bold text-indigo-300">${i} ${l}</div><div id="${p}-${id}" class="text-2xl font-extrabold ${c}">0</div></div>`;
    const bar = (id, c) => `<div class="w-full bg-indigo-900/80 rounded-full h-3 overflow-hidden"><div id="${p}-${id}" class="bg-gradient-to-r ${c} h-3 rounded-full transition-all duration-500" style="width:0%"></div></div>`;
    const box = (t, b) => `<div class="bg-indigo-950/80 p-3 rounded-2xl border border-indigo-800/50"><div class="text-xs font-semibold mb-2 ${t}</div>${b}</div>`;
    const total = p === 'g' ? box('text-amber-300"><span id="g-ttext"></span> <button onclick="resetProgress()" class="ml-2 underline text-indigo-400">reiniciar</button>', bar('tbar', 'from-emerald-400 to-cyan-400')) : '';
    return `<div class="space-y-3"><div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        ${tile('✅', 'Correctas', 'ok', 'text-emerald-300')}${tile('❌', 'Por practicar', 'bad', 'text-rose-300')}
        <div class="dash-tile flex items-center gap-3"><div id="${p}-ring" class="ring"><div class="ring-in"><span id="${p}-acc">—</span></div></div><div class="text-[11px] uppercase font-bold text-indigo-300">🎯 Precisión</div></div>
        ${tile('🔥', 'Racha', 'streak', 'text-amber-300')}${tile('🏆', 'Mejor racha', 'best', 'text-pink-300')}</div>
        ${box('text-indigo-300"><span id="' + p + '-ptext"></span>', bar('pbar', 'from-pink-500 to-amber-400'))}${total}</div>`;
}

function renderDash(p) {
    const a = ST[p], acc = a.n ? Math.round(a.ok / a.n * 100) : 0, $ = id => document.getElementById(p + '-' + id);
    $('ok').textContent = a.ok; $('bad').textContent = a.bad; $('best').textContent = a.best;
    $('acc').textContent = a.n ? acc + '%' : '—';
    $('ring').style.background = `conic-gradient(#34d399 ${acc * 3.6}deg,#312e81 0)`;
    const f = $('streak'); f.innerHTML = (a.streak >= 3 ? '🔥' : '') + a.streak + (a.streak >= 5 ? ' ⭐' : '');
    f.classList.remove('pop'); void f.offsetWidth; f.classList.add('pop');
    $('pbar').style.width = (Math.min(a.n, ROUND) / ROUND * 100) + '%';
    $('ptext').textContent = `Ronda: ${Math.min(a.n + 1, ROUND)} de ${ROUND}`;
    if (p === 'g') {
        const done = Progress.answered();
        $('tbar').style.width = (done / Progress.total * 100) + '%';
        $('ttext').textContent = `🌟 ${done} de ${Progress.total} palabras · ✅ ${Progress.correct()} correctas`;
        document.getElementById('score-display').innerText = Progress.d.score;
        document.getElementById('streak-display').innerText = `🔥 ${a.streak}`;
    } else {
        document.getElementById('stars-score-display').innerText = a.score;
        document.getElementById('stars-round-display').innerText = `${Math.min(a.n + 1, ROUND)} / ${ROUND}`;
    }
}
        function markBtns(sel, correct, chosen) {
            document.querySelectorAll(sel).forEach(b => {
                const m = b.getAttribute('onclick').match(/'(\w+)'/), art = m && m[1];
                b.classList.remove('btn-ok', 'btn-no');
                if (art === correct) b.classList.add('btn-ok'); else if (art === chosen) b.classList.add('btn-no');
            });
        }
