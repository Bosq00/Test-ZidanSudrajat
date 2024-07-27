// notificationSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const initialState: NotificationState = {
  isOpen: false,
  message: '',
  type: 'info',
};

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    updateNotification(state, action: PayloadAction<NotificationState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    closeNotification(state) {
      return {
        ...state,
        isOpen: false,
      };
    },
  },
});

export const { updateNotification, closeNotification } = notifSlice.actions;
export default notifSlice.reducer;
