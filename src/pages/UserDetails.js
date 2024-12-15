import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContext';

const UserDetails = () => {
    const { id } = useParams();
    const { sendMessage, message, setMessage, getMessages, chat } = useContext(DataContext);


    useEffect(() => {
        getMessages(id)
    }, [id])

    return (
        <>
            <Box className="d-flex flex-column" sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}  >
                <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>

                    {chat.map((item) => (
                        <Typography key={item._id} sx={{ marginBottom: 1 }}>
                            <strong>{item.sender.name}:</strong> {item.content}
                        </Typography>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 2,
                        borderTop: '1px solid #ccc',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ marginRight: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => sendMessage(id)}
                        disabled={!message.trim()}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default UserDetails