import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmation = ({ deleteModal, handleClosingModal, DeleteBedType }) => {
console.log(deleteModal, 'deleteModal')
  return (
    <>
      <Dialog open={deleteModal} onClose={handleClosingModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
        <DialogTitle id="alert-dialog-title">
          Use Google's location service?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">h</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosingModal}>Disagree</Button>
          <Button onClick={DeleteBedType} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteConfirmation