import Holder from './holder.js';
import Fn from './functions.js';
const fn = new Fn();

export default class Chess {
    constructor() {
        this.rows = 8
        this.cols = 8
    }

    createElement(el, identity) {
        let elm = document.createElement(el);
        const filter = identity[0];
        identity = identity.substr(1, identity.length);
        if (filter === '.') elm.classList.add(identity);
        else elm.id = identity;
        return elm;
    }

    createBoard() {
        let isHigh = false;

        let t1 = man.now();
        man.board = this.createElement('div', '#board');
        let count = 0;
        for (let rank = 0; rank < this.rows; rank++) {
            let rowEl = this.createElement('div', '.row');
            for (let file = 0; file < this.cols; file++) {
                const holder = new Holder(rank, file, count);
                holder.build(isHigh);
                rowEl.appendChild(holder.elm());
                man.holders.push(holder);
                isHigh = !isHigh;
                count++;
            }
            isHigh = !isHigh;
            man.board.appendChild(rowEl);
        }
        document.body.insertBefore(man.board, fn.elm('#resultArea'));
        let t2 = man.now();
        console.log('[*] Building chess :', man.diff(t1, t2));
    }

}