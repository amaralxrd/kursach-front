import React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { coworkingSlice } from '../../../store/reducers/coworkingSlice';
import { deleteCoworking } from '../../../store/actions/coworkingActions';

import classes from './ListCoworkingItem.module.scss'

const ListCoworkingItem = (props) => {

    const dispatch = useDispatch()

    const { title, address, work } = props.item

    const editHandler = () => {
        dispatch(coworkingSlice.actions.setCurrentCoworking(props.item))
        props.setOpenModal(true)
    }

    const submitDelete = () => {
        dispatch(deleteCoworking(props.item.id))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Название: {title}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Адрес: {address}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Работает: {work != 0 ? "Нет" : "Да"}</Typography>
            </Box>
            <Box className={classes.buttons}>
                <IconButton onClick={editHandler}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={submitDelete}>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default ListCoworkingItem;