import React, {  useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Home from './pages/Home';
import Room from './pages/Room';
import NotFound from './404';

function App() {
  const [authorized, setAuthorized] = useState(false);

  return (
    <Container maxWidth="xl">
      <Routes>
        <Route
          index
          element={<Home handleAuthorizedTrue={() => setAuthorized(true)} />}
        />
        <Route
          path="participant"
          element={
            <Room
              authorized={authorized}
              handleAuthorizedFalse={() => setAuthorized(false)}
            />
          }
        />
        <Route
          path="surveyor"
          element={<Room handleAuthorizedFalse={() => setAuthorized(false)} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
