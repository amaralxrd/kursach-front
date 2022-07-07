import axios from 'axios'
import { coworkingSlice } from './../reducers/coworkingSlice';

export const getCoworking = () => async dispatch => {
    await axios.get(`http://127.0.0.1:8000/api/coworking/?limit=1000`)
        .then((res) => dispatch(coworkingSlice.actions.setCoworkings(res.data.results)))
}

export const createCoworking = (coworking) => async (dispatch) => {
    await axios.post('http://127.0.0.1:8000/api/coworking/', coworking, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(coworking.actions.addCoworking(res.data)))
        .then(res => dispatch(getCoworking()))
}

export const editCoworking = (coworking, id) => async (dispatch) => {

    await axios.put(`http://127.0.0.1:8000/api/coworking/${id}/`, coworking, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => dispatch(coworkingSlice.actions.editCoworking(res.data)))
}

export const deleteCoworking = (id) => async (dispatch) => {
    await axios.delete(`http://127.0.0.1:8000/api/coworking/${id}/`)
        .then(res => dispatch(coworkingSlice.actions.deleteCoworking(id)))
}

export const isValid = (body) => {

    let keys = Object.keys(body)
    for (let i = 0; i < keys.length; i++){
        if (body[keys[i]] === '' || body[keys[i]] === undefined){
            return false
        }
    }
    return true
}