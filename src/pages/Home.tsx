import React, { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const participantsArr = [
  'участник 1',
  'участник 2',
  'участник 3',
  'участник 4',
];

const Home = ({
  handleAuthorizedTrue,
}: {
  handleAuthorizedTrue: () => void;
}) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);

  const onParticipantClickHandler = (participant: string) => {
    setLoginError('');
    setIsDataLoading(true);
    axios
      .post<{ userId: string; token: string }>('http://localhost:8080/login', {
        name: participant,
      })
      .then((response) => {
        console.log(response.data.userId, ' ', response.data.token);
        localStorage.setItem('token', response.data.token);
        handleAuthorizedTrue();
        navigate('/participant');
      })
      .catch((err: { message: string }) => {
        setLoginError(err.message);
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
  };

  const onSurveyorClickHandler = () => {
    navigate('/surveyor');
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" sx={{ py: 4 }}>
        Выберите тип доступа:
      </Typography>
      <Container maxWidth="sm">
        <Grid container spacing={8}>
          <Grid item xs={6}>
            {participantsArr.map((el) => (
              <LoadingButton
                variant="contained"
                key={participantsArr.indexOf(el)}
                disableElevation
								loading={isDataLoading}
                fullWidth
                sx={{ my: 2 }}
                onClick={() => onParticipantClickHandler(el)}
              >
                {el}
              </LoadingButton>
            ))}
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              variant="contained"
              disableElevation
              fullWidth
							loading={isDataLoading}
              sx={{ my: 2 }}
              color="success"
              onClick={onSurveyorClickHandler}
            >
              Наблюдатель
            </LoadingButton>
          </Grid>
        </Grid>
        {loginError && (
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ py: 4, color: 'red' }}
          >
            Ошибка авторизации ({loginError})
          </Typography>
        )}
      </Container>
    </>
  );
};

export default Home;
