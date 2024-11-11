import React from 'react'
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import List from '@mui/material/List';

import { DrawerItems } from './DrawerItems';

import Image from 'next/image';
import Link from 'next/link';
import Logout from './Logout';
import Drawer, { DrawerHeader } from './Drawer';


export default function Sidebar() {

    return (
        <Drawer variant="permanent" open={true}>
            <DrawerHeader>
                <Image src={'/start_canada_icon.png'} alt='Start Canada Home' width={170} height={1} />
            </DrawerHeader>
            <Divider />
            <List>
                {Object.entries(DrawerItems).map(([key, value]) => (
                    <Link href={value.path} key={key}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    {
                                        justifyContent: 'initial',
                                    }
                                ]}
                            >
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
                                    {value.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={value.label}
                                    sx={[
                                        {
                                            opacity: 1,
                                        }
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
                <Divider />
                <Logout />
            </List>
        </Drawer >
    )

}