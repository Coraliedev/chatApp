import {
  Box,
  Typography,
  Container,
  Button
} from '@mui/material';


const NotFound = () => {
  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Box textAlign="center">
        <img alt="404" height={140} src="/404.svg" />
        <Typography variant="h2" sx={{
          my: 2,
          fontSize: '55px',
          color: 'text.primary',
          '@media (max-width: 600px)': { fontSize: '25px' }
        }}>
          The page you were looking for doesn't exist.
        </Typography>
        <Typography
          variant="h5"
          color="info.main"
          fontWeight="normal"
          sx={{ fontSize: '18px', '@media (max-width: 600px)': { fontSize: '15px' } }}
        >
          It's on us, we moved the content to a different page. The search
          below should help!
        </Typography>
        <Button href="/" variant="outlined" sx={{ mt: 2, color: 'text.primary', borderRadius: '10px', borderColor: 'text.primary' }}>
          Go to homepage
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound