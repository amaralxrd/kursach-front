import React from 'react';

import classes from './Sidebar.module.scss'

const Sidebar = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default Sidebar;