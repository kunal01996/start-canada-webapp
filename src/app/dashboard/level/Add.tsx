"use client"

import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Drawer, FormControlLabel, IconButton, MenuItem, Skeleton, Switch, TextField, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { GenerateNotification } from "@/components/Notification";

interface AddCategoryProps {
    setNotification: (notification: Notification.SuccessNotification | Notification.ErrorNotification | null) => void;
    notification: Notification.SuccessNotification | Notification.ErrorNotification | null;
    setReload: () => void
    levelToEdit?: Database.QuizLevel | undefined,
    setLevelToEdit?: (param: Database.QuizLevel | null) => void
}

// Define the type for form data
interface FormData {
    name: string;
    description: string;
    category: string | number;
    subCategory: string | number;
    isEnabled: boolean;
}

export default function AddLevel({
    setNotification,
    notification,
    setReload,
    levelToEdit,
    setLevelToEdit
}: AddCategoryProps) {

    // State to control the drawer open/close
    const [open, setOpen] = useState<boolean>(false);

    // State to manage form data
    const [formData, setFormData] = useState<FormData>({
        name: levelToEdit?.name || '',
        description: levelToEdit?.description || '',
        category: levelToEdit?.categoryId || '',
        subCategory: levelToEdit?.subCategoryId || '',
        isEnabled: levelToEdit?.isEnabled || true,
    });

    const [categories, setCategories] = useState<Array<Database.QuizCategory>>([])
    const [categoryStatus, setCategoryStatus] = useState('UNINIT')

    useEffect(() => {

        setFormData({
            name: levelToEdit?.name || '',
            description: levelToEdit?.description || '',
            category: levelToEdit?.categoryId || '',
            subCategory: levelToEdit?.subCategoryId || '',
            isEnabled: !!levelToEdit?.isEnabled,
        })
        setOpen(!!levelToEdit)

    }, [levelToEdit])

    const fetchCategory = async () => {
        try {
            setCategoryStatus('IN_PROGRESS')
            const response = await fetch(`/api/dashboard/category/all`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCategories(data.categories);
            setCategoryStatus('SUCCESS')
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategoryStatus('ERROR')
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    // Handle input change for form fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Make API call to the POST endpoint
            const response = await fetch('/api/dashboard/level', {
                method: levelToEdit?.id ? 'PATCH' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id: levelToEdit ? levelToEdit.id : undefined
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
                    message: levelToEdit ? `${levelToEdit.name} Level updated successfully!` : `${data.category.name} Level created successfully!`,
                });
                setOpen(false);
                if (setLevelToEdit) {
                    setLevelToEdit(null)
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

    let body = <></>

    if (categoryStatus === "IN_PROGRESS") {
        body = <Skeleton variant="rectangular" />
    } else if (categoryStatus === "SUCCESS") {
        body = (
            <>
                <Box sx={{ padding: '2rem' }}>
                    {notification && (
                        <>
                            <GenerateNotification notification={notification} />
                            <br />
                        </>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Choose Category"
                            fullWidth
                            required
                            margin="normal"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Choose Sub-Category"
                            fullWidth
                            required
                            margin="normal"
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleChange}
                        >
                            {categories.find(category => category.id.toString() === formData.category.toString())?.subcategories.map((subCategory) => (
                                <MenuItem key={subCategory.id} value={subCategory.id}>
                                    {subCategory.name}
                                </MenuItem>
                            ))}
                        </TextField>
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
            </>
        )
    } else if (categoryStatus === 'ERROR') {
        body = <GenerateNotification notification={{
            message: 'Could not load Categories',
            type: 'error'
        }} />
    }

    return (
        <React.Fragment>
            {
                !levelToEdit ? (
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                        Add Level
                    </Button>
                ) : null
            }
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
                        { levelToEdit ? 'Edit Level' : 'Add Level' }
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

                {body}

            </Drawer>
        </React.Fragment>
    )
}