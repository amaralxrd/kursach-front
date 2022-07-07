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
import { editTicket } from '../../store/actions/ticketActions';
import ListTicketItem from '../List/ListTicketItem/ListTicketItem';
import Select from './../Select/Select';
import { isValid } from '../../store/actions/coworkingActions';
import { createTicket } from './../../store/actions/ticketActions';

const Ticket = () => {

    const dispatch = useDispatch()

    const tickets = useSelector(state => state.ticket.tickets)
    const currentTicket = useSelector(state => state.ticket.currentTicket)
    const coworkings = useSelector(state => state.coworking.coworkings)
    const tariffs = useSelector(state => state.tariff.tariffs)

    const [openModal, setOpenModal] = useState(false)

    const [id, setId] = useState(-1)
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [coworking, setCoworking] = useState()
    const [price, setPrice] = useState()
    const [notValidCreate, setNotValidCreate] = useState()
    const [notValidEdit, setNotValidEdit] = useState()
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (currentTicket) {
            setName(currentTicket.name)
            setPhone(currentTicket.phone)
            setCoworking(currentTicket.coworking)
            setPrice(currentTicket.price)
            setId(currentTicket.id)
        }
    }, [currentTicket])

    const submitCreate = async () => {

        const body = {
            name: name,
            phone: phone,
            coworking: coworking,
            price: price
        }

        if (isValid(body)) {
            setNotValidCreate(false)
            dispatch(createTicket(body))
        }
        else setNotValidCreate(true)
    }

    const submitEdit = () => {

        const body = {
            name: name,
            phone: phone,
            coworking: coworking,
            price: price
        }

        if (isValid(body)) {
            setNotValidEdit(false)
            dispatch(editTicket(body, id))
            setOpenModal(false)
        }
        else setNotValidEdit(true)
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
            case 'phone':
                setPhone(e.target.value)
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
                        Изменение билета
                    </Typography>
                    <TextField onChange={handleChange} name="name" sx={{ my: '10px' }} defaultValue={currentTicket.name} placeholder='Имя' />
                    <TextField onChange={handleChange} name="phone" sx={{ my: '10px' }} defaultValue={currentTicket.phone} type="tel" placeholder='Телефон' />
                    <Select defaultValue={currentTicket.coworking} onChange={setCoworking} placeholder="Коворкинг" arr={coworkings} />
                    <Select defaultValue={currentTicket.price} onChange={setPrice} placeholder="Тариф" arr={tariffs} />
                    {notValidEdit && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                    <Button onClick={submitEdit} variant="contained">Отправить</Button>
                </Box>
            </Modal>
            <Sidebar>
                <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                    Создание билета
                </Typography>
                <TextField onChange={handleChange} name="name" sx={{ my: '10px' }} placeholder='Имя' />
                <TextField onChange={handleChange} name="phone" sx={{ my: '10px' }} type="tel" placeholder='Телефон' />
                <Select onChange={setCoworking} placeholder="Коворкинг" arr={coworkings} />
                <Select onChange={setPrice} placeholder="Тариф" arr={tariffs} />
                {notValidCreate && <Typography sx={{ mb: 2 }} color="red" variant='string'>Заполните все поля</Typography>}
                <Button onClick={submitCreate} variant="contained">Отправить</Button>
            </Sidebar>
            <DividingLine />
            <List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'>
                        Список билетов
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                        <IconButton disabled={tickets.length / 3 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                    </Box>
                </Box>
                {tickets.slice(page * 3, (page + 1) * 3).map(item =>
                    <ListTicketItem setOpenModal={setOpenModal} key={item.id} item={item} />
                )}
            </List>
        </Layout>
    );
};

export default Ticket;