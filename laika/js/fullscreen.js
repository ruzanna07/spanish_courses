        function closeFSUI() {
            document.querySelectorAll('.fs-host').forEach(h => h.classList.remove('fs-on'));
            document.body.style.overflow = '';
            document.querySelectorAll('.fs-btn[id^=fsb-]').forEach(b => b.textContent = '⛶ Pantalla completa');
        }
        function exitFS() { closeFSUI(); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
        function toggleFS(p) {
            const el = document.getElementById('fs-' + p);
            if (el.classList.contains('fs-on')) { exitFS(); return; }
            el.classList.add('fs-on'); document.body.style.overflow = 'hidden';
            document.getElementById('fsb-' + p).textContent = '✖ Salir';
            try { const r = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); if (r && r.catch) r.catch(() => {}); } catch (e) {}
        }
        document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) closeFSUI(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFSUI(); });

        function bindTilt(p) {
            const s = document.getElementById('stage-' + p), t = document.getElementById('tilt-' + p);
            s.addEventListener('mousemove', e => {
                const r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
                t.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
            });
            s.addEventListener('mouseleave', () => t.style.transform = '');
        }
