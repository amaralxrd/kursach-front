import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@mui/material';

import classes from './Header.module.scss'
import { Box } from '@mui/system';

const routes = [
    {
        id: 0,
        href: "/tariff",
        text: "Тариф"
    },
    {
        id: 1,
        href: "/coworking",
        text: "Коворкинг"
    },
    {
        id: 2,
        href: "/ticket",
        text: "Билеты"
    },
]

const Header = () => {
    return (
        <AppBar className={classes.container}>
            <Toolbar>
                <Box sx={{display: 'flex', justifyContent: 'space-between', maxWidth: 330, width: '100%'}}>
                    {routes.map(item =>
                        <Link key={item.id} to={item.href}>
                            <Typography variant="v5" color="white">
                                {item.text}
                            </Typography>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar >
    );
};

export default Header;