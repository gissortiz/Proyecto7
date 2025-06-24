import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                backgroundColor: '#003366',
                color: '#fff',
                textAlign: 'center',
                padding: '1.5rem 0',
                marginTop: 'auto',
                fontWeight: 500,
                letterSpacing: 1,
                fontSize: '1.1rem',
                boxShadow: '0 -2px 8px #00336633',
            }}
        >
            <Typography variant="body1">
                © {new Date().getFullYear()} Moviliza - Todos los derechos reservados
            </Typography>
        </Box>
    );
};

export default Footer;
