import React from 'react';
import SpaIcon from '@mui/icons-material/Spa';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
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
                padding: '1rem 0 0.5rem 0',
                marginTop: 'auto',
                fontWeight: 500,
                letterSpacing: 1,
                fontSize: '1rem',
                boxShadow: '0 -2px 8px #00336633',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <SpaIcon sx={{ color: '#fff', fontSize: 22, mr: 1 }} />
                <span style={{ fontWeight: 700, letterSpacing: 2, fontSize: 18 }}>MOVILIZA</span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 4 }}>
                <a href="#" style={{ color: '#fff' }} aria-label="Facebook">
                    <FacebookIcon sx={{ fontSize: 20 }} />
                </a>
                <a href="#" style={{ color: '#fff' }} aria-label="Instagram">
                    <InstagramIcon sx={{ fontSize: 20 }} />
                </a>
                <a href="mailto:info@moviliza.com" style={{ color: '#fff' }} aria-label="Email">
                    <EmailIcon sx={{ fontSize: 20 }} />
                </a>
            </div>
            <Typography variant="body2" sx={{ fontSize: 13, opacity: 0.8 }}>
                © {new Date().getFullYear()} Moviliza - Todos los derechos reservados
            </Typography>
        </Box>
    );
};

export default Footer;
