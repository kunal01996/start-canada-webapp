import React from 'react'
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import StairsIcon from '@mui/icons-material/Stairs';
import QuizIcon from '@mui/icons-material/Quiz';
import GroupIcon from '@mui/icons-material/Group';

export const DrawerItems = {
    'Category': {
        label: 'Category',
        path: '/dashboard/category',
        icon: <CategoryIcon />
    }, 
    'SubCategory': {
        label: 'Sub Category',
        path: '/dashboard/subCategory',
        icon: <ClassIcon />
    }, 
    'Level': {
        label: 'Level',
        path: '/dashboard/level',
        icon: <StairsIcon />
    }, 
    'Quiz': {
        label: 'Quiz',
        path: '/dashboard/quiz',
        icon: <QuizIcon />
    }, 
    'Users': {
        label: 'Users',
        path: '/dashboard/users',
        icon: <GroupIcon />
    }
}