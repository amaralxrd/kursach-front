import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tariffs: [],
    currentTariff: {},
    currentTariffId: -1
}

export const tariffSlice = createSlice({
    name: 'tariff',
    initialState,
    reducers: {
        setTariffs(state, action){
            state.tariffs = action.payload
        },
        addTariff(state, action){
            state.tariffs.push(action.payload)
        },
        setCurrentItem(state, action){
            state.currentTariff = action.payload
        },
        setCurrentItemId(state, action){
            state.currentTariffId = action.payload
        },
        deleteTariff(state, action){
            state.tariffs = state.tariffs.filter(item => item.id !== action.payload)
        },
        editTariff(state, action){
            state.tariffs[state.tariffs.findIndex(item => action.payload.id === item.id)] = action.payload
        }
    }
})

export default tariffSlice.reducer