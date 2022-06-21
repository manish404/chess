class Fn {
    constructor() { }
    poss = (val, n) => [val + n, val - n];

    isAllowed(holder, color) {
        if (holder.isEmpty() || (!holder.isEmpty() && holder.piece.color !== color)) return true;
        return false;
    }

    edges(rank, file) {
        // leftEdge, rightEdge, topEdge, downEdge;
        return {
            lE: man.edges.row.left[rank],
            rE: man.edges.row.right[rank],
            tE: man.edges.col.top[file],
            dE: man.edges.col.down[file]
        };
    }

    allDir_HV(args) {
        // any step horizontally or vertically;
        const { val, rank, file, color } = args;
        let { lE, rE, tE, dE } = this.edges(rank, file);
        let res = [[], [], [], []];
        for (let i = val - 1; i >= lE; i--) res[0].push(i);
        for (let i = val + 1; i <= rE; i++) res[1].push(i);
        for (let i = val - 8; i >= tE; i -= 8) res[2].push(i);
        for (let i = val + 8; i <= dE; i += 8) res[3].push(i);
        // ...
        // let hs = [];
        res = res.reduce((acc, list) => {
            if (list.length === 0) return acc;
            for (let e of list) {
                const holder = man.holders[e];
                if (!holder.isEmpty()) {
                    if (holder.piece.color === color) {
                        break;
                    } else if (holder.piece.color !== color) {
                        acc.push(holder);
                        break;
                    }
                } else {
                    acc.push(holder);
                }
            }
            return acc;
        }, []);
        return res.flat();
    }

    possList(range, val, n) {
        // builds positive and negative numbers in range;
        let res = [];
        for (let i = 0; i < range; i++) {
            val += n;
            if (val >= 0 && val < 64) res.push(val);
            if (man.allEdges.includes(val)) break;
            // stops from multiple loops, if val reaches to edge;
        }
        return res;
    }
    allDir_D(args) {
        // any step diagonally;
        const { val, rank, file, color } = args;
        let { lE, rE, tE, dE } = this.edges(rank, file);
        // left range, right range
        let lR = val - lE, rR = rE - val;
        let res = [this.possList(lR, val, 7), this.possList(rR, val, -7), this.possList(lR, val, -9), this.possList(rR, val, 9)];
        // res = [] + down-left + top-right + top-left + down-right
        // ...
        res = res.reduce((acc, list) => {
            if (list.length === 0) return acc;
            for (let e of list) {
                const holder = man.holders[e];
                if (!holder.isEmpty()) {
                    if (holder.piece.color === color) break;
                    else if (holder.piece.color !== color) {
                        acc.push(holder);
                        break;
                    }
                } else acc.push(holder);
            }
            return acc;
        }, []);
        return res;
    }
}

const fn = new Fn();

// CLASS MOVE ------------
export default class Move {
    constructor() { }
    king(args) {
        // king = one step in all direction;
        const { val } = args;
        let res = [].concat(fn.poss(val, 1), fn.poss(val, 7), fn.poss(val, 9), fn.poss(val, 8));
        let filter = [];
        if (man.edges.row.left.includes(val)) filter = man.edges.row.right;
        else if (man.edges.row.right.includes(val)) filter = man.edges.row.left;
        res = res.reduce((acc, v) => {
            if (!filter.includes(v) && v >= 0 && v < 64) {
                const holder = man.holders[v];
                if (fn.isAllowed(holder, args.color)) {
                    acc.push(holder);
                }
            }
            return acc;
        }, []);
        return res;
    }

    queen(args) {
        return fn.allDir_HV(args).concat(fn.allDir_D(args));
    }

    bishop(args) {
        return fn.allDir_D(args);
    }

    rook(args) {
        return fn.allDir_HV(args);
    }

    knight(args) {
        const { val, rank, color } = args;
        let res = [[val - 17, val - 15], [val - 10, val - 6], [val + 6, val + 10], [val + 15, val + 17]];
        const ops = [-2, -1, 1, 2];
        // let hs = [];
        res = res.reduce((acc, arr, i) => {
            let pos = rank + ops[i];
            const lE = man.edges.row.left[pos];
            const rE = man.edges.row.right[pos];
            for (let n of arr) if (n >= lE && n <= rE) {
                const holder = man.holders[n];
                if (holder.isEmpty() || !holder.isEmpty() && holder.piece.color !== color) {
                    acc.push(holder);
                }
            }
            return acc;
        }, []);
        return res;
    }

    pawn(args) {
        // make able to capture opponent if opp is in forward-diagonal;
        // make able to promote to other pieces(except king) when reaches opposite diagonal;
        const { val, color, rank } = args;
        let res = [];
        if (color === 'black') {
            if (rank === 1) res.push([val + 8, val + 16]);
            else res.push([val + 8]);
        } else {
            if (rank === 6) res.push([val - 8, val - 16]);
            else res.push([val - 8]);
        }
        res = res.reduce((acc, list) => {
            for (let e of list) {
                const holder = man.holders[e];
                if (!holder.isEmpty()) return acc;
                acc.push(holder);
            }
            return acc;
        }, []);
        return res;
    }
}