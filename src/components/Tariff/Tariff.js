import { Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DividingLine from '../DividingLine/DividingLine';
import Layout from '../layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import List from './../List/List';
import ListTariffItem from '../List/ListITarifftem/ListITarifftem';
import { createTariff, editTariff } from '../../store/actions/tariffActions'
import { isValid } from './../../store/actions/coworkingActions';


const Tariff = () => {

    const dispatch = useDispatch()

    const tariffs = useSelector(state => state.tariff.tariffs)
    const currentItem = useSelector(state => state.tariff.currentTariff)

    const [openModal, setOpenModal] = useState(false)

    const [id, setId] = useState(-1)
    const [title, setTitle] = useState()
    const [information, setInfo] = useState()
    const [price, setPrice] = useState()
    const [hours, setHours] = useState()
    const [notValidCreate, setNotValidCreate] = useState(false)
    const [notValidEdit, setNotValidEdit] = useState(false)
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (currentItem) {
            setTitle(currentItem.title)
            setInfo(currentItem.information)
            setPrice(currentItem.price)
            setHours(currentItem.hours)
            setId(currentItem.id)
        }
    }, [currentItem])

    useEffect(() => {
        if (tariffs.length > 0) {
            if (tariffs.length / 3 <= page) setPage(page - 1)
        }
    }, [tariffs])

    const submitCreate = async () => {

        const body = {
            title: title,
            information: information,
            price: price,
            hours: hours
        }

        if (isValid(body)) {
            setNotValidCreate(false)
            dispatch(createTariff(body))
        }
        else setNotValidCreate(true)
    }

    const submitEdit = () => {

        const body = {
            title: title,
            information: information,
            price: price,
            hours: hours
        }

        if (isValid(body)) {
            setNotValidEdit(false)
            dispatch(editTariff(body, id))
            setOpenModal(false)
        }
        else setNotValidEdit(true)

    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitle(e.target.value)
            case 'info':
                setInfo(e.target.value)
            case 'price':
                setPrice(e.target.value)
            case 'hours':
                setHours(e.target.value)
        }
    }

    return (
        <Layout>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: "50%",
                    top: '50%',
                    transform: "translate(-50%, -50%)",
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '5px'
                }}>
                    <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                        Изменение тарифа
                    </Typography>
                    <TextField onChange={handleChange} name="title" sx={{ my: '10px' }} defaultValue={currentItem.title} placeholder='Название тарифа' />
                    <TextField onChange={handleChange} name="info" sx={{ my: '10px' }} defaultValue={currentItem.information} placeholder='Информация о тарифе' />
                    <TextField onChange={handleChange} name="price" sx={{ my: '10px' }} defaultValue={currentItem.price} placeholder='Цена тарифа' />
                    <TextField onChange={handleChange} name="hours" sx={{ my: '10px' }} defaultValue={currentItem.hours} placeholder='Времени в тарифе' />
                    {notValidEdit && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                    <Button onClick={submitEdit} variant="contained">Отправить</Button>
                </Box>
            </Modal>
            <Sidebar>
                <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                    Создание тарифа
                </Typography>
                <TextField onChange={(e) => setTitle(e.target.value)} sx={{ my: '10px' }} placeholder='Название тарифа' />
                <TextField onChange={(e) => setInfo(e.target.value)} sx={{ my: '10px' }} placeholder='Информация о тарифе' />
                <TextField onChange={(e) => setPrice(e.target.value)} sx={{ my: '10px' }} placeholder='Цена тарифа' />
                <TextField onChange={(e) => setHours(e.target.value)} sx={{ my: '10px' }} placeholder='Времени в тарифе' />
                {notValidCreate && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                <Button onClick={submitCreate} variant="contained">Отправить</Button>
            </Sidebar>
            <DividingLine />
            <List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'>
                        Список тарифов
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                        <IconButton disabled={tariffs.length / 3 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                    </Box>
                </Box>
                {tariffs.slice(page * 3, (page + 1) * 3).map(item =>
                    <ListTariffItem setOpenModal={setOpenModal} key={item.id} item={item} />
                )}
            </List>
        </Layout>
    );
};

export default Tariff;