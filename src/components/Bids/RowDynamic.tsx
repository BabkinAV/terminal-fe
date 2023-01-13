import React, { useEffect, useState,  useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import { TableRow, TableCell, Button } from '@mui/material';
import convertSecondsFromString from '../../helpers/convertSecondsToString';
import {useMatch} from 'react-router-dom'

const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;



interface ServerToClientEvents {
  noArg: () => void;
  timerReset: (counter: number, currentUser: string) => void;
  currentTimer: (counter: number, currentUser: string) => void;
}

interface ClientToServerEvents {
  timerSkip: () => void;
}

const RowDynamic = ({ participantIdList }: { participantIdList: string[] }) => {
  const [activeParticipant, setActiveParticipant] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [loggedInUserId, setLoggedInUserId] = useState('');

	const isSurveyor = useMatch("/surveyor");

	const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

	useEffect(() => {
		socketRef.current = io(
			backendAddress!
		, {auth: {
			token: (!isSurveyor) ? localStorage.getItem('token'): ''
		}});
		socketRef.current.on('currentTimer', (counter, currentUser) => {
			setTimeLeft(counter);
			setActiveParticipant(currentUser);
		});
		socketRef.current.on('timerReset', (counter, currentUser) => {
			setTimeLeft(counter);
			setActiveParticipant(currentUser);
		});
		return () => {
			socketRef.current?.disconnect()
		}
	}, [isSurveyor])



	
  const onButtonClickHandler = () => {
    socketRef.current?.emit('timerSkip');
  };
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

  useEffect(() => {
		if (!isSurveyor) {
			let token = localStorage.getItem('token');
    if (token) {
      const userId = jwtDecode<{ userId: string }>(token).userId;
      setLoggedInUserId(userId);
    }	
		}
    
  }, [isSurveyor]);
  return (
    <TableRow
      sx={{
        '& th': {
          borderBottom: 0,
        },
      }}
    >
      <TableCell sx={{ height: '80px', color: 'info.main' }}>Ход</TableCell>
      {participantIdList.map((el) => (
        <TableCell key={el} align="center" sx={{ position: 'relative' }}>
          {activeParticipant === el &&
            (((activeParticipant === loggedInUserId) && !isSurveyor) ? (
              <Button
                variant="contained"
                color="success"
                disableElevation
                onClick={onButtonClickHandler}
                sx={{
                  width: '200px',
                  lineHeight: '1.5rem',
                  position: 'absolute',
                  top: '(-50%)',
                  left: '(-50%)',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Ваш ход!{' '}({convertSecondsFromString(timeLeft)})
								(нажать)
              </Button>
            ) : (
              <Button
                variant="contained"
								disabled
                disableElevation
                sx={{
                  width: '150px',
                  lineHeight: '1.5rem',
                  backgroundColor: '#EDBFBF !important',
                  color: 'red !important',
                  position: 'absolute',
                  top: '(-50%)',
                  left: '(-50%)',
                  transform: 'translate(-50%, -50%)',
                }}
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
