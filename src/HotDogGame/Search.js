import React from 'react';

const Search = (props) => (
    <div style={{"paddingBottom": "10px", "paddingLeft": "20px"}}>
        <span style={{"fontSize":"2em"}}>Hotdog or !HotDog?   </span>
        <input type="button" value="Search" onClick={props.handleClick} />
        <input type="text" className="search-box form-control input-sm" placeholder="Paste image URL here" style={{maxWidth:"400px"}} onKeyPress={props.handleKeyPress}/>
    </div>
)

export default Search;