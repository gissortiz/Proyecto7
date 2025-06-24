import React from 'react';
import { Container, Typography, Box, Card } from '@mui/material';

const About = () => {
  return (
   
    <Container sx={{ paddingTop: '50px', minHeight: '80vh' }}>
      <Box textAlign="center">

      <Box sx={{ marginBottom: 4 }}>
          <img
            src="https://thenunheadgardener.com/wp-content/uploads/images/Nunhead-4.jpg" 
            alt="Naturaleza en casa"
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover',  objectPosition: 'top', borderRadius: '20px' }}
          />
        </Box>

       <Box sx={{ boxShadow: 3, borderRadius: '20px', backgroundColor: '#f9f9f9', padding: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Montserrat', marginBottom: '20px'}}>
          Sobre Moviliza
        </Typography>

        <Typography variant="h5" 
        sx={{ 
          fontFamily: 'Montserrat',
          mt: 6, 
          maxWidth: '1000px', 
          margin: 'auto',  
          lineHeight: 1.3, 
          marginBottom: '20px' 
          }}>
         Moviliza nace del deseo profundo de acercar la kinesiología a las personas, en el espacio donde se sienten más cómodas: su hogar.
        </Typography>

        <Typography variant="h5" 
        sx={{ 
          fontFamily: 'Montserrat',
          mt: 6, 
          maxWidth: '1000px',
          margin: 'auto',
          lineHeight: 1.3,
          marginBottom: '20px'  
          }}>
          Mi nombre es Gissella Ortiz, soy kinesióloga con amplia experiencia en el tratamiento de lesiones músculo-esqueléticas, 
          rehabilitación postoperatoria, neurokinesiología y terapia funcional. Después de años acompañando a personas en su recuperación, 
          comprendí que muchas veces lo que más se necesita no es solo una terapia efectiva, sino también un espacio seguro, personalizado y humano.
        </Typography>

        <Typography variant="h5" 
        sx={{
          fontFamily: 'Montserrat',
          mt: 6,
          maxWidth: '1000px',
          margin: 'auto',
          lineHeight: 1.3, 
          marginBottom: '20px'  
          }}>
          En Moviliza combino técnicas basadas en evidencia con un enfoque integral que considera tu cuerpo, tu entorno y tus emociones. 
          Trabajo con respeto, empatía y compromiso, adaptando cada sesión a tus necesidades reales.
        </Typography>

         <Typography variant="h5" 
        sx={{
          fontFamily: 'Montserrat',
          mt: 6,
          maxWidth: '1000px',
          margin: 'auto',
          lineHeight: 1.3, 
          marginBottom: '20px'  
          }}>
          Porque moverse es más que un acto físico: es un acto de vida, libertad y transformación.
        </Typography>
        <Typography variant="h5" 
        sx={{
          fontFamily: 'Montserrat',
          mt: 6,
          maxWidth: '1000px',
          margin: 'auto',
          lineHeight: 1.3, 
          marginBottom: '20px'  
          }}>
          Estoy aquí para ayudarte a recuperar tu movimiento, tu bienestar y tu confianza, desde donde estés.
        </Typography>

        </Box>

        <Typography variant="h6" sx={{ mt: 6 }}>
          Gissella Ortiz - Fundadora de Moviliza
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
