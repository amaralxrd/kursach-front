import axios from 'axios'
import { ticketSlice } from './../reducers/ticketSlice';

export const getTickets = () => async dispatch => {
    await axios.get(`http://127.0.0.1:8000/api/ticket/?limit=1000`)
        .then((res) => dispatch(ticketSlice.actions.setTickets(res.data.results)))
}

export const createTicket = (ticket) => async (dispatch) => {
    await axios.post('http://127.0.0.1:8000/api/ticket/', ticket, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(ticketSlice.actions.addTicket(res.data)))
        .then(res => dispatch(getTickets()))
}

export const editTicket = (ticket, id) => async (dispatch) => {

    await axios.put(`http://127.0.0.1:8000/api/ticket/${id}/`, ticket, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(ticketSlice.actions.editTicket(res.data)))
}

export const deleteTicket = (id) => async (dispatch) => {
    await axios.delete(`http://127.0.0.1:8000/api/ticket/${id}/`)
        .then(res => dispatch(ticketSlice.actions.deleteTicket(id)))
}