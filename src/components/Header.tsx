import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const itemName = 'ЛОТОС №2033564';

const Header = () => {
	const [dt, setDt] = useState(dayjs().format('DD.MM.YYYY HH:mm:ss'));

	
useEffect(() => {
	let secTimer = setInterval( () => {
		setDt(dayjs().format('DD.MM.YYYY, HH:mm:ss'))
	},1000)

	return () => clearInterval(secTimer);
}, []);
  return (
    <Box sx={{ color: 'red', pt: 1, pb: 3, borderBottom: 2, borderColor: 'grey.300' }} component="header">
      Ход торгов на аппарат
      <Box component="span" sx={{ fontWeight: 'bold' }}>
        Тестовые торги на аппарат {itemName} ({dt}
				)
      </Box>
    </Box>
  );
};

export default Header;
