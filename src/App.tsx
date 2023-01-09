import React, {useEffect, useState} from 'react';
import Bids from './components/Bids/Bids';
import Header from './components/Header';
import { Container } from '@mui/material';
import axios from 'axios';

function App() {
	useEffect(() => {
		axios.post<{userId: string, token: string}>('http://localhost:8080/login', {
			name: 'участник 1'
		}).then((response) => {
			console.log(response.data.userId, ' ', response.data.token);
			
		})
		
	
	}, [])

	const [authorized, setAuthorized] = useState(false);
	
  return (
    <Container maxWidth="xl">
      <Header />
      <Bids/>
    </Container>
  );
}

export default App;
