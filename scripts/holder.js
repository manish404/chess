
/*
Castling:
    - Rook and King 's move must be first;
    - King is not in check;
    - King doesn't pass through check;
    - No pieces between king & rook;

    TODO:
        - King is moved; but is castling;
        - Not checking for pieces between king and rook;
        - Pass through check;
*/

export default class Holder {
    constructor(rank, file, value) {
        this.piece = null
        this.rank = rank    // row => rank
        this.file = file    // column => file
        this.name = this.name()
        this.allowedDrop = false
        this.value = value
    }

    build(isHigh) {
        this.box = document.createElement('div');
        if (isHigh) this.box.classList.add('high');
        else this.box.classList.add('low');
        this.box.classList.add('holder');
        this.box.innerHTML = `<span class="value">${this.value}</span>`;
        this.bindEvents();
    }

    bindEvents() {
        this.box.addEventListener('dragover', (e) => {
            e.preventDefault();     // compulsory!!!
            if (this.allowedDrop) this.box.style.backgroundColor = 'yellow';
        });
        this.box.addEventListener('dragenter', () => { });
        this.box.addEventListener('dragleave', () => {
            this.box.style.backgroundColor = '';
        });
        this.box.addEventListener('drop', () => this.onMove());
    }

    castling() {
        if (!this.piece.hasMoved) {
            if (this.piece.color === man.selectedPiece.color) {
                console.log(this.piece.name, man.selectedPiece.name);
                this.allowedDrop = true;
                // move rook to king's place;
            }
        }
    }

    onMove() {
        // CASTLING
        if (this.piece && this.piece.name === 'R_Rook' && man.selectedPiece.name === 'K_King') this.castling();
        // common drop/move event;
        if (!this.allowedDrop) return;                                      // if uncomment this, remove // same user pieces...line
        if (this.box.childElementCount > 1) this.box.removeChild(this.piece.elm());
        this.piece = man.selectedPiece;
        man.selectedPiece = null;
        man.holders[this.piece.value].piece = null;
        this.buildPiece();
        this.notify();
        this.piece.hideMoves();
        // ...
        this.box.style.backgroundColor = '';
        this.piece.possibleMoves = null;
        this.piece.holders = [];
        // this.piece = null;  // making empty; still showing in board; cause i don't need it;
        // Exceptional cases handling; (for castling);
        if (this.piece.name === 'R_Rook' || this.piece.name === 'K_King' && !this.piece.hasMoved) this.piece.hasMoved = true;
        // Reward points;
        man.turn = man.turn === 0 ? 1 : 0;
        // console.log('TURN : ', man.turn);
    }

    elm() {
        return this.box;
    }

    buildPiece() {
        if (this.piece) {
            this.piece.value = this.value;
            this.piece.pos = this.pos();
            this.box.appendChild(this.piece.elm());
        }
    }

    name() {
        return 'box_' + this.rank + '_' + this.file;
    }

    pos() {
        return { 'rank': this.rank, 'file': this.file };
    }

    isEmpty() {
        if (this.piece) return false;
        return true;
    }

    notify() {
        // shows movement of pieces;
        console.log(`\t => Moved from ${this.piece.value} -> ${this.value};`);
    }
}