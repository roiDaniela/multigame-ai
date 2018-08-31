import React from 'react';

// default export cell to use in the project with import
export default function Cell(props) {
    //
    var cellsClasses = `cell ${props.isAvailable ? 'available-cell' : 'not-available-cell'}`;
    //
    var colorMarkerClasses = props.value === 'X' ? 'marker white' : props.value === 'O' ? 'marker black' : '';

    return (
        //
        <div className={cellsClasses} onClick={props.onClick}>
            {props.value ? <div className={colorMarkerClasses}></div> : ''}
        </div>
    );
}