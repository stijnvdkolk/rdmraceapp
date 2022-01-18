import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import IProps from '../IProps';

// needed: onClick property to determine the click type
interface NoteProps extends IProps {
  notifyType?: number;
  message?: string;
  open?: boolean;
}

// shows a notification at the bottom of the screen
export default function Notification(props: NoteProps) {
  const [open, setOpen] = React.useState<boolean | undefined>(true);
  React.useEffect(() => setOpen(props.open), [props.open]);
  const { notifyType, message } = props;
  const handleClose = (
    event: React.SyntheticEvent<any, any> | React.MouseEvent<any, any> | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // determine the notification type with a number representing the type
  let notification;
  switch (notifyType) {
    case 1:
      notification = (
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      );
      break;

    default:
      notification = (
        <Alert onClose={handleClose} severity="info">
          {message}
        </Alert>
      );
      break;
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        {notification}
      </Snackbar>
    </div>
  );
}
