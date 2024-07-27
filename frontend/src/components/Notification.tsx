// NotificationComponent.tsx

import React from 'react';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { closeNotification } from '../features/notifSlice'; // Adjust the path as per your actual setup

const NotificationComponent: React.FC = () => {
  const { isOpen, message, type } = useSelector((state: RootState) => state.notif);
  const dispatch = useDispatch();

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={()=>  dispatch(closeNotification())}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationComponent;
