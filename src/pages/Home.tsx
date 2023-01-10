import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import  {useNavigate,} from 'react-router-dom';

const participantsArr = [
  'участник 1',
  'участник 2',
  'участник 3',
  'участник 4',
];



const Home = () => {
	const navigate = useNavigate();

	const onParticipantClickHandler = (participant: string) => {
		console.log(`${participant} clicked`);
		
	}



	const onSurveyorClickHandler = () => {
		navigate('/participant')
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
              <Button
                variant="contained"
                key={participantsArr.indexOf(el)}
                disableElevation
                fullWidth
                sx={{ my: 2 }}
								onClick={()=>onParticipantClickHandler(el)}
              >
                {el}
              </Button>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              sx={{ my: 2 }}
              color="success"
							onClick={onSurveyorClickHandler}
            >
              Наблюдатель
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
