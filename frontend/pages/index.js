// frontend/pages/index.js
import { Container, Typography, Button } from '@mui/material';
import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to My Dashboard Application
        </Typography>
        <Typography variant="body1" paragraph>
          This is the home page of your dashboard application. Use the navigation bar above or the buttons below to access the various dashboards.
        </Typography>
        <Link href="/json-dashboard" passHref>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Go to JSON Dashboard
          </Button>
        </Link>
        <Link href="/django-dashboard" passHref>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Go to Django Dashboard
          </Button>
        </Link>
        <Link href="/express-dashboard" passHref>
          <Button variant="contained" color="primary">
            Go to ExpressJS Dashboard
          </Button>
        </Link>
      </Container>
    </>
  );
}
