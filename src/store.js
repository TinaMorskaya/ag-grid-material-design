import { configureStore, createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import data from './data/bank-accounts.json'


const rowSlice = createSlice({
    name: 'row',
    initialState: {rows: data},
    reducers: {
        addRow: (state) => {
            let newRows = state.rows.slice();
            newRows.push(
                {
                    "account number": '',
                    "account type": "Checking",
                    "currency": "USD",
                    "balance": '',
                    "bank name": "",
                    "bank country": ""
                }
            )
            return  {rows: newRows}
        },
        changeRow: (state, action) => {
            let row = action.payload;
            return update(state, {
                rows: {[row.id]: {[row.column]: {$set: row.data}}}
            });
        },
        deleteRows: (state, action) => {
            let newRows = state.rows.slice();
            for (let i = action.payload.length - 1; i >= 0 ; i--) {
                newRows.splice(action.payload[i], 1)
            }
            return  {rows: newRows};
        }
    }
  })

const store = configureStore({
    reducer: rowSlice.reducer
})

export {rowSlice};

export default store
