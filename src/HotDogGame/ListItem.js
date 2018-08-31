import React from 'react';

const ListItem = (props) => (
    <div>
        { props.item.name }: { props.item.value }
    </div>
)

export default ListItem;