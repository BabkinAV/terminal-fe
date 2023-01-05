import React, { useEffect, useState, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { TableRow, TableCell, Button } from '@mui/material';
import convertSecondsFromString from '../../helpers/convertSecondsToString';

const timerValue = 30;

interface ServerToClientEvents {
  noArg: () => void;
  timerReset: (counter: number, currentUser: number) => void;
	currentTimer: (counter: number, currentUser: number) => void;
}

interface ClientToServerEvents {
	timerSkip: () => void;
}

const RowDynamic = ({ participantIdList }: { participantIdList: string[] }) => {
  const [activeParticipant, setActiveParticipant] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerValue);
  const [currentTurn, setCurrentTurn] = useState(false);
  
	const cachedSocket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(()=> io(
    'http://localhost:8080'
  ), [])
  cachedSocket.on('currentTimer', (counter, currentUser) => {
    setTimeLeft(counter);
		setActiveParticipant(currentUser)
  });
	cachedSocket.on('timerReset', (counter, currentUser) => {
		setTimeLeft(counter);
		setActiveParticipant(currentUser);
	})

	const onButtonClickHandler = () => {
		console.log('fired!');
		cachedSocket.emit('timerSkip');
	}
  useEffect(() => {
    const timerId = setInterval(() => {
      if (timeLeft === 0) {
        
        setTimeLeft(0);
      } else {
        setTimeLeft((previous) => previous - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, activeParticipant, participantIdList]);
  return (
    <TableRow
      sx={{
        '& th': {
          borderBottom: 0,
        },
      }}
    >
      <TableCell sx={{ height: '80px' }}></TableCell>
      {participantIdList.map((el) => (
        <TableCell key={el} align="center">
          {participantIdList[activeParticipant] === el &&
            (currentTurn ? (
              <Button
                variant="contained"
                color="success"
                disableElevation
                sx={{ width: '100%', lineHeight: '2.75' }}
              >
                Ваш ход!
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation              
                sx={{
                  width: '100%',
                  lineHeight: '2.75',
                  backgroundColor: '#EDBFBF !important',
                  color: 'red !important',
                }}
								onClick={onButtonClickHandler}
              >
                {convertSecondsFromString(timeLeft)}
              </Button>
            ))}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default RowDynamic;
