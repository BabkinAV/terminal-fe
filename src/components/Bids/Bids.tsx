import React from 'react'
import Box from '@mui/material/Box';
import BidsTable from './BidsTable';


const Bids = () => {
	return (
		<Box sx={{pt:2, '& > p': {
			color: 'red',
			backgroundColor: 'grey.200',
			display: 'inline'
		}}} component='main'>
			<p>Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных в таблице:</p>
			<BidsTable />
		</Box>
	)
}

export default Bids;