        let currentChapterIndex = 0;

        function renderChapter() {
            const ch = chapters[currentChapterIndex];
            const container = document.getElementById('chapter-content');
            let html = `
                <div class="flex items-center gap-4 mb-6">
                    <div class="text-5xl md:text-6xl p-3 bg-indigo-950/80 rounded-2xl border border-indigo-800/60 shadow-md">
                        ${ch.icon}
                    </div>
                    <div>
                        <span class="text-xs text-pink-400 font-bold uppercase tracking-wider">Capítulo ${currentChapterIndex + 1}</span>
                        <h3 class="text-2xl md:text-3xl font-bold text-white">${ch.title}</h3>
                        <p class="text-xs md:text-sm text-indigo-300">${ch.subtitle}</p>
                    </div>
                </div>
                <div class="space-y-4 text-indigo-100 text-base md:text-lg leading-relaxed">
            `;
            ch.text.forEach(paragraph => {
                html += `<p class="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-800/30">${paragraph}</p>`;
            });
            html += `</div>`;
            container.innerHTML = html;
            document.getElementById('prev-ch-btn').disabled = currentChapterIndex === 0;
            document.getElementById('next-ch-btn').innerHTML = currentChapterIndex === chapters.length - 1 ? '¡Ir al Juego! 🎮' : 'Siguiente →';
            document.getElementById('chapter-indicator').innerText = `Capítulo ${currentChapterIndex + 1} de ${chapters.length}`;
            for (let i = 1; i <= 3; i++) {
                const btn = document.getElementById(`ch-btn-${i}`);
                if (i - 1 === currentChapterIndex) {
                    btn.className = "px-4 py-2 rounded-xl text-sm font-bold transition-all bg-pink-600 text-white shadow-md";
                } else {
                    btn.className = "px-4 py-2 rounded-xl text-sm font-bold transition-all bg-indigo-800/80 hover:bg-indigo-700 text-indigo-200";
                }
            }
        }

        function selectChapter(index) { currentChapterIndex = index - 1; renderChapter(); }
        function changeChapter(direction) {
            currentChapterIndex += direction;
            if (currentChapterIndex >= chapters.length) { switchTab('game'); currentChapterIndex = chapters.length - 1; }
            else { renderChapter(); }
        }
