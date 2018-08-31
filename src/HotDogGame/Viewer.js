import React from 'react';

const Viewer = (props) => (
    <div className="col-sm-12 col-md-8 col-lg-6" style={{"paddingBottom": "10px"}}>
        <img src={props.imgUrl} alt="Smiley face" style={{"maxHeight":"300px", "maxWidth":"450px"}}></img>
    </div>
)

export default Viewer;
