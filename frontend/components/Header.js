import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
         Code Test Dashboard
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/json-dashboard">
          JSON Dashboard
        </Button>
        <Button color="inherit" component={Link} href="/django-dashboard">
          Django Dashboard
        </Button>
        <Button color="inherit" component={Link} href="/express-dashboard">
          ExpressJS Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}
