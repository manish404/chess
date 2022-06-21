export default class Manager {
    constructor() {
        this.board = null
        this.holders = []
        this.selectedPiece = null
        this.init()
        this.isShowingMoves = false
        this.initPlayers()
        this.handlePlayers()
    }

    initPlayers() {
        this.turn = 1;  // (1 || 0)
        this.players = [];
    }

    handlePlayers() {
        //    
    }

    init() {
        this.edges = {
            row: {
                left: [0, 8, 16, 24, 32, 40, 48, 56], right: [7, 15, 23, 31, 39, 47, 55, 63]
            },
            col: {
                top: [0, 1, 2, 3, 4, 5, 6, 7], down: [56, 57, 58, 59, 60, 61, 62, 63]
            }
        }
        this.all();
    }

    now() {
        return performance.now();
    }

    diff(t1, t2) {
        return (t2 - t1).toFixed(2) + ' m/s';
    }

    all() {
        const r = this.edges.row, c = this.edges.col;
        this.allEdges = [].concat(r.left, r.right, c.top, c.down);
    }

    elm(id) {
        return document.querySelector(id);
    }
}