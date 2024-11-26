"use client"

import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

export const GenerateNotification = ({ notification }: { notification: Notification.ErrorNotification | Notification.SuccessNotification }) => {
    switch (notification.type) {
      case 'success':
        return <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {notification.message}
        </Alert>
      case 'error':
        return <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
          {notification.message}
        </Alert>
      default:
        return null
    }
  }