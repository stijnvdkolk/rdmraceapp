import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import IProps from '../IProps';

// needed: onClick property to determine the click type
interface NoteProps extends IProps {
    notifyType?: number;
    message?: string;
};

export default function Notification(props: NoteProps) {
  const [open, setOpen] = React.useState(false);
  const { notifyType, message } = props;
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  let notification;
  switch (notifyType) {
    case 1:
      notification =  (
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>)
      break;

    default:
      notification =  (
      <Alert onClose={handleClose} severity="info">
        {message}
      </Alert>)
      break;
  }
  

  return (
    <div>
      <Button onClick={handleClick}>Open notification</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        >
          { notification}
        </Snackbar>
    </div>
  );
}