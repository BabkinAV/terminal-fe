import React from 'react';
import Bids from './components/Bids/Bids';
import Header from './components/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Bids />
    </Container>
  );
}

export default App;
