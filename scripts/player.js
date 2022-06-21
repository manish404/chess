import Piece from "./piece.js";
import Fn from "./functions.js";
const fn = new Fn();

const _pieces = [
    // id_name
    'R_Rook',
    'N_Knight',
    'B_Bishop',
    'Q_Queen',
    'K_King',
    'B_Bishop',
    'N_Knight',
    'R_Rook'
];
const _pawn = 'P_Pawn';

export default class Player {
    constructor(id, name, color) {
        this.id = id
        this.name = name
        this.color = color
        this.score = 0
        this.pieces = []
    }

    appendChildren(childrens) {
        childrens.forEach(child => {
            this.elm.appendChild(child);
        });
    }

    setUp() {
        this.elm = fn.elm(`div#player${this.id}`);
        const id = fn.newElement('div', 'id', 'ID : ' + this.id);
        const name = fn.newElement('div', 'name', 'Name : ' + this.name);
        const score = fn.newElement('div', 'score', 'Score : ' + this.score);
        const count = fn.newElement('div', 'count', 'Pieces : ' + this.pieces.length);
        const color = fn.newElement('div', 'color', 'Color : ' + this.color);
        this.appendChildren([id, name, score, count, color]);
    }

    // MUST MINIMIZE THIS PROCESS
    setPieces(min) {
        // set pieces initially;
        let t1 = man.now(); // ...
        let max = min + 15;
        for (let i = min; i <= max; i++) {
            const holder = man.holders[i];
            // review again this, if possible;
            const name = (i >= 8 && i <= 55) ? _pawn : i <= 7 ? _pieces[i] : _pieces[i - 56];
            const piece = new Piece(name, this.color, holder.pos());
            holder.piece = piece;
            this.pieces.push(piece);
            holder.buildPiece();
        }
        this.setUp();
        let t2 = man.now(); // ...
        console.log(`[*] Setting up player ${this.id} + UI : `, man.diff(t1, t2));
    }
}


/*
setPieces() {
        // const makePiece = (i, cons, name) => {
        //     const holder = man.holders[i + cons];
        //     // index = index ? index : i;
        //     // name = name ? name : _pieces[i];
        //     const piece = new Piece(name, this.color, holder.pos());
        //     this.pieces.push(piece);
        //     holder.piece = piece;
        //     holder.buildPiece();
        // }
        // if (this.color === 'black') {
        //     for (let i = 0; i <= 7; i++) {
        //         makePiece(i, 0, _pieces[i]);
        //         makePiece(i, 8, _pawn);
        //     }
        // } else {
        //     for (let i = 0; i <= 7; i++) {
        //         makePiece(i, 48, _pawn);
        //         makePiece(i, 56, _pieces[i]);
        //     }
        // }
}
*/