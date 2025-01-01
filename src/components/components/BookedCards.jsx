import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const CardContentMy = styled(CardContent)(() => ({
    padding: '13px 23px !important' ,
    fontSize: '12px !important'
}));


const BookedCards = ({ roomNo, roomType }) => {
    return (
        <Card>
            <CardContentMy sx={{ p: 1, backgroundColor: '#f2f6fbe4' }}>
                <Typography align='center' variant='h5' sx={{ color: 'text.dark', mb: 1 }}> {roomNo} </Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}> {roomType} </Typography>
            </CardContentMy>
        </Card>
    )
}

export default BookedCards