import axios from 'axios'
import { ticketSlice } from './../reducers/ticketSlice';

export const getTickets = () => async dispatch => {
    await axios.get(`https://amaralxrd.pythonanywhere.com/api/ticket/?limit=1000`)
        .then((res) => dispatch(ticketSlice.actions.setTickets(res.data.results)))
}

export const createTicket = (ticket) => async (dispatch) => {
    await axios.post('https://amaralxrd.pythonanywhere.com/api/ticket/', ticket, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(ticketSlice.actions.addTicket(res.data)))
        .then(res => dispatch(getTickets()))
}

export const editTicket = (ticket, id) => async (dispatch) => {

    await axios.put(`https://amaralxrd.pythonanywhere.com/api/ticket/${id}/`, ticket, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(ticketSlice.actions.editTicket(res.data)))
}

export const deleteTicket = (id) => async (dispatch) => {
    await axios.delete(`https://amaralxrd.pythonanywhere.com/api/ticket/${id}/`)
        .then(res => dispatch(ticketSlice.actions.deleteTicket(id)))
}