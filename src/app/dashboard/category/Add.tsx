"use client"

import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Drawer, FormControlLabel, IconButton, Switch, TextField, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { GenerateNotification } from "@/components/Notification";

export default function AddCategory({
    setNotification,
    notification
}: {
    setNotification: Function,
    notification: Notification.SuccessNotification | Notification.ErrorNotification | null
}) {

    const [open, setOpen] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        name: '',
        // image: '',
        description: '',
        isEnabled: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form Data:', formData);

        try {
            // Make API call to the POST endpoint
            const response = await fetch('/api/dashboard/category', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.error) {
                setNotification({
                    type: 'error',
                    message: `Error: ${data.error}`
                })
            } else {

                setNotification({
                    type: 'success',
                    message: `${data.category.name} Category created successfully!`
                })
                setOpen(false)
            }
        } catch (error: any) {
            // Optionally, show error feedback to the user
            if (error.response?.data?.error) {
                setNotification({
                    type: 'error',
                    message: `Error: ${error.response.data.error}`
                })
            } else {
                setNotification({
                    type: 'error',
                    message: 'An unexpected error occurred.'
                })
            }
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                setNotification(null)
                setOpen(true)
            }}>
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
                            Add Category
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

                <Box
                    sx={{
                        padding: '2rem',
                    }}
                >
                    {
                        notification ? (
                            <GenerateNotification notification={notification} />
                        ) : null
                    }
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {/* <TextField
                            fullWidth
                            margin="normal"
                            label="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        /> */}
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    name="isEnabled"
                                    checked={formData.isEnabled}
                                    onChange={handleChange}
                                />
                            }
                            label="Is Enabled"
                        />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onChange={handleSubmit}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>

            </Drawer>
        </React.Fragment>
    )
}