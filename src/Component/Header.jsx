import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <Stack spacing={2} sx={{ backgroundColor: 'blue', color: 'white', p: 2 }}>
      <Typography variant="h4" textAlign="center">Weather App</Typography>
    </Stack>
  );
};

export default Header;
