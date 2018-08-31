import React, { Component } from 'react'
import ListItem from './ListItem.js';
import HotdogAlert from './HotdogAlert'

class List extends Component {

    render() {
        const found = this.props.items.find(function(item, idx) {
            return item.name == 'hotdog';
        });
        let comp_alert;

        if (found) {
            comp_alert = <HotdogAlert val={'hotdog'}/>;
        } else if(this.props.items.length > 0){
            comp_alert = <HotdogAlert val={'nothotdog'}/>;
        }

        return (
            <div className="col-md-4 col-lg-6">
                <div style={{ "color": "#000000"}}>

                    <div>
                        {comp_alert}
                    </div>
                </div>
            </div>
        );
    }
}

List.propTypes = {};

export default List;

// import React from 'react';
// import ListItem from './ListItem.js';
// import HotdogAlert from './HotdogAlert'
//
// const found = props.items.find(function(item, idx) {
//     return item.name == 'hotdog';
// });
//
// const List = (props) => (
//     <div className="col-md-4 col-lg-6">
//         <div style={{ "color": "#000000"}}>
//
//             return (
//             <div>
//                 {found ? (
//                     <HotdogAlert val={'hotdog'}/>
//                 ) : (
//                     <HotdogAlert val={'nothotdog'}/>
//                 )}
//             </div>
//             );
//             {/*{ props.items.map(*/}
//                 {/*(item, idx) =>*/}
//                     {/*item.name == 'hotdog' && item.value >= 99 ? <HotdogAlert val={'hotdog'}/>: <HotdogAlert val={'nothotdog'}/>*/}
//             {/*)}*/}
//         </div>
//     </div>
// )
//
// export default List;