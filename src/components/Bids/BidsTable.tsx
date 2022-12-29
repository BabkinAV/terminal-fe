import React from 'react';
import {
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BidsData } from '../../bidsData';
import RowDynamic from './RowDynamic';

const BidsTable = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="bids table">
        <TableHead sx={{'& th': {px: 0}}}>
					<RowDynamic participantIdList={BidsData.map(el=>el.id)}/>

          <TableRow
            sx={{
              '& th': {
                color: 'info.main',
                borderBottom: 3,
                borderColor: 'grey.300',
              },
            }}
          >
            <TableCell>ПАРАМЕТРЫ И ТРЕБОВАНИЯ</TableCell>
            {BidsData.map((el) => {
              return (
                <TableCell key={'title' + el.id} align="center">
                  {el.name.toUpperCase()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={{ '& td': { border: 0, color: 'grey.800', p: '6px'  }, '& tr:nth-of-type(odd)': {
					backgroundColor: 'grey.100'
				} }}>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Наличие комплекса мероприятий, повышающих стандарты качества
              изготовлегния
            </TableCell>
            {BidsData.map((el) => {
              return (
                <TableCell key={'addQuality' + el.id} align="center">
                  {el.addQuality.length > 0 ? el.addQuality : '-'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Срок изготовления лота, дней
            </TableCell>
            {BidsData.map((el) => {
              return (
                <TableCell key={'manufacturingTime' + el.id} align="center">
                  {el.manufacturingTime}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Гарантийные обязательства, мес
            </TableCell>
            {BidsData.map((el) => {
              return (
                <TableCell key={'warrantyPeriod' + el.id} align="center">
                  {el.warrantyPeriod}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Условия оплаты
            </TableCell>
            {BidsData.map((el) => {
              return (
                <TableCell key={'payTerms' + el.id} align="center">
                  {el.payTerms + '%'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Стоимость изготовления лота, руб. (без НДС)
            </TableCell>
            {BidsData.map((el) => {
              return (
                <TableCell key={'cost' + el.id} align="center">
                  <List
                    sx={{ '& li': { justifyContent: 'center', p: 0 }, p: 0 }}
                  >
                    <ListItem sx={{ color: 'info.dark' }}>
                      {el.cost.toLocaleString('en-US') + ' руб.'}
                    </ListItem>
                    <ListItem sx={{ color: 'error.main' }}>
                      {'-' + el.discount.toLocaleString('en-US') + ' руб.'}
                    </ListItem>
                    <ListItem sx={{ color: 'success.main' }}>
                      {(el.cost - el.discount).toLocaleString('en-US') +
                        ' руб.'}
                    </ListItem>
                  </List>
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BidsTable;
