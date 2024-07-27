import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface LoginState {
    token: string; 
}

const initialState: LoginState = {
    token: '',
};


const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
    },
});

export const {update} = loginSlice.actions;
export default loginSlice.reducer;