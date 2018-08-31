import React from 'react';
import Cell from './Cell.js';

// default export Board class to use in the project with import
export default class Board extends React.Component {
    // render a single ell
    renderCell(i) {
        return (
            <Cell key={i} isAvailable={this.props.availableMoves.indexOf(i) > -1}
                  value={this.props.cells[i]} onClick={() => this.props.onClick(i)} />
        );
    }

    // render board using render cell
    render() {
        // run on rows
        const rows = [];
        for (let r = 0; r < 8; r++) {
            // run on cols
            const cols = [];
            for (let c = 0; c < 8; c++) {
                // add cell to cols, the col composed of cells
                cols.push(this.renderCell(c + (r * 8)))
            }
            // add row to rows with key, the row composed of cols
            rows.push(<div className="board-row" key={r}>{cols}</div>);
        }
        // the board composed of rows
        return (<div>{rows}</div>);
    }
}