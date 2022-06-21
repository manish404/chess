import Chess from './chess.js';
import Player from './player.js';

export default class App {
    constructor() {
        this.colors = ['black', 'white']    // green is white;
    }

    init() {
        this.setUp();
        const game = new Chess();
        game.createBoard();
        this.assignPieces();
    }

    setUp() {
        // creating players...;
        // comment two lines below!!!
        man.players.push(new Player(1, 'Manish', this.colors[0]));
        man.players.push(new Player(2, 'Anish', this.colors[1]));
        // ...
        let playButton = document.querySelector('#play');
        let player1 = document.querySelector('input#player1') || 'Manish';
        let player2 = document.querySelector('input#player2') || 'Pradip';
        playButton.addEventListener('click', () => {
            if (player1.value && player2.value) {
                document.querySelector('#setup').style.display = 'none';
                man.players.push(new Player(player1.value, this.colors[0]));
                man.players.push(new Player(player2.value, this.colors[1]));
            }
        });
    }

    assignPieces() {
        // assign pieces to players;
        man.players.forEach((player, i) => player.setPieces(i * 48));
        // give first turn to white;
    }
}