// src/components/UserList.tsx
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
  Chip
} from '@mui/material';
import Image from 'next/image';

const UserList = () => {
  const [users, setUsers] = useState<Array<Database.User>>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async (page: number, limit: number, search: string) => {
    try {
      const response = await fetch(`/api/dashboard/users?page=${page + 1}&limit=${limit}&search=${search}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage, searchTerm);
  }, [page, rowsPerPage, searchTerm]);

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
        placeholder="Search by name or email"
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
                <TableCell><Typography variant='h6'>Email</Typography></TableCell>
                <TableCell><Typography variant='h6'>Gender</Typography></TableCell>
                <TableCell><Typography variant='h6'>DOB</Typography></TableCell>
                <TableCell><Typography variant='h6'>Country</Typography></TableCell>
                <TableCell><Typography variant='h6'>Status</Typography></TableCell>
                <TableCell><Typography variant='h6'>Date of Joining</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length ? users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.firstName}
                        style={{ width: 50, height: 50, borderRadius: '50%' }} // Example styles for the image
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </TableCell>
                  <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{new Date(user.dob || '')?.toLocaleDateString() || '-'}</TableCell>
                  <TableCell>{user.countryOfOrigin}</TableCell>
                  <TableCell>{user.isEnabled ? (<Chip label="Enabled" color='success' />) : <Chip label='Disabled' color='error' />}</TableCell>
                  <TableCell>{new Date(user.createdAt)?.toLocaleDateString() || '-'}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={9}>
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

export default UserList;
