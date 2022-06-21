import Move from "./move.js";
let move = new Move;

const _funcs = {
    'king': move.king,
    'queen': move.queen,
    'bishop': move.bishop,
    'knight': move.knight,
    'rook': move.rook,
    'pawn': move.pawn
};
move = null;

export default class Piece {
    constructor(name, color, pos) {
        this.name = name
        this.color = color
        this.value = null
        this.pos = pos      // holder's position;
        this.possibleMoves = null    // boxes' ID where we can move our selected piece;
        // this.holders = []     //holders allowed to accept move;
        this.method = null
        this.build()
        // ...
        this.extraFn()
    }

    extraFn() {
        // extra requirements and bindings for exceptional cases;
        if (this.name === 'R_Rook' || this.name === 'K_King') {
            this.hasMoved = false;
        }
    }

    addEvent() {
        // assigning function for piece using name;
        const name = this.name.substring(2, this.name.length).toLowerCase();
        this.method = _funcs[name];
        // ...
        const allowMoves = () => {
            man.selectedPiece = this;
            if (!this.possibleMoves) this.possibleMoves = this.generatePossibleMoves();
            if (!this.possibleMoves) {
                console.log('[x] No moves allowed!');
                return;
            }
            this.showMoves();
        }
        const rejectMoves = () => {
            man.selectedPiece = null;
            if (this.possibleMoves) this.hideMoves();
        }
        // ...
        this.piece.addEventListener('dragstart', () => allowMoves());
        this.piece.addEventListener('dragend', () => rejectMoves());
        this.piece.addEventListener('click', () => console.log('clicked'));
    }

    // onClick() {
    //     let clicked = false;
    //     // works perfectly! (not showing possible move for any other piece, if is already showing);
    //     console.log('b>> ', man.isShowingMoves, clicked);
    //     if (man.isShowingMoves && !clicked) return;
    //     if (!man.isShowingMoves) allowMoves();
    //     else rejectMoves();
    //     // REVIEW HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     // 
    //     if (!this.possibleMoves) return;
    //     clicked = !clicked;
    //     man.isShowingMoves = !man.isShowingMoves;
    //     console.log('a>> ', man.isShowingMoves, clicked);
    // }

    showMoves() {
        console.log('  [+] Showing possible moves;');
        this.possibleMoves.forEach(move => {
            move.allowedDrop = true;
            move.elm().style.border = '3px solid green';
        })
    }

    hideMoves() {
        if (!this.possibleMoves) return;
        console.log('\t [-] Hiding possible moves;');
        this.possibleMoves.forEach(move => {
            move.allowedDrop = false;
            move.elm().style.border = '';
        });
        this.possibleMoves = null;
    }

    generatePossibleMoves() {
        console.log(`[+] Generating new possible moves; \t (${this.name})`);
        let moves = null;
        const { rank, file } = this.pos;
        const t1 = man.now();
        moves = this.method({
            'val': this.value,
            'color': this.color,
            rank,
            file
        });
        const t2 = man.now();
        console.log('\t [!] Time taken :', (t2 - t1).toFixed(2), 'ms');
        return moves.length > 0 ? moves : null;
    }

    setImage() {
        const name = this.color[0] + this.name[0];
        this.piece.style.backgroundImage = `url(./pieces/${name}.png)`;
    }

    build() {
        this.piece = fn.newElement('div');
        this.piece.classList.add('piece');
        this.piece.draggable = true;
        this.setImage();
        this.addEvent();
    }

    elm() {
        return this.piece;
    }

    setValue(val) {
        this.value = val;
    }
}