"use client"; // Marking this component as a client component
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TextField,
    Typography,
    Stack,
    Chip,
    IconButton
} from '@mui/material';
import Image from 'next/image';
import ModeIcon from '@mui/icons-material/Mode';

const CategoryList = ({ reloadKey, setToEdit }: { reloadKey: number, setToEdit: (Catgeory: Database.QuizCategory) => void }) => {
    const [Category, setCategory] = useState<Array<Database.QuizCategory>>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCategory = async (page: number, limit: number, search: string) => {
        try {
            const response = await fetch(`/api/dashboard/category?page=${page + 1}&limit=${limit}&search=${search}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCategory(data.categories);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategory(page, rowsPerPage, searchTerm);
    }, [page, rowsPerPage, searchTerm, reloadKey]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0); // Reset to the first page on search
    }

    return (
        <Stack gap={4}>
            <TextField
                variant="outlined"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
            />
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant='h6'>S.No</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Image</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Name</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Description</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Is Enabled</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Created At</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Action</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Category.length ? Category.map((Category, index) => (
                                <TableRow key={Category.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {Category.image ? (
                                            <Image
                                                src={Category.image}
                                                alt={Category.name}
                                                style={{ width: 50, height: 50, borderRadius: '50%' }} // Example styles for the image
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{Category.name}</TableCell>
                                    <TableCell>{Category.description}</TableCell>
                                    <TableCell>{Category.isEnabled ? (<Chip label="Enabled" color='success' />) : <Chip label='Disabled' color='error' />}</TableCell>
                                    <TableCell>{new Date(Category.createdAt || '')?.toLocaleDateString() || '-'}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="add an alarm" onClick={() => setToEdit(Category)}>
                                            <ModeIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Typography align="center" color="text.secondary">
                                            No data available
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalPages * rowsPerPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Stack>
    );
};

export default CategoryList;
