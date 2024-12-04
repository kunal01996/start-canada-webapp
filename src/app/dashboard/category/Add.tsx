"use client";

import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Drawer, FormControlLabel, IconButton, Switch, TextField, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { GenerateNotification } from "@/components/Notification";

// Define types for the props of AddCategory
interface AddCategoryProps {
    setNotification: (notification: Notification.SuccessNotification | Notification.ErrorNotification | null) => void;
    notification: Notification.SuccessNotification | Notification.ErrorNotification | null;
    setReload: () => void;
    catToEdit?: Database.QuizCategory | undefined
    setCatToEdit?: (value: Database.QuizCategory | null) => void
}

// Define the type for form data
interface FormData {
    name: string;
    description: string;
    isEnabled: boolean;
}

export default function AddCategory({
    setNotification,
    notification,
    setReload,
    catToEdit,
    setCatToEdit
}: AddCategoryProps) {
    // State to control the drawer open/close
    const [open, setOpen] = useState<boolean>(!!catToEdit);

    // State to manage form data
    const [formData, setFormData] = useState<FormData>({
        name: catToEdit?.name || '',
        description: catToEdit?.description || '',
        isEnabled: catToEdit?.isEnabled || true,
    });

    // Handle input change for form fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    useEffect(() => {
        
        setFormData({
            name: catToEdit?.name || '',
            description: catToEdit?.description || '',
            isEnabled: !!catToEdit?.isEnabled,  
        })
        setOpen(!!catToEdit)

    }, [catToEdit])

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form Data:', formData);

        try {
            // Make API call to the POST endpoint
            const response = await fetch('/api/dashboard/category', {
                method: catToEdit?.id ? 'PATCH' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id: catToEdit ? catToEdit.id : undefined
                }),
            });

            const data = await response.json();

            if (data.error) {
                setNotification({
                    type: 'error',
                    message: `Error: ${data.error}`,
                });
            } else {
                setNotification({
                    type: 'success',
                    message: catToEdit ? `${catToEdit.name} Category updated successfully!` : `${data.category.name} Category created successfully!`,
                });
                setOpen(false);
                if (setCatToEdit) {
                    setCatToEdit(null)
                }
                setReload()
            }
        } catch (error: unknown) {
            // Handle error with specific type checks
            if (error instanceof Error) {
                setNotification({
                    type: 'error',
                    message: error.message || 'An unexpected error occurred.',
                });
            } else {
                setNotification({
                    type: 'error',
                    message: 'An unexpected error occurred.',
                });
            }
        }
    };

    return (
        <React.Fragment>
            {
                !catToEdit ? (
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                        setNotification(null);
                        setOpen(true);
                    }}>
                        Add Category
                    </Button>
                ) : null
            }
            <Drawer
                anchor="right"
                open={open}
                onClose={() => { setOpen(false); }}
                sx={{
                    '.MuiPaper-root.MuiDrawer-paper': {
                        width: '70%',
                    },
                }}
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            { catToEdit ? 'Edit Category' : 'Add Category' }
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => { setOpen(false); }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ padding: '2rem' }}>
                    {notification && (
                        <GenerateNotification notification={notification} />
                    )}
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
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
