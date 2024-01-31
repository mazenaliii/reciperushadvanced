'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const settings = ['Profile', 'Logout'];

function Profile() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter()


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const LogOut = async () => {
        localStorage.removeItem('Token');
        router.refresh()

    }

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                        <MenuItem key={'Profile'} style={{display: 'flex', flexDirection: 'column'}}>
                            <Link href='/profile' style={{ textAlign: "center", textDecoration: 'none', color: 'black' }}>Profile</Link>
                            {/* <button style={{ textAlign: "center", textDecoration: 'none', color: 'black' }} onClick={LogOut}>Log out</button> */}
                        </MenuItem>
                </Menu>
            </Box>
        </>
    );
}
export default Profile;
