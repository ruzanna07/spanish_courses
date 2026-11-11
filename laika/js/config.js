const ROUND = 10;                       // results are shown after every 10 words
const SAVE_KEY = 'laika-progress-v1';
const LAIKA_IMG = "./data/doggy1.png";
const mk = () => ({score:0, streak:0, best:0, ok:0, bad:0, n:0});
const ST = {g: mk(), s: mk()};          // stats of the current block of 10
let gameRun = 0;                        // bumped on tab/category change so old timers do nothing
