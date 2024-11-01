import React from 'react'
import Toolbar from '@mui/material/Toolbar';

import { Typography } from '@mui/material';
import AppBar from './AppBar';

export default function Header() {
    return (
        <AppBar position="fixed" open={true}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Welcome
                </Typography>
            </Toolbar>
        </AppBar>
    )
}