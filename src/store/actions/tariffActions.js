import axios from 'axios'
import { tariffSlice } from '../reducers/tariffSlice'

export const getTariffs = () => async dispatch => {
    await axios.get(`http://127.0.0.1:8000/api/tarrifs/?limit=1000`)
        .then((res) => dispatch(tariffSlice.actions.setTariffs(res.data.results)))
}

export const createTariff = (tariff) => async (dispatch) => {
    await axios.post('http://127.0.0.1:8000/api/tarrifs/', tariff, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(tariffSlice.actions.addTariff(res.data)))
        .then(res => dispatch(getTariffs()))
}

export const editTariff = (tariff, id) => async (dispatch) => {

    await axios.put(`http://127.0.0.1:8000/api/tarrifs/${id}/`, tariff, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(tariffSlice.actions.editTariff(res.data)))
}

export const deleteTariff = (id) => async (dispatch) => {
    await axios.delete(`http://127.0.0.1:8000/api/tarrifs/${id}/`)
        .then(res => dispatch(tariffSlice.actions.deleteTariff(id)))
}