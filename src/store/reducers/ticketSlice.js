import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tickets: [],
    currentTicket: {},
    currentTicketId: -1
}

export const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets(state, action){
            state.tickets = action.payload
        },
        addTicket(state, action){
            state.tickets.push(action.payload)
        },
        setCurrentTicket(state, action){
            state.currentTicket = action.payload
        },
        setCurrentTicketId(state, action){
            state.currentTicketId = action.payload
        },
        deleteTicket(state, action){
            state.tickets = state.tickets.filter(item => item.id !== action.payload)
        },
        editTicket(state, action){
            state.tickets[state.tickets.findIndex(item => action.payload.id === item.id)] = action.payload
        }
    }
})

export default ticketSlice.reducer