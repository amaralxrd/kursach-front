import { Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import DividingLine from '../DividingLine/DividingLine';
import Layout from '../layout/Layout';
import Sidebar from '../Sidebar/Sidebar';
import List from './../List/List';
import { coworkingSlice } from './../../store/reducers/coworkingSlice';
import { editCoworking } from '../../store/actions/coworkingActions';
import ListCoworkingItem from '../List/ListCoworkingItem/ListCoworkingItem';
import Select from './../Select/Select';

const workCondition = [
    {
        id: 0,
        title: "Да",
    },
    {
        id: 1,
        title: "Нет"
    }
]

const Coworking = () => {

    const dispatch = useDispatch()

    const coworkings = useSelector(state => state.coworking.coworkings)
    const currentCoworking = useSelector(state => state.coworking.currentCoworking)

    const [openModal, setOpenModal] = useState(false)

    const [id, setId] = useState(-1)
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [work, setWork] = useState([-1])
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (currentCoworking) {
            setTitle(currentCoworking.title)
            setAddress(currentCoworking.address)
            setWork([Number(currentCoworking.work)])
            setId(currentCoworking.id)
        }
    }, [currentCoworking])

    const submitCreate = async () => {

        const body = {
            title: title,
            address: address,
            work: work[0]
        }

        await axios.post('https://amaralxrd.pythonanywhere.com/api/coworking/', body, {
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => dispatch(coworkingSlice.actions.setCoworkings([...coworkings, res.data])))

        setOpenModal(false)
    }

    const submitEdit = () => {

        const body = {
            title: title,
            address: address,
            work: work[0]
        }

        dispatch(editCoworking(body, id))
        setOpenModal(false)
    }

    const handleSetPage = (operator) => {
        if (operator === '+') {
            if (coworkings.length / 3 > page + 1)
                setPage(page + 1)
        }
        else
            if (page !== 0) {
                setPage(page - 1)
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
                        Изменение коворкинга
                    </Typography>
                    <TextField onChange={(e) => setTitle(e.target.value)} sx={{ my: '10px' }} defaultValue={currentCoworking.title} placeholder='Название коворкинга' />
                    <TextField onChange={(e) => setAddress(e.target.value)} sx={{ my: '10px' }} defaultValue={currentCoworking.address} placeholder='Адрес коворкинге' />
                    <Select onChange={setWork} defaultValue={work} placeholder={"Работает?"} arr={workCondition} />
                    <Button sx={{ mt: '10px' }} onClick={submitEdit} variant="contained">Отправить</Button>
                </Box>
            </Modal>
            <Sidebar>
                <Typography sx={{ whiteSpace: "nowrap" }} variant="h4">
                    Создание коворкинга
                </Typography>
                <TextField onChange={(e) => setTitle(e.target.value)} sx={{ my: '10px' }} placeholder='Название тарифа' />
                <TextField onChange={(e) => setAddress(e.target.value)} sx={{ my: '10px' }} placeholder='Адрес коворкинга' />
                <Select onChange={setWork} placeholder={"Работает?"} arr={workCondition} />
                <Button onClick={submitCreate} variant="contained">Отправить</Button>
            </Sidebar>
            <DividingLine />
            <List>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h4'>
                        Список коворкингов
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowBackIcon /></IconButton>
                        <IconButton disabled={coworkings.length / 3 <= page + 1} onClick={() => setPage(page + 1)}><ArrowForwardIcon /></IconButton>
                    </Box>
                </Box>
                <Box>
                    {coworkings.slice(page * 3, (page + 1) * 3).map(item =>
                        <ListCoworkingItem setOpenModal={setOpenModal} key={item.id} item={item} />
                    )}
                </Box>
            </List>
        </Layout>
    );
};

export default Coworking;