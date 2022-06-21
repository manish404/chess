* Run with vscode live-server!

* 8 rows[1-8], 8 columns[a-h]

### 16 pieces
- Each player consists 16 pieces of:
    - one king,
    - one queen,
    - two rooks [tower],
    - two bishops [camel],
    - two knights [horse], &
    - eight pawns [soldiers]

### Moves
- King [1-step-in-all-direction]
- Rook [any-steps-in-4-direction-without-skipping-piece-in-path]
- Bishop [any-steps-diagonally]
- Queen [any-steps-in-all-direction]
- Knight [make-L-like-forward-move-(two-horizontal-one-vertical-or-vice-versa)] [can-jump-over-pieces]
- Pawn [1-or-2-step-forward-in-first-move,-1-step-forward-and-1-step-diagonal-to-capture-opponent's-piece]

### Points
- King : 
- Queen : 9
- Knight : 3
- Bishop : 3.5
- Rook : 5
- Pawn : 1

### Drag & Drop
* Used on selected element
- dragstart => element picked for dragging
- dragend => element placed

* Used on targets
- dragover => selected element is on top of target  :=> ```preventDefault() is required! to be able to drop element```
- dragenter => selected element enters on top of target
- dragleave => selected element is not on top(outside) of target
- drop => selected element is dropped in target