
// default export ai class to use in the project with import
export default class Ai {
    // constructor gets game object
    constructor(game) {
        this.game = game;
    }
    // does one move of ai player
    doMove() {
        // whole history and current frame
        const history = this.game.state.history.slice();
        const current = history[this.game.state.stepNumber];

        // array of possible moves
        let moves = [];
        //
        current.cells.forEach((element, index) => {
            if (!element) {
                let newBoard = this.game.flipCells(current.cells, index, false);
                if (newBoard) {
                    const oNumbers = newBoard.reduce((acc, current) => { return current === 'O' ? acc + 1 : acc }, 0);
                    moves.push({ 'index': index, 'number': oNumbers });
                }
            }
        });
        // sort moves
        moves = moves.sort((a, b) => { return b.number - a.number });

        // if moves not empty, return first option ("best option")
        if (moves.length > 0) {
            return moves[0].index;
        } else {
            return null;
        }
    }
}