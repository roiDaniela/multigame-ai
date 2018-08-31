import React from 'react';
import Board from './Board.js';
import Ai from './Reversiai.js';
import './style.css'

// default export game class to use in the project with import
export default class Game extends React.Component {
    // construct a game
    constructor(props) {
        super(props);
        // init ai
        this.ai = new Ai(this);
        // init the cells, 2 white and 2 black in the middle (rows 3,4 cols 3,4)
        const initCells = Array(64).fill(null);
        [initCells[8 * 3 + 3], initCells[8 * 3 + 4], initCells[8 * 4 + 4], initCells[8 * 4 + 3]] = ['X', 'O', 'X', 'O'];

        this.state = {
            // init history - 2 white and 2 black in the middle
            history: [{
                cells: initCells,
                xNumbers: 2,
                oNumbers: 2,
                xWasNext: true
            }],
            // num of step
            stepNumber: 0,
            // if next turn is x
            xIsNext: true,
            // if ai
            blackisAi: true
        }
    }
    // check who is the winner by given num of x and o soldiers
    calculateWinner(xNumbers, oNumbers) {
        // case x and o didn't fill the whole board (64 cells) so null. else, if num x = num o tie,
        // else, if num x > num o return x else return o
        return (xNumbers + oNumbers < 64) ? null : (xNumbers === oNumbers) ? 'XO' : (xNumbers > oNumbers ? 'X' : 'O');
    }
    // flip cells by given cells arr, starting position and if next turn is x
    flipCells(cells, position, xIsNext) {
        // if change board
        let modifiedBoard = null;
        // calculate row and col of the starting position
        let [startX, startY] = [position % 8, (position - position % 8) / 8];
        // if starting position not empty return null
        if (cells[position] !== null) {
            return null;
        }

        // iterate all directions, these numbers are the offsets in the array to reach next cell
        [1, 7, 8, 9, -1, -7, -8, -9].forEach((offset) => {
            // if modified
            let flippedCells = modifiedBoard ? modifiedBoard.slice() : cells.slice();
            // if at least one flipped
            let atLeastOneMarkIsFlipped = false;
            // init last  position
            let [lastXpos, lastYPos] = [startX, startY];

            //
            for (let y = position + offset; y < 64; y = y + offset) {
                // calculate the row and col of the current cell
                let [xPos, yPos] = [y % 8, (y - y % 8) / 8];
                // fix when board is breaking into a new row or col
                if (Math.abs(lastXpos - xPos) > 1 || Math.abs(lastYPos - yPos) > 1) {
                    break;
                }
                // case next cell was occupied with the opposite color
                if (flippedCells[y] === (!xIsNext ? 'X' : 'O')) {
                    flippedCells[y] = xIsNext ? 'X' : 'O';
                    atLeastOneMarkIsFlipped = true;
                    [lastXpos, lastYPos] = [xPos, yPos];
                    continue;
                }
                // case next cell was occupied with the same color
                else if ((flippedCells[y] === (xIsNext ? 'X' : 'O')) && atLeastOneMarkIsFlipped) {
                    flippedCells[position] = xIsNext ? 'X' : 'O';
                    modifiedBoard = flippedCells.slice();
                }
                break;
            }
        });

        return modifiedBoard;
    }

    checkAvailableMoves(color, cells) {
        return cells
            .map((value, index) => {
                return this.flipCells(cells, index, color) ? index : null;
            })
            .filter((item) => {
                return item !== null;
            });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];

        if (this.calculateWinner(current.xNumbers, current.oNumbers) || current.cells[i]) {
            return;
        }

        const changedCells = this.flipCells(current.cells, i, this.state.xIsNext);

        if (changedCells === null) {
            return;
        }

        const xNumbers = changedCells.reduce((acc, current) => {
            return current === 'X' ? acc + 1 : acc
        }, 0);
        const oNumbers = changedCells.reduce((acc, current) => {
            return current === 'O' ? acc + 1 : acc
        }, 0);

        let shouldTurnColor = this.checkAvailableMoves(!this.state.xIsNext, changedCells).length > 0 ? !this.state.xIsNext : this.state.xIsNext;

        this.setState({
                history: history.concat([{
                    cells: changedCells,
                    xNumbers: xNumbers,
                    oNumbers: oNumbers,
                    xWasNext: shouldTurnColor
                }]),
                stepNumber: history.length,
                xIsNext: shouldTurnColor,
            },
            this.doRobotMove);
    }

    // do robot move "best move"
    doRobotMove() {
        if ((this.state.blackisAi) && (!this.state.xIsNext)) {
            var bestMove = this.ai.doMove();
            if (bestMove !== null) {
                this.handleClick(bestMove);
            }
        }
    }

    // jump to step from history
    jumpTo(step) {
        // set state details to given step
        this.setState({
            stepNumber: parseInt(step, 0),
            xIsNext: this.state.history[step].xWasNext
        });
    }

    // reset game by jumping to step 0
    resetGame() {
        // jump to step 0
        this.jumpTo(0);
        // init history
        this.setState({
            history: this.state.history.slice(0, 1)
        })
    }

    render() {
        //
        const history = this.state.history.slice();
        const current = history[this.state.stepNumber];
        // determine the winner
        let winner = this.calculateWinner(current.xNumbers, current.oNumbers);
        // go to move from history option
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <option key={move} value={move}>
                    {desc}
                </option>
            );
        });
        // select move list
        const selectMoves = () => {
            return (
                <select id="dropdown" ref={(input) => this.selectedMove = input}
                        onChange={() => this.jumpTo(this.selectedMove.value)} value={this.state.stepNumber}>
                    {moves}
                </select>
            )
        };

        let availableMoves = this.checkAvailableMoves(current.xWasNext, current.cells);
        let availableMovesOpposite = this.checkAvailableMoves(!current.xWasNext, current.cells);

        if ((availableMoves.length === 0) && (availableMovesOpposite.length === 0)) {
            winner = current.xNumbers === current.oNumbers ? 'XO' : current.xNumbers > current.oNumbers ? 'X' : 'O';
        }

        let status =
            winner ?
                (winner === 'XO') ? 'It\'s a draw' : 'The winner is ' + (winner === 'X' ? 'white' : 'black') :
                [this.state.xIsNext ? 'White\'s turn' : 'Black\'s turn', '(', availableMoves.length, ' av. moves)'].join('');

        return (
            // general game html
            <div className="reversi-game">
                {/* board part */}
                <div className="game-board">
                    <Board cells={current.cells} availableMoves={availableMoves}
                           onClick={(i) => this.handleClick(i)}/>
                </div>
                {/* info part */}
                <div className="game-info">
                    {/* white's score */}
                    <h1 className={"reversi-h1"}>White's score: {current.xNumbers}</h1>
                    {/* black's score */}
                    <h1 className={"reversi-h1"}>Black's score: {current.oNumbers}</h1>
                    {/* select move from history */}
                    <div>
                        <h1 className={"reversi-h1"}>Select a previous move:</h1>
                        <h1 className={"reversi-h1"}>{selectMoves()}</h1>
                    </div>
                    {/* checkbox if black is robot */}
                    <h1 className={"reversi-h1"}>
                        <input type="checkbox" id="checkBox" checked={this.state.blackisAi}
                               onChange={(e) => this.setState({blackisAi: !this.state.blackisAi})}></input>
                        Black is robot
                    </h1>
                    {/* button of playing again */}
                    <h1 className={"reversi-h1"}>
                        {status}&nbsp;{winner ? <button onClick={() => this.resetGame()} id="playGame">play again</button> : ''}
                    </h1>
                </div>
            </div>
        );
    }
}