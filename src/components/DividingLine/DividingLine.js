import React from 'react';

import classes from './DividingLine.module.scss'

const DividingLine = () => {
    return ( 
        <div className={classes.container}>
            <div className={classes.line}></div>
        </div>
    );
};

export default DividingLine;