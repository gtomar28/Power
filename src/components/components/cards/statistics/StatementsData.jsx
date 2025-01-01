import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function StatementsData({ data }) {

    // console.log(data)
    return (
        <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ py: 2.5 }}>Date & Time</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Order ID</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Amount</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Type</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Before PayIn Limit</TableCell>
                        <TableCell sx={{ py: 2.5 }}>After PayIn Limit</TableCell>
                        <TableCell sx={{ py: 2.5 }}>Commission</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row?.id} sx={{ backgroundColor: row?.id % 2 === 0 ? '#fff' : '#F2F6FC' }}>
                            <TableCell sx={{ py: 1.8, color: '#797B7E' }}>{row?.dateTime}</TableCell>
                            <TableCell sx={{ py: 1.8, color: '#797B7E' }}>{row?.orderId}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.amount}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.type}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.payInLimit}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.payOutLimit}</TableCell>
                            <TableCell sx={{ py: 1.8 }}>{row?.commission}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

