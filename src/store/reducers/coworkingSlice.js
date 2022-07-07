import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    coworkings: [],
    currentCoworking: {},
    currentCoworkingId: -1
}

export const coworkingSlice = createSlice({
    name: 'coworking',
    initialState,
    reducers: {
        setCoworkings(state, action){
            state.coworkings = action.payload
        },
        addCoworking(state, action){
            state.coworkings.push(action.payload)
        },
        setCurrentCoworking(state, action){
            state.currentCoworking = action.payload
        },
        setCurrentCoworkingId(state, action){
            state.currentCoworkingId = action.payload
        },
        deleteCoworking(state, action){
            state.coworkings = state.coworkings.filter(item => item.id !== action.payload)
        },
        editCoworking(state, action){
            state.coworkings[state.coworkings.findIndex(item => action.payload.id === item.id)] = action.payload
        }
    }
})

export default coworkingSlice.reducer