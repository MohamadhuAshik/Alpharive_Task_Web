import React, { useContext, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from "@mui/material";
import UserDetails from "./UserDetails";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import API_Services from '../api/apiServices';
import DataContext from '../context/DataContext';


const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: 'lightblue',
    color: '#000',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Home = () => {
    const { isLogin, setIsLogin, users, handleUserClickWithHeading, selectedUserName, selectedUserMobile, getAlluser, loginUserName, loginUserEmail, getSpecificUser, loginUserId, setUsers, setLoginUsername, setLoginUserEmail, setLoginUserId } = useContext(DataContext)

    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const theme = useTheme();

    const handleLogout = () => {
        localStorage.clear();
        setIsLogin(false);
        setUsers([])
        setLoginUsername("")
        setLoginUserEmail("")
        setLoginUserId("")
        navigate("/");
    };

    useEffect(() => {
        getAlluser()
    }, [])
    useEffect(() => {
        getSpecificUser()
    }, [])
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar className='p-2'>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='d-flex flex-column'>
                            <Typography variant="h6" noWrap>
                                {selectedUserName?.toUpperCase() || ""}
                            </Typography>
                            <Typography variant='caption'>{selectedUserMobile || ""}</Typography>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <div className='d-flex flex-column justify-content-center align-items-center p-2'>
                        <Avatar sx={{ width: 56, height: 56 }} >{loginUserName[0]}</Avatar>

                        <h3 className='mt-2'> {loginUserName}</h3>
                        <h5>{loginUserEmail}</h5>

                    </div>
                    <Divider sx={{ borderWidth: 1, borderColor: 'black' }} />
                    <List className='mt-2'>
                        {users.map((user) => (
                            <ListItem key={user._id} disablePadding>
                                <ListItemButton onClick={() => handleUserClickWithHeading(user._id, user.name, user.mobile)}>
                                    <Avatar sx={{ mr: 2 }}>{user.name[0]}</Avatar>
                                    <ListItemText primary={loginUserId === user._id ? "YOU" : user.name.toUpperCase()} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider />
                        <Box sx={{ flexGrow: 1 }} >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Routes>
                        <Route path="/user/:id" element={<UserDetails users={users} />} />
                    </Routes>
                </Main>
            </Box>
        </>
    )
}

export default Home