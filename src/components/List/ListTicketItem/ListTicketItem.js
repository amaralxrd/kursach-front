import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ticketSlice } from '../../../store/reducers/ticketSlice';
import { deleteTicket } from '../../../store/actions/ticketActions';

import classes from './ListTicketItem.module.scss'

const ListTicketItem = (props) => {

    const dispatch = useDispatch()

    const coworkings = useSelector(state => state.coworking.coworkings)
    const tariffs = useSelector(state => state.tariff.tariffs)

    const { name, phone, coworking, price } = props.item

    const editHandler = () => {
        dispatch(ticketSlice.actions.setCurrentTicket(props.item))
        props.setOpenModal(true)
    }

    const submitDelete = () => {
        dispatch(deleteTicket(props.item.id))
    }

    const coworkingWithId = coworkings.filter(item => item.id === coworking[0])[0]
    const tariffWithId = tariffs.filter(item => item.id === price[0])[0]

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Имя: {name}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Телефон: {phone}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Коворкинг: {coworkingWithId ? coworkingWithId.title : ''}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Тариф: {tariffWithId ? tariffWithId.title : ''}</Typography>
            </Box>
            <Box className={classes.buttons}>
                <IconButton onClick={editHandler}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={submitDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListTicketItem;