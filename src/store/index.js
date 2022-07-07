import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coworkingSlice from "./reducers/coworkingSlice";
import tariffSlice from "./reducers/tariffSlice";
import ticketSlice from "./reducers/ticketSlice";

const rootReducer = combineReducers({
    tariff: tariffSlice,
    coworking: coworkingSlice,
    ticket: ticketSlice
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}