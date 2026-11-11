// Saves progress in the browser (localStorage) so children can continue later.
const Progress = {
    total: rawNounsDatabase.length, d: null,
    init() {
        rawNounsDatabase.forEach((n, i) => n.id = i);
        try { this.d = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) {}
        if (!this.d || this.d.total !== this.total || !this.d.blk) this.reset(); else ST.g = this.d.blk;
    },
    reset() {
        const order = rawNounsDatabase.map(n => n.id).sort(() => Math.random() - 0.5);
        this.d = {total: this.total, order, res: {}, score: 0, best: 0, blk: mk()};
        ST.g = this.d.blk; this.save();
    },
    save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.d)); } catch (e) {} },
    answered() { return Object.keys(this.d.res).length; },
    correct() { return Object.values(this.d.res).filter(v => v === 1).length; },
    next(cat) {
        const id = this.d.order.find(i => this.d.res[i] === undefined && (cat === 'all' || rawNounsDatabase[i].category === cat));
        return id === undefined ? null : rawNounsDatabase[id];
    },
    record(id, ok) {
        const d = this.d, b = d.blk; d.res[id] = ok ? 1 : 0; b.n++;
        if (ok) { b.ok++; b.streak++; b.score += 10; d.score += 10; } else { b.bad++; b.streak = 0; }
        b.best = Math.max(b.best, b.streak); d.best = Math.max(d.best || 0, b.best); this.save();
    },
    newBlock() { const o = this.d.blk; this.d.blk = Object.assign(mk(), {streak: o.streak, best: o.best}); ST.g = this.d.blk; this.save(); },
    retryWrong() { for (const k in this.d.res) if (this.d.res[k] === 0) delete this.d.res[k]; this.newBlock(); }
};
function resetProgress() {
    if (!confirm('¿Empezar de nuevo todas las palabras?')) return;
    Progress.reset(); gameRun++; stopSpeech(); loadNextQuestion();
}
