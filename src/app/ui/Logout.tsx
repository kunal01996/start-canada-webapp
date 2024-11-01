import React from 'react'
import { signOut } from '../../auth';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';

export default function Logout() {
    return (
        <form action={async () => {
            'use server'
            await signOut();
        }}>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon
                        sx={[
                            {
                                minWidth: 0,
                                justifyContent: 'center',
                            },
                            {
                                mr: 3,
                            }
                        ]}
                    >
                        <LogoutIcon />
                    </ListItemIcon>
                    <Button type='submit'>
                        <ListItemText
                            primary={'Logout'}
                            sx={[
                                {
                                    opacity: 1,
                                }
                            ]}
                        />
                    </Button>
                </ListItemButton>
            </ListItem>
        </form>
    )
}