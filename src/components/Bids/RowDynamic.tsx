import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import convertSecondsFromString from '../../helpers/convertSecondsToString';

const timerValue = 120;

const RowDynamic = ({ participantIdList }: { participantIdList: string[] }) => {
  const [activeParticipant, setActiveParticipant] = useState(0);
	const [timeLeft, setTimeLeft] = useState(timerValue);
	const [currentTurn, setCurrentTurn] = useState(false);
  // useEffect(() => {
 

  //   const timerId = setInterval(() => {
			
	// 		if (timeLeft === 0) {
	// 			if (activeParticipant < participantIdList.length-1) {

	// 				setActiveParticipant((previous) => previous + 1);
	// 			} else {
	// 				setActiveParticipant(0);
	// 			}
	// 			setTimeLeft(timerValue)
	// 		} else {
	// 			setTimeLeft((previous) => previous - 1);
	// 		}
  //   }, 1000);

	// 	return () => clearInterval(timerId);
  // }, [timeLeft, activeParticipant, participantIdList]);
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
          {participantIdList[activeParticipant] === el && ( currentTurn ? <Button
              variant="contained"
							color="success"
              disableElevation
              sx={{ width: '100%', lineHeight: '2.75'   }}
            >
              Ваш ход!
            </Button> : 
            <Button
              variant="contained"
              disableElevation
							disabled
              sx={{ width: '100%', lineHeight: '2.75', backgroundColor: '#EDBFBF !important', color: 'red !important'   }}
            >
              {convertSecondsFromString(timeLeft)}
            </Button> 
            
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default RowDynamic;
