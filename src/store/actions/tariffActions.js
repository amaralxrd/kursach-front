import axios from 'axios'
import { tariffSlice } from '../reducers/tariffSlice'

export const getTariffs = () => async dispatch => {
    await axios.get(`http://amaralxrd.pythonanywhere.com/api/tarrifs/?limit=1000`)
        .then((res) => dispatch(tariffSlice.actions.setTariffs(res.data.results)))
}

export const createTariff = (tariff) => async (dispatch) => {
    await axios.post('http://amaralxrd.pythonanywhere.com/api/tarrifs/', tariff, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(tariffSlice.actions.addTariff(res.data)))
        .then(res => dispatch(getTariffs()))
}

export const editTariff = (tariff, id) => async (dispatch) => {

    await axios.put(`http://amaralxrd.pythonanywhere.com/api/tarrifs/${id}/`, tariff, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(tariffSlice.actions.editTariff(res.data)))
}

export const deleteTariff = (id) => async (dispatch) => {
    await axios.delete(`http://amaralxrd.pythonanywhere.com/api/tarrifs/${id}/`)
        .then(res => dispatch(tariffSlice.actions.deleteTariff(id)))
}