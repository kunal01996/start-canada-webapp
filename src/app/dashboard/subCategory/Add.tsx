"use client"

import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, Drawer, IconButton, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';

export default function AddSubCategory() {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <React.Fragment>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                Add Category
            </Button>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => { setOpen(false) }}
                sx={{
                    '.MuiPaper-root.MuiDrawer-paper': {
                        width: '70%'
                    }
                }}
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Add Sub-Category
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Drawer>
        </React.Fragment>
    )
}