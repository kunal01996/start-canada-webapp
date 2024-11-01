import * as React from 'react';
import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import {theme} from '../theme/theme'
import Header from '../ui/Header'
import Sidebar from '../ui/Sidebar'

export default function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
        </ThemeProvider>
    );
}
