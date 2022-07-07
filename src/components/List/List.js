import React from 'react';

import classes from './List.module.scss'

const List = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default List;