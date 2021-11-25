import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import IProps from '../IProps';

/*
export enum notiType{
    info,
    error    
}

interface NoteProps extends IProps {
    notifyType: notiType;
};
*/
//props: NoteProps
export default function Notification() {
  const [open, setOpen] = React.useState(false);

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

  return (
    <div>
      <Button onClick={handleClick}>Open notification</Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="info">
                Invalid email and/or password
            </Alert>
        </Snackbar>
    </div>
  );
}