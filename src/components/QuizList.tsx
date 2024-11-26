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
  Stack
} from '@mui/material';

const QuizList = () => {
  const [quizs, setQuizs] = useState<Array<Database.Quiz>>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchQuizs = async (page: number, limit: number, search: string) => {
    try {
      const response = await fetch(`/api/dashboard/quiz?page=${page + 1}&limit=${limit}&search=${search}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuizs(data.quizs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuizs(page, rowsPerPage, searchTerm);
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
                <TableCell><Typography variant='h6'>Category</Typography></TableCell>
                <TableCell><Typography variant='h6'>Sub Category</Typography></TableCell>
                <TableCell><Typography variant='h6'>Level</Typography></TableCell>
                <TableCell><Typography variant='h6'>Name</Typography></TableCell>
                <TableCell><Typography variant='h6'>Description</Typography></TableCell>
                <TableCell><Typography variant='h6'>Is Enabled</Typography></TableCell>
                <TableCell><Typography variant='h6'>Created At</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizs.length ? quizs.map((quiz, index) => (
                <TableRow key={quiz.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{quiz.category.name}</TableCell>
                  <TableCell>{quiz.subcategory.name}</TableCell>
                  <TableCell>{quiz.level.name}</TableCell>
                  <TableCell>{quiz.name}</TableCell>
                  <TableCell>{quiz.description}</TableCell>
                  <TableCell>{quiz.isEnabled}</TableCell>
                  <TableCell>{new Date(quiz.createdAt || '')?.toLocaleDateString() || '-'}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={8}>
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

export default QuizList;