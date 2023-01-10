import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom'
import { Container } from '@mui/material';

import Home from './pages/Home';
import Participant from './pages/Participant';
import NotFound from './404';


function App() {
	useEffect(() => {
		axios.post<{userId: string, token: string}>('http://localhost:8080/login', {
			name: 'участник 1'
		}).then((response) => {
			console.log(response.data.userId, ' ', response.data.token);
			localStorage.setItem('token', response.data.token)
			
		})
		
	
	}, [])

	const [authorized, setAuthorized] = useState(false);
	
  return (
    <Container maxWidth="xl">
			<Routes>
				<Route index element={<Home />}/>
				<Route path="participant" element={<Participant />}/>
				<Route path="*" element={<NotFound />}/>
			</Routes>
    </Container>
  );
}

export default App;
