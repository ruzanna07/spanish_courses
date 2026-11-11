        function switchTab(tab) {
            exitFS();
            stopSpeech(); gameRun++;
            const storySec = document.getElementById('section-story');
            const gameSec = document.getElementById('section-game');
            const starsSec = document.getElementById('section-stars');
            const btnStory = document.getElementById('btn-story');
            const btnGame = document.getElementById('btn-game');
            const btnStars = document.getElementById('btn-stars');

            btnStory.className = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-indigo-800/70 hover:bg-indigo-700 text-indigo-200 flex items-center gap-2";
            btnGame.className = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-indigo-800/70 hover:bg-indigo-700 text-indigo-200 flex items-center gap-2";
            btnStars.className = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-indigo-800/70 hover:bg-indigo-700 text-indigo-200 flex items-center gap-2";

            storySec.classList.add('hidden'); gameSec.classList.add('hidden'); starsSec.classList.add('hidden');

            if (tab === 'story') {
                storySec.classList.remove('hidden');
                btnStory.className = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-pink-600 text-white shadow-lg shadow-pink-600/30 flex items-center gap-2";
            } else if (tab === 'game') {
                gameSec.classList.remove('hidden');
                btnGame.className = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-pink-600 text-white shadow-lg shadow-pink-600/30 flex items-center gap-2";
                initGame();
            } else if (tab === 'shooting-stars') {
                starsSec.classList.remove('hidden');
                btnStars.className = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 bg-pink-600 text-white shadow-lg shadow-pink-600/30 flex items-center gap-2";
                initStarsGame();
            }
        }
