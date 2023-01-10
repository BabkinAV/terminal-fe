import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Navigate, useMatch } from 'react-router-dom';
import Bids from '../components/Bids/Bids';
import Header from '../components/Header';

const Room = ({
  authorized,
  handleAuthorizedFalse,
}: {
  authorized?: boolean;
  handleAuthorizedFalse: () => void;
}) => {
  const navigate = useNavigate();

  const isSurveyor = useMatch('/surveyor');

  const onLogoutHandler = () => {
    if (!isSurveyor) {
			localStorage.removeItem('token');
			handleAuthorizedFalse()
    }
    navigate('/');
  };
  if (!(authorized || isSurveyor)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Bids />
      <Button
        variant="contained"
        disableElevation
        sx={{ my: 3 }}
        color="info"
        onClick={onLogoutHandler}
      >
        Выход
      </Button>
    </>
  );
};

export default Room;
