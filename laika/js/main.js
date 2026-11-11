window.onload = function () {
    Progress.init();
    ['g', 's'].forEach(p => {
        document.getElementById('laika-slot-' + p).innerHTML = laikaHTML(p);
        document.getElementById('dash-slot-' + p).innerHTML = dashHTML(p);
        bindTilt(p); renderDash(p);
    });
    renderChapter();
    laikaSay('g', '¡Hola, amiguita! Soy la Profesora Laika.', 'idle', false);
};
