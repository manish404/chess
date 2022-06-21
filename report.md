* How is "move suggestion" implemented? \
=>      Every code is inside functions.js file, for all pieces
    * Moves must be between `0 <= move < 64`; \
.

- King :
    - King can move one step in all direction. \
    So, king will be allowed to move from king's current value i.e. `VAL` to \
        `(VAL+1), (VAL-1), (VAL+8), (VAL-8), (VAL+8), (VAL+7), (VAL-7)` \
    And, I created a function to calculate (+ and -) for `VAL` and `NUM[1,7,8]` and generated number,
    Squares with those numbers are allowed to accept king's move;

- Queen :
    - ...

** Why holders are not reduced() instead looping for all 64s for each player? \
- Reducing will loop for all 64 holders to list 16; \
    \+ again looping for 16 holders to assign pieces; \
    Total loops = `64+16 = 80` for 1 player; \
    Total for two players = `80*2 = 160`; \
    So, \
    I know black should be between `0 & 15` and white between `48 & 63`; \
    So, I need to loop only 15 (`15-0 || 53-48`) times for 1 player; \
    and assign pieces to holder too.\
    Total loops for two players = `15+15 = 30`;