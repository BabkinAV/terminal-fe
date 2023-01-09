import React, { useEffect, useState } from 'react';
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
import RowDynamic from './RowDynamic';
import axios from 'axios';

interface BidItem {
  _id: string;
  addQuality?: string;
  manufacturingTime: number;
  warrantyPeriod: number;
  payTerms: number;
  cost: number;
  discount: number;
  creator: {
    _id: string;
    name: string;
  };
}

const BidsTable = () => {
  const [bidData, setBidData] = useState<BidItem[]>([]);
  useEffect(() => {
    axios
      .get<{ message: string; bids: BidItem[] }>('http://localhost:8080/bids')
      .then((response) => {
				setBidData(response.data.bids)
			})
      .catch((err) => console.log(err));
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="bids table">
        <TableHead sx={{ '& th': { px: 0 } }}>
          <RowDynamic participantIdList={bidData.map((el) => el.creator._id)} />

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
            {bidData.map((el) => {
              return (
                <TableCell key={'title' + el._id} align="center">
                  {el.creator.name.toUpperCase()}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            '& td': { border: 0, color: 'grey.800', p: '6px' },
            '& tr:nth-of-type(odd)': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Наличие комплекса мероприятий, повышающих стандарты качества
              изготовлегния
            </TableCell>
            {bidData.map((el) => {
              return (
                <TableCell key={'addQuality' + el._id} align="center">
                  {el.addQuality ? el.addQuality : '-'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Срок изготовления лота, дней
            </TableCell>
            {bidData.map((el) => {
              return (
                <TableCell key={'manufacturingTime' + el._id} align="center">
                  {el.manufacturingTime}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Гарантийные обязательства, мес
            </TableCell>
            {bidData.map((el) => {
              return (
                <TableCell key={'warrantyPeriod' + el._id} align="center">
                  {el.warrantyPeriod}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Условия оплаты
            </TableCell>
            {bidData.map((el) => {
              return (
                <TableCell key={'payTerms' + el._id} align="center">
                  {el.payTerms + '%'}
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth: 150 }} align="left">
              Стоимость изготовления лота, руб. (без НДС)
            </TableCell>
            {bidData.map((el) => {
              return (
                <TableCell key={'cost' + el._id} align="center">
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
