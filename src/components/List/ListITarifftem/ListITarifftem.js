import React from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTariff } from '../../../store/actions/tariffActions';
import { tariffSlice } from '../../../store/reducers/tariffSlice';

import classes from './ListTariffItem.module.scss'

const ListTariffItem = (props) => {

    const dispatch = useDispatch()

    const { title, information, price, hours } = props.item

    const editHandler = () => {
        dispatch(tariffSlice.actions.setCurrentItem(props.item))
        props.setOpenModal(true)
    }

    const submitDelete = () => {
        dispatch(deleteTariff(props.item.id))
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.item}>
                <Typography sx={{ my: '10px' }} variant="string">Название: {title}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Информация: {information}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Цена: {price}</Typography>
                <Typography sx={{ my: '10px' }} variant="string">Часы: {hours}</Typography>
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

export default ListTariffItem;